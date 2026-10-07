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
      margin: 12mm 14mm 14mm 14mm;
      @bottom-right {
        content: counter(page) "/" counter(pages);
        font-size: 7.5pt;
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
      line-height: 1.35;
      font-size: 8.4pt;
      margin: 0;
      padding: 0;
    }

    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .badge-confidential {
      background: #fee2e2;
      color: #991b1b;
      font-size: 7pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: inline-block;
      margin-bottom: 4px;
    }

    h1 {
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 8.4pt;
      color: #475569;
      font-weight: 600;
      margin: 0;
    }

    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 7px 11px;
      margin-bottom: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 12px;
      font-size: 7.8pt;
    }

    .meta-item strong {
      color: #0f172a;
    }

    h2 {
      font-size: 9.8pt;
      font-weight: 700;
      color: #0f172a;
      border-left: 3.5px solid #ff6b00;
      padding-left: 7px;
      margin: 10px 0 5px 0;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 8.5pt;
      font-weight: 700;
      color: #1e293b;
      margin: 7px 0 3px 0;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 5px 0;
    }

    ul, ol {
      margin: 0 0 6px 0;
      padding-left: 15px;
    }

    li {
      margin-bottom: 2px;
    }

    .highlight-card {
      background: #fff7ed;
      border-left: 3.5px solid #ff6b00;
      border-radius: 0 4px 4px 0;
      padding: 5px 9px;
      margin: 6px 0;
      font-size: 8pt;
    }

    .danger-card {
      background: #fef2f2;
      border-left: 3.5px solid #ef4444;
      border-radius: 0 4px 4px 0;
      padding: 5px 9px;
      margin: 6px 0;
      font-size: 8pt;
    }

    .success-card {
      background: #f0fdf4;
      border-left: 3.5px solid #22c55e;
      border-radius: 0 4px 4px 0;
      padding: 5px 9px;
      margin: 6px 0;
      font-size: 8pt;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0;
      font-size: 7.8pt;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 4px 6px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      font-size: 7.6pt;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    code {
      font-family: 'Consolas', 'Courier New', monospace;
      background: #e2e8f0;
      padding: 1px 3px;
      border-radius: 3px;
      font-size: 7.3pt;
      color: #0f172a;
    }

    .tag-transmis {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      font-size: 6.8pt;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
    }

    .tag-confidentiel {
      display: inline-block;
      background: #fee2e2;
      color: #991b1b;
      font-size: 6.8pt;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
    }

    .clause-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 5px 8px;
      margin-bottom: 5px;
      font-style: italic;
      color: #334155;
      font-size: 7.8pt;
      page-break-inside: avoid;
    }

    .clause-box strong.title {
      display: block;
      font-style: normal;
      color: #0f172a;
      font-weight: 700;
      margin-bottom: 2px;
      font-size: 8.2pt;
    }

    .page-break {
      page-break-before: always;
    }

    .footer-note {
      margin-top: 10px;
      padding-top: 4px;
      border-top: 1px solid #e2e8f0;
      font-size: 7.3pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="header">
    <div>
      <div class="badge-confidential">Strictement Confidentiel — Dossier Juridique & Atelier Cotonou</div>
      <h1>FICHE TECHNIQUE & CADRAGE DES DONNÉES (NDA)</h1>
      <p class="subtitle">Fabrication, Personnalisation Graphique & Encodage — Cartes Physiques Connectées Asuka Card</p>
    </div>
    <div style="text-align: right; font-size: 8pt; color: #475569;">
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
    <div class="meta-item"><strong>Périmètre territorial :</strong> 100 % Cotonou (Bénin) — Aucun transfert transfrontalier</div>
    <div class="meta-item"><strong>Juridiction compétente :</strong> Tribunal de Commerce de Cotonou</div>
  </div>

  <h2>1. OBJET DU CADRAGE POUR L'ASSISTANTE JURIDIQUE</h2>
  <p>
    Cette fiche technique circonscrit les éléments physiques, électroniques et graphiques échangés avec l'imprimeur basé à Cotonou. Elle sert de socle pour intégrer les clauses techniques et de sécurité dans l'<strong>Accord de Confidentialité (NDA)</strong> et la convention de sous-traitance régie par le <strong>Livre V du Code du Numérique en République du Bénin</strong>.
  </p>

  <h2>2. INVENTAIRE TECHNIQUE RÉEL DU SUPPORT PHYSIQUE ASUKA CARD</h2>
  <p>
    Chaque carte physique Asuka Card est fabriquée au format bancaire international standard <strong>ISO/IEC 7810 ID-1</strong> (85.60 × 53.98 mm, épaisseur 0.84 mm, étanche IP68), déclinée en finitions nobles (<em>Noir Obsidienne Soft-Touch</em> ou <em>Blanc Céramique</em>). L'agencement réel des faces est strictement le suivant :
  </p>

  <!-- TABLEAU 1 : INVENTAIRE EXACT RECTO / VERSO / PUCE -->
  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Zone de la carte</th>
        <th style="width: 48%;">Éléments présents sur le support physique réel</th>
        <th style="width: 30%;">Précision juridique & Sécurité APDP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Face Recto</strong><br>(Impression pure & sobre)</td>
        <td>
          • <strong>UNIQUEMENT le Logo officiel ASUKA CARD</strong><br>
          • Motif filigrane signature pique (spade) discret en fond de carte<br>
          • <em>Aucun nom, aucun prénom, aucune fonction, aucun logo client sur le recto.</em>
        </td>
        <td>
          Identité visuelle de la marque Asuka Card protégée par le droit des marques. Aucune donnée à caractère personnel sur cette face.
        </td>
      </tr>
      <tr>
        <td><strong>Face Verso</strong><br>(Marquage & Connectivité)</td>
        <td>
          • <strong>QR Code 2D unique individualisé</strong> (positionné à gauche, haute définition)<br>
          • <strong>Prénom & NOM du titulaire</strong> (ex. <code>Richard ODJRADO</code>)<br>
          • <strong>Fonction / Titre & Entreprise</strong> (ex. <code>CEO chez AS WORLD TECH</code>, <code>Directeur Général</code>)<br>
          • <strong>Symbole universel Contactless NFC</strong> (ondes radio indiquant la zone de scan sans contact)<br>
          • *(Optionnel : ID Carte discret gravé ex. <code>crd_rk8m4x29</code>)*
        </td>
        <td>
          <strong>RÈGLE D'OR DE MINIMISATION :</strong><br>
          Aucune coordonnée directe (numéro de téléphone, email, WhatsApp, adresse postale) n'est imprimée sur la carte. Tout est dynamique sur le cloud.
        </td>
      </tr>
      <tr>
        <td><strong>Puce NFC intégrée</strong><br>(Couche logique invisible)</td>
        <td>
          • <strong>Norme requise :</strong> Puce sans contact haute fréquence <strong>13.56 MHz</strong>, standard <strong>ISO/IEC 14443 Type A</strong> (NFC Forum Type 2)<br>
          • <strong>Puce électronique validée :</strong> <strong>NXP NTAG 215</strong> (mémoire utile 504 octets format NDEF)<br>
          • <strong>Contenu encodé :</strong> Strictement l'enregistrement standard NDEF de type URI menant au profil chiffré HTTPS (ex. <code>https://asukacard.com/[slug]</code>)
        </td>
        <td>
          <strong>OBLIGATION IMPÉRATIVE ATELIER :</strong><br>
          L'imprimeur doit activer les bits de <strong>verrouillage d'écriture (Write-Lock)</strong> dès la fin de l'encodage pour interdire toute réécriture malveillante sur le terrain.
        </td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-card">
    <strong>💡 Puce électronique sélectionnée pour l'atelier : NXP NTAG 215</strong><br>La puce utilisée et encodée par l'atelier est la <strong>NXP NTAG 215</strong> (504 octets utiles, norme ISO/IEC 14443-A). Elle assure une compatibilité native 100% sur iOS et Android sans application, et est verrouillée en lecture seule en sortie d'encodage.
  </div>

  <div class="success-card">
    <strong>Principe de minimisation (Art. 383 du Code du Numérique) :</strong>
    La carte physique ne divulgue aucune information privée sensible en cas de perte ou de vol. Seules les informations publiques de carte de visite professionnelle figurent au verso.
  </div>

  <div class="page-break"></div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="header">
    <div>
      <div class="badge-confidential">Strictement Confidentiel — Dossier Juridique & Atelier Cotonou</div>
      <h1>FICHE TECHNIQUE & CADRAGE DES DONNÉES (NDA)</h1>
      <p class="subtitle">Typologie des Données, Table de Production Réelle & Flux d'Échange</p>
    </div>
    <div style="text-align: right; font-size: 8pt; color: #475569;">
      <strong>AS WORLD TECH</strong> — Page 2 / 3
    </div>
  </div>

  <h2>3. TYPOLOGIE COMPARATIVE DES DONNÉES (TRANSMISES VS CONSERVÉES)</h2>
  <p>
    Le système Asuka Card cloisonne hermétiquement ce qui est communiqué à l'imprimeur de Cotonou de ce qui demeure stocké sur les serveurs sécurisés d'AS WORLD TECH :
  </p>

  <!-- TABLEAU 2 : DONNEES TRANSMISES VS DONNEES CLOUD SECURISEES -->
  <table>
    <thead>
      <tr>
        <th style="width: 26%;">Catégorie de données</th>
        <th style="width: 38%;">Éléments concernés</th>
        <th style="width: 14%;">Statut Atelier</th>
        <th style="width: 22%;">Régime juridique APDP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Marquage Recto</strong></td>
        <td>Logo officiel vectoriel ASUKA CARD</td>
        <td><span class="tag-transmis">Transmis</span></td>
        <td>Propriété exclusive AS WORLD TECH.</td>
      </tr>
      <tr>
        <td><strong>Personnalisation Verso</strong></td>
        <td>Prénom, Nom, Titre / Fonction, Entreprise, Symbole NFC, QR Code 2D, ID Carte</td>
        <td><span class="tag-transmis">Transmis</span></td>
        <td>DCP professionnelle publique strictement cantonnée au tirage du lot commandé.</td>
      </tr>
      <tr>
        <td><strong>Encodage Puce NFC</strong></td>
        <td>URL dynamique chiffrée HTTPS (<code>https://asukacard.com/[slug]</code>)</td>
        <td><span class="tag-transmis">Transmis</span></td>
        <td>Donnée technique de routage web.</td>
      </tr>
      <tr>
        <td><strong>Coordonnées Directes Privées & Professionnelles</strong></td>
        <td>Numéros de téléphone mobile direct, WhatsApp, adresses emails, adresses postales et domiciles</td>
        <td><span class="tag-confidentiel">NON Transmis</span></td>
        <td><strong>100 % hébergées sur le Cloud AS WORLD TECH.</strong> Jamais communiquées à l'imprimeur.</td>
      </tr>
      <tr>
        <td><strong>Réseaux Sociaux, Bio & Paramètres</strong></td>
        <td>Comptes LinkedIn, X, Insta, YouTube, TikTok, Biographie, Droits de visibilité (<code>fieldVisibility</code>)</td>
        <td><span class="tag-confidentiel">NON Transmis</span></td>
        <td>Accessibles uniquement lors du scan de la carte selon les autorisations fixées par le titulaire.</td>
      </tr>
    </tbody>
  </table>

  <h2>4. TABLE DE PRODUCTION TRANSMISE À L'IMPRIMEUR (DONNÉES RÉELLES)</h2>
  <p>
    Voici l'extrait exact de la table de production basée sur les <strong>cartes réellement existantes</strong> dans le système Asuka Card, illustrant la séparation stricte Recto / Verso / Puce NFC :
  </p>

  <!-- TABLEAU 3 : TABLEAU DE PRODUCTION REEL -->
  <table>
    <thead>
      <tr>
        <th style="width: 12%;">ID_CARTE</th>
        <th style="width: 14%;">RECTO</th>
        <th style="width: 20%;">VERSO (Identité & Titre)</th>
        <th style="width: 12%;">VERSO (Éléments)</th>
        <th style="width: 15%;">URL_NFC (Puce NDEF)</th>
        <th style="width: 14%;">RÉF_QR_CODE</th>
        <th style="width: 13%;">PUCE REC.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>crd_rk8m4x29</code></td>
        <td>Logo ASUKA CARD</td>
        <td><strong>Richard ODJRADO</strong><br>CEO chez AS WORLD TECH</td>
        <td>QR Code + Symbole NFC</td>
        <td><code>https://asukacard.com/rk8m4x29</code></td>
        <td><code>qr-richard-odjrado.svg</code></td>
        <td>NTAG215</td>
      </tr>
      <tr>
        <td><code>crd_ga9m3x7w</code></td>
        <td>Logo ASUKA CARD</td>
        <td><strong>Georges ALÉ</strong><br>Ministre (Cadre de Vie & Transports)</td>
        <td>QR Code + Symbole NFC</td>
        <td><code>https://asukacard.com/ga9m3x7w</code></td>
        <td><code>qr-georges-ale.svg</code></td>
        <td>NTAG215</td>
      </tr>
      <tr>
        <td><code>crd_v7p1k3d8</code></td>
        <td>Logo ASUKA CARD</td>
        <td><strong>Richard ODJRADO</strong><br>Lead Product Architect (Asuka Card)</td>
        <td>QR Code + Symbole NFC</td>
        <td><code>https://asukacard.com/v7p1k3d8</code></td>
        <td><code>qr-richard-odjrado-orange.svg</code></td>
        <td>NTAG215</td>
      </tr>
      <tr>
        <td><code>crd_demo_1</code></td>
        <td>Logo ASUKA CARD</td>
        <td><strong>Jean DUPONT</strong><br>Directeur de Création (Asuka Studio)</td>
        <td>QR Code + Symbole NFC</td>
        <td><code>https://asukacard.com/jean-dupont</code></td>
        <td><code>qr-jean-dupont.svg</code></td>
        <td>NTAG215</td>
      </tr>
    </tbody>
  </table>

  <h3>Format d'échange tabulaire normalisé (Fichier CSV de production) :</h3>
  <pre style="background: #f1f5f9; padding: 5px 8px; border-radius: 4px; font-size: 6.9pt; margin: 3px 0 6px 0; overflow-x: auto; border: 1px solid #cbd5e1; font-family: Consolas, monospace;"><code>ID_Carte,Recto_Marquage,Nom_Prenom_Verso,Fonction_Entreprise_Verso,Symbole_NFC,Ref_QR_Code,URL_NFC,Puce_Norme
crd_rk8m4x29,LOGO_ASUKA_CARD,Richard ODJRADO,CEO chez AS WORLD TECH,OUI,qr-richard-odjrado.svg,https://asukacard.com/rk8m4x29,NTAG215
crd_ga9m3x7w,LOGO_ASUKA_CARD,Georges ALE,Ministre - Cadre de Vie & Transports,OUI,qr-georges-ale.svg,https://asukacard.com/ga9m3x7w,NTAG215
crd_v7p1k3d8,LOGO_ASUKA_CARD,Richard ODJRADO,Lead Product Architect - Asuka Card,OUI,qr-richard-odjrado-orange.svg,https://asukacard.com/v7p1k3d8,NTAG215
crd_demo_1,LOGO_ASUKA_CARD,Jean DUPONT,Directeur de Creation - Asuka Studio,OUI,qr-jean-dupont.svg,https://asukacard.com/jean-dupont,NTAG215</code></pre>

  <div class="danger-card">
    <strong>⛔ INTERDICTION FORMELLE DE L'USAGE DE WHATSAPP / TELEGRAM :</strong><br>
    Transmission exclusive par Cloud sécurisé AS WORLD TECH ou support USB chiffré remis en main propre contre émargement. Interdiction de transférer les listes de collaborateurs ou fichiers par messageries instantanées personnelles.
  </div>

  <div class="page-break"></div>

  <!-- ==================== PAGE 3 ==================== -->
  <div class="header">
    <div>
      <div class="badge-confidential">Strictement Confidentiel — Dossier Juridique & Atelier Cotonou</div>
      <h1>FICHE TECHNIQUE & CADRAGE DES DONNÉES (NDA)</h1>
      <p class="subtitle">Clauses Contractuelles Types pour l'Accord de Confidentialité (NDA)</p>
    </div>
    <div style="text-align: right; font-size: 8pt; color: #475569;">
      <strong>AS WORLD TECH</strong> — Page 3 / 3
    </div>
  </div>

  <h2>5. SPÉCIFICITÉS ATELIER DE COTONOU : CONTRÔLE, REBUTS & PURGE</h2>
  <ul>
    <li><strong>Droit d'audit physique sur place :</strong> AS WORLD TECH se réserve le droit d'effectuer des visites de contrôle inopinées dans l'atelier de Cotonou pour s'assurer de la conformité du stockage et de l'encodage.</li>
    <li><strong>Destruction physique impérative des rebuts (Gâches d'essais) :</strong> Broyage mécanique obligatoire de toute carte défectueuse. Interdiction formelle d'exposer ou de réutiliser des cartes à titre d'échantillons commerciaux.</li>
    <li><strong>Purge définitive des fichiers (30 jours) :</strong> Suppression totale et certifiée de tous les fichiers de production à J+30 de la livraison.</li>
  </ul>

  <h2>6. CLAUSES TYPES PRÊTES À L'EMPLOI (CODE DU NUMÉRIQUE / APDP)</h2>

  <div class="clause-box">
    <strong class="title">Article 1 – Définition des Informations Confidentielles et Données Transmises</strong>
    « Sont qualifiées d'Informations Confidentielles toutes les données à caractère personnel imprimées au verso des cartes (noms, prénoms, fonctions, entreprises), les fichiers tabulaires de production, les URL dynamiques de redirection associées au domaine asukacard.com, les matrices de QR codes, ainsi que le logo officiel et les maquettes graphiques de la marque Asuka Card transmis par AS WORLD TECH au Prestataire pour l'exécution des travaux dans son atelier de Cotonou. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 2 – Conformité au Code du Numérique Béninois et aux directives de l'APDP</strong>
    « Le Prestataire reconnaît expressément être soumis aux dispositions du Livre V de la Loi n° 2017-20 portant Code du Numérique en République du Bénin et aux directives de l'APDP. Le Prestataire traite les données nominatives sur les seules instructions documentées d'AS WORLD TECH, à l'exclusion de toute exploitation, cession, constitution de base de données ou réutilisation pour son propre compte ou celui d'un tiers. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 3 – Agencement des supports et interdiction des messageries grand public</strong>
    « Le Prestataire s'engage à respecter scrupuleusement l'agencement validé par AS WORLD TECH : Face Recto réservée exclusivement au logo officiel ASUKA CARD ; Face Verso regroupant le QR code, le nom, prénom, la fonction et le symbole sans contact NFC. La transmission des fichiers de fabrication s'effectue exclusivement par canal Cloud professionnel sécurisé ou par support physique sécurisé remis contre émargement, à l'exclusion formelle de messageries instantanées grand public (notamment WhatsApp, Telegram). »
  </div>

  <div class="clause-box">
    <strong class="title">Article 4 – Sécurité de la puce NFC et verrouillage obligatoire en écriture (Write-Lock)</strong>
    « Le Prestataire garantit l'utilisation de la puce sans contact 13.56 MHz NXP NTAG 215 (norme ISO/IEC 14443 Type A, mémoire utile 504 octets). Le Prestataire active obligatoirement le verrouillage définitif en écriture (Write-Lock / Lock bits) de la puce immédiatement après l'encodage de l'URL fournie par AS WORLD TECH, de manière à empêcher toute altération ou réécriture ultérieure sur le support. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 5 – Sort des rebuts de fabrication et interdiction formelle d'échantillonnage</strong>
    « Le Prestataire s'interdit formellement de conserver, diffuser ou exposer des cartes confectionnées à titre d'échantillons ou de supports publicitaires. Tout rebut de fabrication comportant des mentions nominatives ou une puce encodée doit être immédiatement et physiquement détruit par broyage mécanique. Les fichiers informatiques seront définitivement supprimés dans les trente (30) jours suivant la livraison. »
  </div>

  <div class="clause-box">
    <strong class="title">Article 6 – Droit d'audit en atelier, notification d'incident et juridiction compétente</strong>
    « AS WORLD TECH se réserve le droit de vérifier à tout moment, par visite inopinée dans l'atelier de Cotonou, la bonne exécution des obligations de sécurité. En cas d'incident de sécurité, le Prestataire avertira AS WORLD TECH sans délai sous 24 heures. Le présent accord est soumis au droit béninois. Tout différend relèvera de la compétence exclusive du Tribunal de Commerce de Cotonou, sans préjudice des compétences de l'APDP. »
  </div>

  <div style="margin-top: 8px; border: 1px dashed #cbd5e1; border-radius: 4px; padding: 7px 10px; background: #fff;">
    <div style="font-weight: 700; color: #0f172a; margin-bottom: 5px; font-size: 7.8pt;">MENTION D'ENGAGEMENT CONTRACTUEL :</div>
    <div style="display: flex; justify-content: space-between; font-size: 7.5pt; color: #334155;">
      <div>
        <strong>Pour AS WORLD TECH (Donneur d'ordre) :</strong><br>
        Nom : ODJRADO Richard<br>
        Qualité : Fondateur & CEO<br>
        Signature & Cachet :
      </div>
      <div>
        <strong>Pour l'Atelier d'Impression (Sous-traitant - Cotonou) :</strong><br>
        Nom du Responsable : _______________________<br>
        Qualité : Directeur d'atelier<br>
        Signature & Cachet :
      </div>
    </div>
  </div>

  <div class="footer-note">
    <span>Fiche de cadrage technique pour NDA d'impression — AS WORLD TECH / Asuka Card</span>
    <span>Conformité APDP Bénin (Livre V Code du Numérique)</span>
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

  // Copie également dans Downloads pour synchronisation
  const downloadsPath = 'C:\\Users\\Admin\\Downloads\\FICHE_TECHNIQUE_CADRAGE_NDA_IMPRIMEUR.pdf';
  try {
    fs.copyFileSync(outputPath, downloadsPath);
    console.log('PDF synchronisé avec succès dans Downloads :', downloadsPath);
  } catch (err) {
    console.warn('Impossible de copier dans Downloads (non bloquant) :', err.message);
  }
}

generatePdf().catch(err => {
  console.error('Erreur génération PDF :', err);
  process.exit(1);
});
