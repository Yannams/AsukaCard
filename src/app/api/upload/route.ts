import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/heic",
  "image/heif",
  "", // Some mobile browsers send empty MIME type for camera captures
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier n'a été transmis." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "La photo est trop volumineuse (max 15 Mo)." }, { status: 400 });
    }

    if (file.type && !ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Format non supporté. Veuillez importer un fichier JPG, PNG ou WEBP." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize extension
    let ext = ".jpg";
    if (file.type === "image/png") ext = ".png";
    if (file.type === "image/webp") ext = ".webp";
    if (file.type === "image/svg+xml") ext = ".svg";

    const fileName = `${Date.now()}_${crypto.randomBytes(8).toString("hex")}${ext}`;
    const mime = file.type || "image/jpeg";
    const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;

    // Try saving to public/uploads (local development & standard Node hosts)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${fileName}`,
        fileName,
        size: file.size,
      });
    } catch (diskErr) {
      // Vercel serverless environment has a read-only filesystem:
      // Return high-efficiency base64 data URL fallback so photo upload NEVER fails
      console.warn("Upload fallback: filesystem read-only on host, returning data URL", diskErr);
      return NextResponse.json({
        success: true,
        url: dataUrl,
        fileName,
        size: file.size,
      });
    }
  } catch (err) {
    console.error("Erreur upload:", err);
    return NextResponse.json({ error: "Échec du téléchargement de l'image." }, { status: 500 });
  }
}
