const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function seed() {
  console.log("Starting database seed from data/asuka.json...");
  
  const jsonPath = path.join(__dirname, '..', 'data', 'asuka.json');
  if (!fs.existsSync(jsonPath)) {
    console.error("data/asuka.json not found!");
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw);

  try {
    // 1. Seed Users
    for (const u of data.users) {
      const existing = await pool.query('SELECT id FROM "User" WHERE email = $1', [u.email.toLowerCase()]);
      if (existing.rows.length === 0) {
        await pool.query(
          `INSERT INTO "User" (id, name, email, "passwordHash", "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            u.id,
            u.name,
            u.email.toLowerCase(),
            u.passwordHash,
            u.createdAt ? new Date(u.createdAt) : new Date(),
            new Date()
          ]
        );
        console.log(`✓ Inserted user: ${u.email} (${u.name})`);
      } else {
        console.log(`- User already exists: ${u.email}`);
      }
    }

    // 2. Seed Cards
    for (const c of data.cards) {
      const existing = await pool.query('SELECT id FROM "Card" WHERE id = $1 OR slug = $2', [c.id, c.slug.toLowerCase()]);
      
      const socialsJson = typeof c.socials === 'string' ? c.socials : JSON.stringify(c.socials || {});
      const visibilityJson = typeof c.fieldVisibility === 'string' ? c.fieldVisibility : JSON.stringify(c.fieldVisibility || {});

      if (existing.rows.length === 0) {
        await pool.query(
          `INSERT INTO "Card" (
            id, "userId", slug, "firstName", "lastName", title, company, bio,
            phone, whatsapp, email, website, address, "avatarUrl", "logoUrl",
            socials, "dominantColor", template, "fieldVisibility",
            "viewsCount", "contactClicks", "createdAt", "updatedAt"
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13, $14, $15,
            $16, $17, $18, $19,
            $20, $21, $22, $23
          )`,
          [
            c.id,
            c.userId,
            c.slug.toLowerCase(),
            c.firstName,
            c.lastName,
            c.title || '',
            c.company || '',
            c.bio || '',
            c.phone || '',
            c.whatsapp || '',
            c.email || '',
            c.website || '',
            c.address || '',
            c.avatarUrl || '',
            c.logoUrl || '',
            socialsJson,
            c.dominantColor || 'orange',
            c.template || 'modern',
            visibilityJson,
            c.viewsCount || 0,
            c.contactClicks || 0,
            c.createdAt ? new Date(c.createdAt) : new Date(),
            c.updatedAt ? new Date(c.updatedAt) : new Date()
          ]
        );
        console.log(`✓ Inserted card: ${c.slug} (${c.firstName} ${c.lastName})`);
      } else {
        console.log(`- Card already exists: ${c.slug}`);
      }
    }

    console.log("\nDatabase seed completed successfully! 🎉");
  } catch (err) {
    console.error("Error during database seed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
