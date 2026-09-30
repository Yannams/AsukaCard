const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const qrDir = path.join(__dirname, '..', 'public', 'qr');
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true });
}

const targets = [
  {
    name: 'qr-richard-odjrado',
    title: 'Richard Odjrado (Executive)',
    url: 'https://asukacard.com/rk8m4x29',
  },
  {
    name: 'qr-richard-odjrado-orange',
    title: 'Richard Odjrado (Modern Orange)',
    url: 'https://asukacard.com/v7p1k3d8',
  },
  {
    name: 'qr-georges-ale',
    title: 'Georges Alé (Executive)',
    url: 'https://asukacard.com/ga9m3x7w',
  },
];

async function generate() {
  for (const t of targets) {
    const pngPath = path.join(qrDir, `${t.name}.png`);
    const svgPath = path.join(qrDir, `${t.name}.svg`);

    // Standard high-res PNG (1024x1024)
    await QRCode.toFile(pngPath, t.url, {
      width: 1024,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#0A0A0A',
        light: '#FFFFFF',
      },
    });

    // Vector SVG
    await QRCode.toFile(svgPath, t.url, {
      margin: 2,
      errorCorrectionLevel: 'H',
      type: 'svg',
      color: {
        dark: '#0A0A0A',
        light: '#FFFFFF',
      },
    });

    // Also a dark mode branded version (dark background with orange or white)
    const pngDarkPath = path.join(qrDir, `${t.name}-dark.png`);
    await QRCode.toFile(pngDarkPath, t.url, {
      width: 1024,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#FFFFFF',
        light: '#0A0A0A',
      },
    });

    console.log(`Generated QR codes for ${t.title} -> ${t.url}`);
  }
}

generate().catch(console.error);
