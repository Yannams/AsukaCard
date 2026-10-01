const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Fiche Technique & Cadrage NDA - AS WORLD TECH</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 16mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page) "/" counter(pages);
        font-size: 8pt;
        color: #64748b;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
    }
    
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.45;
      font-size: 9.5pt;
      margin: 0;
      padding: 0;
    }

    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .badge-confidential {
      background: #fee2e2;
      color: #991b1b;
      font-size: 8pt;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: inline-block;
      margin-bottom: 6px;
    }

    h1 {
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 4px 0;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 9.5pt;
      color: #475569;
      font-weight: 600;
      margin: 0;
    }

    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 16px;
      font-size: 8.5pt;
    }

    .meta-item strong {
      color: #0f172a;
    }

    h2 {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      border-left: 3.5px solid #ff6b00;
      padding-left: 8px;
      margin: 16px 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #1e293b;
      margin: 10px 0 4px 0;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 8px 0;
    }

    ul, ol {
      margin: 0 0 10px 0;
      padding-left: 18px;
    }

    li {
      margin-bottom: 3px;
    }

    .highlight-card {
      background: #fff7ed;
      border-left: 4px solid #ff6b00;
      border-radius: 0 6px 6px 0;
      padding: 8px 12px;
      margin: 10px 0;
      font-size: 9pt;
    }

    .danger-card {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      border-radius: 0 6px 6px 0;
      padding: 8px 12px;
      margin: 10px 0;
      font-size: 9pt;
    }

    .success-card {
      background: #f0fdf4;
      border-left: 4px solid #22c55e;
      border-radius: 0 6px 6px 0;
      padding: 8px 12px;
      margin: 10px 0;
      font-size: 9pt;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    code {
      font-family: 'Consolas', 'Courier New', monospace;
      background: #e2e8f0;
      padding: 1px 4px;
      border-radius: 3px;
      font-size: 8pt;
      color: #0f172a;
    }

    .clause-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 9px 12px;
      margin-bottom: 8px;
      font-style: italic;
      color: #334155;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }

    .clause-box strong.title {
      display: block;
      font-style: normal;
      color: #0f172a;
      font-weight: 700;
      margin-bottom: 4px;
      font-size: 9pt;
    }

    .page-break {
      page-break-before: always;
    }

    .footer-note {
      margin-top: 18px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="header">
    <div>
      <div class="badge-confidential">Strictement Confidentiel — Dossier Juridique</div>
      <h1>FICHE TECHNIQUE & CADRAGE DES DONNÉES (NDA)</h1>
      <p class="subtitle">Fabrication, Personnalisation Graphique & Encodage — Cartes Physiques Connectées Asuka Card</p>
    </div>
    <div style="text-align: right; font-size: 8.5pt; color: #475569;">
      <strong>AS WORLD TECH</strong><br>
      Cotonou, République du Bénin<br>
      Date : Octobre 2026
    </div>
  </div>

  <div class="meta-box">
    <div class="meta-item"><strong>Donneur d'ordre (Responsable de traitement) :</strong> AS WORLD TECH</div>
    <div class="meta-item"><strong>Autorité de régulation :</strong> APDP (Bénin)</div>
    <div class="meta-item"><strong>Prestataire (Sous-traitant) :</strong> Atelier d'impression & d'encodage (Cotonou)</div>
    <div class="meta-item"><strong>Législation de référence :</strong> Code du Numérique (Loi n° 2017-20 mod.)</div>
    <div class="meta-item"><strong>Périmètre territorial :</strong> 100 % Cotonou (Bénin) — Pas de transfert hors Bénin</div>
    <div class="meta-item"><strong>Juridiction compétente :</strong> Tribunal de Commerce de Cotonou</div>
  </div>

  <h2>1. OBJET DU CADRAGE POUR L'ASSISTANTE JURIDIQUE</h2>
  <p>
    Cette fiche technique circonscrit les éléments physiques, électroniques et numériques échangés avec le prestataire imprimeur situé à Cotonou. Elle sert de socle pour intégrer les clauses techniques et de sécurité dans l'<strong>Accord de Confidentialité (NDA)</strong> et la convention de sous-traitance régie par le <strong>Livre V du Code du Numérique</strong>.
  </p>

  <h2>2. INVENTAIRE EXHAUSTIF : QU'Y A-T-IL SUR LA CARTE PHYSIQUE ?</h2>
  <p>La carte connectée physique comprend 3 couches d'informations bien distinctes :</p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Zone de la carte</th>
        <th style="width: 45%;">Éléments présents sur le support</th>
        <th style="width: 30%;">Précision juridique & Sécurité</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Face Recto</strong><br>(Impression / Gravure)</td>
        <td>
          • Logo vectoriel de l'entreprise cliente (HD)<br>
          • Prénom et Nom du titulaire<br>
          • Titre / Fonction professionnelle<br>
          • Nom de l'entreprise / Marque<br>
          • Micro-textures tactiles & picto contactless
        </td>
        <td>
          Données professionnelles d'identification classique. Propriété intellectuelle des clients protégée.
        </td>
      </tr>
      <tr>
        <td><strong>Face Verso</strong><br>(Marquage laser / UV)</td>
        <td>
          • <strong>QR Code 2D unique individualisé</strong><br>
          • Numéro de série / ID unique gravé (traçabilité)<br>
          • Logo discret Asuka Card & mentions
        </td>
        <td>
          <strong>RÈGLE ESSENTIELLE :</strong> Aucune coordonnée sensible (téléphone, email perso, WhatsApp, adresse) n'est imprimée en dur. Tout est dynamique sur le cloud.
        </td>
      </tr>
      <tr>
        <td><strong>Puce NFC intégrée</strong><br>(Couche invisible)</td>
        <td>
          • Puce RFID 13.56 MHz (NXP NTAG213 / 215 / 216)<br>
          • Enregistrement NDEF standard de type URI<br>
          • Contenu : <code>https://asukacard.com/[slug]</code>
        </td>
        <td>
          <strong>OBLIGATION IMPÉRATIVE :</strong> L'imprimeur doit activer le <strong>verrouillage en écriture (Write-Lock)</strong> pour empêcher toute modification ultérieure par un tiers.
        </td>
      </tr>
    </tbody>
  </table>

  <div class="success-card">
    <strong>Principe de minimisation des données (Art. 383 du Code du Numérique) :</strong>
    La carte physique ne divulgue aucune information personnelle sensible en cas de perte ou de vol. Seule l'URL dynamique HTTPS est programmée dans la puce NFC et le QR code.
  </div>

  <h2>3. TYPOLOGIE DES DONNÉES PARTAGÉES AVEC L'IMPRIMEUR</h2>
  <table>
    <thead>
      <tr>
        <th>Catégorie</th>
        <th>Données précises transmises</th>
        <th>Sensibilité</th>
        <th>Exigence APDP / Juridique</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Données Personnelles (DCP)</strong></td>
        <td>Nom, Prénom, Fonction, Entreprise cliente, éventuelle photo badge.</td>
        <td>Élevée</td>
        <td>Usage strictement limité à la production du lot commandé.</td>
      </tr>
      <tr>
        <td><strong>Créations & Marques</strong></td>
        <td>Logos vectoriels haute définition, chartes graphiques de clients prestigieux (sociétés, banques, ministères).</td>
        <td>Très Élevée</td>
        <td>Secret d'affaires et droit des marques : interdiction formelle de reproduction non autorisée.</td>
      </tr>
      <tr>
        <td><strong>Données Techniques</strong></td>
        <td>Table de correspondance : <code>ID_Carte</code> ↔ <code>Identité</code> ↔ <code>URL Slug</code> ↔ <code>UID Puce</code>.</td>
        <td>Sensible</td>
        <td>Intégrité et sécurité informatique contre usurpation d'identité.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- PAGE 2 -->
  <div class="header">
    <div>
      <div class="badge-confidential">Strictement Confidentiel — Dossier Juridique</div>
      <h1>FICHE TECHNIQUE & CADRAGE DES DONNÉES (NDA)</h1>
      <p class="subtitle">Protocole de Transfert des Données & Spécificités Cotonou</p>
    </div>
    <div style="text-align: right; font-size: 8.5pt; color: #475569;">
      <strong>AS WORLD TECH</strong> — Page 2 / 3
    </div>
  </div>

  <h2>4. PROTOCOLE CONCRET DE TRANSFERT DES DONNÉES</h2>
  <p>Pour chaque commande de cartes, AS WORLD TECH met à disposition de l'imprimeur un <strong>« Pack de Production »</strong> standardisé.</p>

  <h3>A. Le fichier tabulaire de production (Exemple des colonnes exactes)</h3>
  <p>Fichier <code>production_lot_[NUMERO].xlsx</code> restreint aux colonnes utiles :</p>
  <table>
    <thead>
      <tr>
        <th>ID_CARTE</th>
        <th>NOM</th>
        <th>PRENOM</th>
        <th>POSTE</th>
        <th>ENTREPRISE</th>
        <th>URL_NFC (Lien à programmer)</th>
        <th>REF_LOGO</th>
        <th>REF_QR</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>ASK-COT-01</code></td>
        <td>KOUDJO</td>
        <td>Marc</td>
        <td>Directeur Général</td>
        <td>Société Béninoise d'Énergie</td>
        <td><code>https://asukacard.com/marc-koudjo</code></td>
        <td><code>logo_sbe.eps</code></td>
        <td><code>qr_01.png</code></td>
      </tr>
      <tr>
        <td><code>ASK-COT-02</code></td>
        <td>AGBOSSA</td>
        <td>Claire</td>
        <td>Responsable RSE</td>
        <td>Société Béninoise d'Énergie</td>
        <td><code>https://asukacard.com/claire-agbossa</code></td>
        <td><code>logo_sbe.eps</code></td>
        <td><code>qr_02.png</code></td>
      </tr>
    </tbody>
  </table>

  <h3>B. Canaux de transmission autorisés</h3>
  <ul>
    <li><strong>Option 1 (Canal officiel recommandé) :</strong> Espace Cloud professionnel sécurisé AS WORLD TECH (Google Workspace / OneDrive Pro) partagé nominativement avec l'adresse email professionnelle du chef d'atelier (accès restreint en lecture/téléchargement, sans droit de repartage).</li>
    <li><strong>Option 2 (Canal atelier physique Cotonou) :</strong> Remise directe en atelier sur clé USB dédiée fournie par AS WORLD TECH, remise contre bordereau d'émargement physique.</li>
  </ul>

  <div class="danger-card">
    <strong>⛔ INTERDICTION FORMELLE — LE PIÈGE LOCAL WHATSAPP / TELEGRAM :</strong><br>
    Il est formellement interdit de faire transiter les listes de collaborateurs ou les maquettes clients par WhatsApp ou messageries personnelles. <em>Motif juridique :</em> Les données restent indexées dans les galeries de téléphones personnels des employés de l'imprimerie et synchronisées sur des clouds privés non sécurisés.
  </div>

  <h2>5. SPÉCIFICITÉS LOCALES DE COTONOU : CONTRÔLE, ATELIER & REBUTS</h2>
  
  <h3>5.1. Droit d'inspection physique sur place</h3>
  <p>
    L'atelier étant situé à Cotonou, AS WORLD TECH stipule dans le contrat un <strong>droit de visite et d'audit inopiné des locaux</strong> pour vérifier les conditions de stockage des cartes vierges, la non-prolifération des fichiers sur les postes de PAO et la destruction des rebuts.
  </p>

  <h3>5.2. Gestion impérative des rebuts (Gâches et cartes d'essais)</h3>
  <p>
    Pendant le calage des machines et de l'encodage, des cartes sont gâchées avec de vraies identités. Le contrat impose :
  </p>
  <ul>
    <li><strong>Broyage mécanique / déchiquetage obligatoire</strong> de toute carte de rebut. Interdiction de mise au rebut intact dans les poubelles ordinaires de l'atelier.</li>
    <li><strong>Interdiction absolue des "cartes échantillons" :</strong> L'imprimeur s'interdit formellement d'exposer ou de conserver les cartes de clients d'AS WORLD TECH sur son comptoir ou dans sa vitrine à Cotonou à des fins de démonstration commerciale.</li>
  </ul>

  <h3>5.3. Rétention des données et purge (30 jours)</h3>
  <p>
    Les fichiers numériques de production ne peuvent être conservés que pendant une durée maximale de <strong>30 jours calendaires</strong> après livraison (délai de grâce pour retirages d'éventuels défauts). Passé ce délai, purge définitive et irréversible de tous les fichiers informatiques.
  </p>

  <div class="page-break"></div>

  <!-- PAGE 3 -->
  <div class="header">
    <div>
      <div class="badge-confidential">Strictement Confidentiel — Dossier Juridique</div>
      <h1>FICHE TECHNIQUE & CADRAGE DES DONNÉES (NDA)</h1>
      <p class="subtitle">Clauses Contractuelles Types pour l'Assistante Juridique</p>
    </div>
    <div style="text-align: right; font-size: 8.5pt; color: #475569;">
      <strong>AS WORLD TECH</strong> — Page 3 / 3
    </div>
  </div>

  <h2>6. CLAUSES TYPES PRÊTES À L'EMPLOI (CODE DU NUMÉRIQUE / APDP)</h2>
  <p>L'assistante juridique peut directement reprendre ou adapter ces clauses pour le contrat de fabrication :</p>

  <div class="clause-box">
    <strong class="title">Article 1 – Définition des Informations Confidentielles</strong>
    « Sont qualifiées d'Informations Confidentielles toutes les données à caractère personnel (noms, prénoms, fonctions, photos), les fichiers tabulaires de production, les URL de redirection associées au domaine asukacard.com, les clés de programmation des puces NFC, ainsi que l'ensemble des créations visuelles, logos, marques et gabarits transmis par AS WORLD TECH au Prestataire pour l'exécution des travaux dans son atelier de Cotonou. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 2 – Conformité au Code du Numérique et aux règles de l'APDP</strong>
    « Le Prestataire s'engage à respecter scrupuleusement les dispositions du Livre V de la Loi n° 2017-20 portant Code du Numérique en République du Bénin et les directives de l'APDP. Le Prestataire agit en qualité de sous-traitant exclusif et traite les données nominatives sur les seules instructions documentées d'AS WORLD TECH. Il s'interdit formellement toute exploitation, cession, constitution de base de données ou réutilisation pour son propre compte ou celui d'un tiers. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 3 – Modalités de transfert et interdiction des messageries grand public</strong>
    « La transmission des données s'effectue exclusivement par lien Cloud sécurisé ou par support physique sécurisé remis contre émargement. Les Parties s'interdisent formellement de transmettre tout fichier nominatif ou maquette de production par des applications de messagerie grand public (notamment WhatsApp, Telegram, Messenger). Le Prestataire s'assure que les fichiers ne sont accessibles qu'aux seuls personnels techniques affectés à la fabrication. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 4 – Sécurité de la puce NFC et verrouillage d'écriture (Write-Lock)</strong>
    « Le Prestataire garantit que chaque carte connectée confectionnée comportera un verrouillage définitif en écriture (Write-Lock) de la puce NFC immédiatement après l'encodage de l'URL fournie par AS WORLD TECH, de manière à empêcher toute altération ou écriture non autorisée sur le support. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 5 – Sort des rebuts de fabrication et interdiction d'échantillonnage</strong>
    « Le Prestataire a l'interdiction formelle de conserver, diffuser ou exposer des cartes confectionnées à titre d'échantillons ou de supports publicitaires. Toute carte défectueuse, essai de calage ou rebut comportant des mentions nominatives ou une puce encodée doit être immédiatement et physiquement détruit par broyage mécanique. Les fichiers informatiques seront définitivement supprimés dans les trente (30) jours suivant la livraison. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 6 – Droit d'audit, notification d'incident et juridiction compétente</strong>
    « AS WORLD TECH se réserve le droit de vérifier à tout moment, par visite inopinée dans l'atelier de Cotonou, la bonne exécution des obligations de sécurité. En cas d'incident de sécurité ou de tentative de soustraction de supports, le Prestataire avertira AS WORLD TECH sans délai et au plus tard sous vingt-quatre (24) heures. Le présent accord est soumis au droit béninois. Tout différend relèvera de la compétence exclusive du Tribunal de Commerce de Cotonou, sans préjudice des compétences de l'APDP. »
  </div>

  <div class="footer-note">
    <span>Document de cadrage technique pour rédaction contractuelle — AS WORLD TECH & Asuka Card</span>
    <span>Conformité APDP Bénin / Code du Numérique</span>
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log('Lancement du navigateur Edge...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const outputPath = path.resolve('c:/Users/Admin/AsukaCard/FICHE_TECHNIQUE_CADRAGE_NDA_IMPRIMEUR.pdf');

  console.log('Génération du PDF en cours...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    }
  });

  await browser.close();
  console.log('PDF généré avec succès à l\'adresse :', outputPath);
}

generatePdf().catch(err => {
  console.error('Erreur génération PDF :', err);
  process.exit(1);
});
