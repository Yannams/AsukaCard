const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function seedOrders() {
  console.log("Seeding sample NFC card orders for testing...");
  try {
    // 1. Get demo user and cards
    const userRes = await pool.query('SELECT id FROM "User" WHERE email = $1', ['demo@asukacard.fr']);
    if (userRes.rows.length === 0) {
      console.log("Demo user not found, skipping orders seed.");
      return;
    }
    const userId = userRes.rows[0].id;

    // Update demo user role to ADMIN
    await pool.query('UPDATE "User" SET role = $1 WHERE id = $2', ['ADMIN', userId]);
    console.log("✓ Updated demo@asukacard.fr role to ADMIN");

    const cardsRes = await pool.query('SELECT id, slug, "firstName", "lastName", company FROM "Card" WHERE "userId" = $1 LIMIT 5', [userId]);
    const cards = cardsRes.rows;

    // Sample initial orders
    const sampleOrders = [
      {
        orderNumber: 'ASK-20261005-001-4821',
        cardId: cards[0] ? cards[0].id : null,
        cardType: 'METAL_MATTE_BLACK',
        customName: 'Richard Odjrado',
        quantity: 2,
        unitPrice: 35000,
        totalAmount: 70000,
        currency: 'XOF',
        customerName: 'Richard Odjrado',
        customerEmail: 'richard@asuka.tech',
        customerPhone: '+229 97 00 11 22',
        shippingAddress: 'Boulevard de la Marina, Immeuble AS World Tech',
        city: 'Cotonou',
        country: 'Bénin',
        notes: 'Gravure laser avec finition brossée haute précision.',
        status: 'IN_PRODUCTION',
        paymentStatus: 'PAID',
        paymentMethod: 'MOBILE_MONEY',
        paymentRef: 'MTN-MOMO-8923412',
        paidAt: new Date(Date.now() - 3600 * 1000 * 48),
        createdAt: new Date(Date.now() - 3600 * 1000 * 50),
      },
      {
        orderNumber: 'ASK-20261006-002-9134',
        cardId: cards[1] ? cards[1].id : null,
        cardType: 'PVC_CLASSIC',
        customName: 'Sophie Martin',
        quantity: 1,
        unitPrice: 15000,
        totalAmount: 15000,
        currency: 'XOF',
        customerName: 'Sophie Martin',
        customerEmail: 'sophie.martin@atelier-martin.fr',
        customerPhone: '+229 61 22 33 44',
        shippingAddress: 'Quartier Haie Vive, Rue 380',
        city: 'Cotonou',
        country: 'Bénin',
        notes: 'Livraison express demandée.',
        status: 'SHIPPED',
        trackingNumber: 'DHL-BJ-98421045',
        carrier: 'DHL Express',
        paymentStatus: 'PAID',
        paymentMethod: 'CARD',
        paymentRef: 'VISA-STRIPE-402911',
        paidAt: new Date(Date.now() - 3600 * 1000 * 24),
        createdAt: new Date(Date.now() - 3600 * 1000 * 26),
      },
      {
        orderNumber: 'ASK-20261007-003-1250',
        cardId: cards[2] ? cards[2].id : null,
        cardType: 'METAL_GOLD',
        customName: 'Georges ALÉ',
        quantity: 1,
        unitPrice: 40000,
        totalAmount: 40000,
        currency: 'XOF',
        customerName: 'Georges ALÉ',
        customerEmail: 'georges.ale@cadredevie.bj',
        customerPhone: '+229 95 88 77 66',
        shippingAddress: 'Ministère du Cadre de Vie et des Transports',
        city: 'Cotonou',
        country: 'Bénin',
        notes: 'Coffret officiel avec étui en cuir.',
        status: 'DELIVERED',
        trackingNumber: 'EXP-LOC-2026-11',
        carrier: 'Coursier Express Cotonou',
        paymentStatus: 'PAID',
        paymentMethod: 'MOBILE_MONEY',
        paymentRef: 'MOOV-MONEY-338291',
        paidAt: new Date(Date.now() - 3600 * 1000 * 72),
        createdAt: new Date(Date.now() - 3600 * 1000 * 80),
      },
      {
        orderNumber: 'ASK-20261008-004-3377',
        cardId: cards[3] ? cards[3].id : null,
        cardType: 'WOOD_BAMBOO',
        customName: 'Alexandre Leroy',
        quantity: 1,
        unitPrice: 25000,
        totalAmount: 25000,
        currency: 'XOF',
        customerName: 'Alexandre Leroy',
        customerEmail: 'alexandre.leroy@kuro.capital',
        customerPhone: '+229 96 11 22 33',
        shippingAddress: 'Zone Résidentielle Akpakpa',
        city: 'Cotonou',
        country: 'Bénin',
        notes: 'Paiement à la livraison.',
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        paymentMethod: 'CASH_ON_DELIVERY',
        createdAt: new Date(Date.now() - 3600 * 1000 * 4),
      },
      {
        orderNumber: 'ASK-20261008-005-7729',
        cardId: null,
        cardType: 'METAL_MATTE_BLACK',
        customName: 'Cabinet Kuro Capital',
        quantity: 3,
        unitPrice: 35000,
        totalAmount: 105000,
        currency: 'XOF',
        customerName: 'Direction Kuro Capital',
        customerEmail: 'contact@kurocapital.com',
        customerPhone: '+229 90 44 55 66',
        shippingAddress: 'Avenue Jean-Paul II, Centre des Affaires',
        city: 'Cotonou',
        country: 'Bénin',
        notes: '3 cartes métal gravées au nom du cabinet.',
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentMethod: 'BANK_TRANSFER',
        paymentRef: 'VIR-BNI-2026-90',
        paidAt: new Date(Date.now() - 3600 * 1000 * 2),
        createdAt: new Date(Date.now() - 3600 * 1000 * 2),
      },
    ];

    for (const ord of sampleOrders) {
      const existing = await pool.query('SELECT id FROM "Order" WHERE "orderNumber" = $1', [ord.orderNumber]);
      if (existing.rows.length === 0) {
        await pool.query(
          `INSERT INTO "Order" (
            id, "orderNumber", "userId", "cardId", "cardType", "customName",
            quantity, "unitPrice", "totalAmount", currency,
            "customerName", "customerEmail", "customerPhone", "shippingAddress",
            city, country, notes, status, "trackingNumber", carrier,
            "paymentStatus", "paymentMethod", "paymentRef", "paidAt",
            "createdAt", "updatedAt"
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5,
            $6, $7, $8, $9,
            $10, $11, $12, $13,
            $14, $15, $16, $17, $18, $19,
            $20, $21, $22, $23,
            $24, NOW()
          )`,
          [
            ord.orderNumber,
            userId,
            ord.cardId,
            ord.cardType,
            ord.customName,
            ord.quantity,
            ord.unitPrice,
            ord.totalAmount,
            ord.currency,
            ord.customerName,
            ord.customerEmail,
            ord.customerPhone,
            ord.shippingAddress,
            ord.city,
            ord.country,
            ord.notes || null,
            ord.status,
            ord.trackingNumber || null,
            ord.carrier || null,
            ord.paymentStatus,
            ord.paymentMethod,
            ord.paymentRef || null,
            ord.paidAt || null,
            ord.createdAt,
          ]
        );
        console.log(`✓ Inserted order: ${ord.orderNumber} (${ord.customerName} - ${ord.totalAmount} XOF)`);
      } else {
        console.log(`- Order already exists: ${ord.orderNumber}`);
      }
    }

    console.log("Orders seed completed successfully! 🎉");
  } catch (err) {
    console.error("Error during orders seed:", err);
  } finally {
    await pool.end();
  }
}

seedOrders();
