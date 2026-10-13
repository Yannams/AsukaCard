const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

const pool = new Pool({ connectionString });

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function seed() {
  console.log("Starting Asuka Card database seeding (Admin Account)...");

  try {
    const adminEmail = "admin@asukacard.fr";
    const adminPassword = "asuka2026";
    const adminName = "Administrateur Asuka";
    const adminRole = "ADMIN";

    // 1. Check if admin exists
    const existing = await pool.query('SELECT id FROM "User" WHERE email = $1', [adminEmail.toLowerCase()]);
    
    let adminId;
    if (existing.rows.length === 0) {
      adminId = `usr_admin_${Date.now()}`;
      const passwordHash = hashPassword(adminPassword);
      
      await pool.query(
        `INSERT INTO "User" (id, name, email, "passwordHash", role, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          adminId,
          adminName,
          adminEmail.toLowerCase(),
          passwordHash,
          adminRole,
          new Date(),
          new Date()
        ]
      );
      console.log(`✓ Admin user created successfully:`);
      console.log(`  - Email: ${adminEmail}`);
      console.log(`  - Password: ${adminPassword}`);
      console.log(`  - Role: ${adminRole}`);
    } else {
      adminId = existing.rows[0].id;
      // Ensure the role is ADMIN
      await pool.query('UPDATE "User" SET role = $1 WHERE id = $2', [adminRole, adminId]);
      console.log(`✓ Admin user already exists (${adminEmail}) — role ensured as ADMIN`);
    }

    // 2. Ensure demo user is NOT in the database (as requested)
    const demoCheck = await pool.query('SELECT id FROM "User" WHERE email = $1', ['demo@asukacard.fr']);
    if (demoCheck.rows.length > 0) {
      console.log("- Removing demo account from database...");
      await pool.query('DELETE FROM "User" WHERE email = $1', ['demo@asukacard.fr']);
      console.log("✓ Demo account removed.");
    }

    // 3. Optional showcase card for Admin
    const cardCheck = await pool.query('SELECT id FROM "Card" WHERE "userId" = $1', [adminId]);
    if (cardCheck.rows.length === 0) {
      const cardId = `crd_admin_${Date.now()}`;
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
          cardId,
          adminId,
          'asuka-officiel',
          'Admin',
          'Asuka',
          'Direction & Supervision',
          'Asuka Card Technologies',
          'Compte administrateur officiel de la plateforme Asuka Card.',
          '+33 1 00 00 00 00',
          '+33100000000',
          adminEmail,
          'https://asuka-card.com',
          'Paris, France',
          '',
          '',
          JSON.stringify({ linkedin: 'https://linkedin.com' }),
          'black',
          'premium',
          JSON.stringify({ phone: true, whatsapp: true, email: true, website: true, address: true, bio: true, socials: true }),
          0,
          0,
          new Date(),
          new Date()
        ]
      );
      console.log(`✓ Showcase card created: slug 'asuka-officiel'`);
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
