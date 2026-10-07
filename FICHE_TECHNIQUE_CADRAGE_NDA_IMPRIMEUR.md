# FICHE TECHNIQUE & CADRAGE DES DONNÉES POUR ACCORD DE CONFIDENTIALITÉ (NDA / ACCORD SOUS-TRAITANT)
**Cadre Réglementaire : Conformité APDP & Code du Numérique (Bénin)**
**Imprimeur : Atelier de fabrication situé à Cotonou**
**Prestation : Fabrication, Personnalisation Graphique & Encodage des Cartes Physiques Connectées Asuka Card**

---

## 1. OBJET DU DOCUMENT & CONTEXTE JURIDIQUE LOCAL (COTONOU / BÉNIN)

Ce document technique est rédigé à l'attention de l'assistante / équipe juridique afin d'établir l'**Accord de Confidentialité (NDA)** et le **Cahier des Charges de Sécurité des Données** liant le donneur d'ordre à l'imprimeur basé à **Cotonou** :

* **Donneur d'ordre (Responsable du traitement)** : **AS WORLD TECH** (Société émettrice d'Asuka Card)
* **Prestataire (Sous-traitant au sens du Code du Numérique)** : Fournisseur / Atelier d'impression et d'encodage situé à **Cotonou (Bénin)**.
* **Autorité de régulation compétente** : **APDP (Autorité de Protection des Données Personnelles du Bénin)**.
* **Législation applicable** : **Loi n° 2017-20 du 20 avril 2018 portant Code du Numérique en République du Bénin** (Livre V : *De la protection des données à caractère personnel*), modifiée par la Loi n° 2020-35.
* **Tribunal compétent en cas de litige** : **Tribunal de Commerce de Cotonou** / Juridictions compétentes de Cotonou.
* **Situation géographique & Territorialité** : L'imprimeur étant établi à **Cotonou**, le traitement des données est **100 % territorialement situé au Bénin**. **Il n'y a donc aucun transfert transfrontalier de données hors du Bénin**, ce qui dispense le dossier des formalités lourdes de transfert international auprès de l'APDP.

---

## 2. INVENTAIRE TECHNIQUE DU SUPPORT PHYSIQUE RÉELLEMENT EXISTANT

Chaque carte physique Asuka Card est un objet connecté fabriqué au standard bancaire international **ISO/IEC 7810 ID-1** (85.60 × 53.98 mm, épaisseur 0.84 mm, étanche IP68), déclinée en finitions nobles (*Noir Obsidienne Soft-Touch* et *Blanc Céramique*).

L'agencement réel des faces est strictement le suivant :

### Tableau 1 : Inventaire physique & logique réel

| Zone de la carte | Éléments présents sur le support physique réel | Précision juridique & Sécurité APDP |
| :--- | :--- | :--- |
| **Face Recto**<br>*(Impression sobre & épurée)* | • **UNIQUEMENT le Logo officiel ASUKA CARD**<br>• Motif filigrane signature pique (*spade*) discret en fond de carte<br>• *Aucun nom, aucun prénom, aucune fonction, aucun logo client sur cette face.* | Propriété intellectuelle et droit des marques exclusifs à AS WORLD TECH. Aucune Donnée à Caractère Personnel (DCP) sur le recto. |
| **Face Verso**<br>*(Marquage nominatif & Connectivité)* | • **QR Code 2D unique individualisé** (placé à gauche, haute définition)<br>• **Prénom & NOM du titulaire** (ex. `Richard ODJRADO`)<br>• **Fonction / Titre & Entreprise** (ex. `CEO chez AS WORLD TECH`, `Directeur Général`)<br>• **Symbole universel Contactless NFC** (ondes sans contact à droite)<br>• *(Optionnel : ID Carte discret gravé ex. `crd_rk8m4x29`)* | **RÈGLE D'OR DE MINIMISATION :**<br>Aucune coordonnée directe (numéro de téléphone, email, WhatsApp, adresse postale) n'est imprimée sur la carte. Tout est dynamique sur le cloud. |
| **Puce NFC intégrée**<br>*(Couche logique invisible)* | • **Norme requise :** Puce sans contact haute fréquence **13.56 MHz**, standard **ISO/IEC 14443 Type A** (NFC Forum Type 2)<br>• **Modèles de référence compatibles :** Gamme **NXP NTAG213, NTAG215 ou NTAG216** (mémoire utile min. 144 octets)<br>• **Contenu encodé :** Strictement l'enregistrement standard NDEF URI (URL dynamique HTTPS : `https://asukacard.com/[slug]`) | **OBLIGATION IMPÉRATIVE ATELIER :**<br>L'imprimeur doit activer les bits de **verrouillage d'écriture (Write-Lock)** dès la fin de l'encodage pour interdire toute réécriture malveillante sur le terrain. |

> **💡 Clarification technique sur le modèle de puce pour l'atelier :**  
> Il n'est pas obligatoire d'imposer un seul modèle rigide de puce, pourvu qu'elle respecte la norme universelle **ISO/IEC 14443-A (13.56 MHz)**.  
> La gamme **NXP NTAG (NTAG213, NTAG215 ou NTAG216)** offre une compatibilité native 100% avec tous les smartphones (iOS et Android) sans aucune application requise. Une puce NTAG213 (144 octets) suffit amplement pour stocker l'URL dynamique HTTPS.

---

## 3. TYPOLOGIE COMPARATIVE DES DONNÉES (TRANSMISES VS CONSERVÉES)

En application du **principe de minimisation des données (Art. 383 du Code du Numérique)**, le système Asuka Card cloisonne strictement les données envoyées à l'atelier de celles conservées sur la plateforme logicielle :

### Tableau 2 : Dissociation stricte Données Atelier vs Données Cloud Sécurisées

| Catégorie de données | Éléments concernés | Statut Atelier Cotonou | Régime juridique APDP |
| :--- | :--- | :--- | :--- |
| **Marquage Recto** | Logo officiel vectoriel ASUKA CARD | **Transmis à l'imprimeur** | Propriété exclusive AS WORLD TECH. |
| **Personnalisation Verso** | Prénom, Nom, Titre / Fonction, Entreprise, Symbole NFC, QR Code 2D, ID Carte | **Transmis à l'imprimeur** | DCP professionnelle publique strictement cantonnée au tirage du lot commandé. |
| **Encodage Puce NFC** | URL dynamique chiffrée HTTPS (`https://asukacard.com/[slug]`) | **Transmis à l'imprimeur** | Donnée technique de routage web. |
| **Coordonnées Directes Privées & Professionnelles** | Téléphones directs, WhatsApp, adresses emails, adresses postales et domiciles | **NON Transmis (Exclu)** | **100 % hébergées sur le Cloud AS WORLD TECH.** Jamais communiquées à l'imprimeur. |
| **Données Sociales, Bio & Paramètres** | Profils LinkedIn, X, Insta, YouTube, TikTok, Biographie, Droits de visibilité (`fieldVisibility`) | **NON Transmis (Exclu)** | Accessibles uniquement lors du scan de la carte selon les autorisations fixées par le titulaire. |

> **Garantie juridique majeure pour l'assistante :** L'atelier d'impression ne dispose à aucun moment du carnet d'adresses, des emails personnels ou des numéros de téléphone des clients d'AS WORLD TECH. Même en cas d'intrusion physique ou informatique dans l'imprimerie, aucune coordonnée téléphonique ou email ne peut être compromise.

---

## 4. TABLE DE PRODUCTION TRANSMISE À L'IMPRIMEUR (DONNÉES RÉELLES)

Pour chaque lot de cartes commandé, AS WORLD TECH met à disposition de l'imprimeur un fichier tabulaire structuré (format `.xlsx` ou `.csv`) strictement restreint aux colonnes de fabrication.

### Tableau 3 : Table de production basée sur les données réellement existantes

| ID_CARTE | RECTO | VERSO (Identité & Titre) | VERSO (Éléments) | URL_NFC (Puce NDEF) | RÉF_QR_CODE | PUCE REC. |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `crd_rk8m4x29` | Logo ASUKA CARD | **Richard ODJRADO**<br>CEO chez AS WORLD TECH | QR Code + Symbole NFC | `https://asukacard.com/rk8m4x29` | `qr-richard-odjrado.svg` | NTAG213 / 215 / 216 |
| `crd_ga9m3x7w` | Logo ASUKA CARD | **Georges ALÉ**<br>Ministre (Cadre de Vie & Transports) | QR Code + Symbole NFC | `https://asukacard.com/ga9m3x7w` | `qr-georges-ale.svg` | NTAG213 / 215 / 216 |
| `crd_v7p1k3d8` | Logo ASUKA CARD | **Richard ODJRADO**<br>Lead Product Architect (Asuka Card) | QR Code + Symbole NFC | `https://asukacard.com/v7p1k3d8` | `qr-richard-odjrado-orange.svg` | NTAG213 / 215 / 216 |
| `crd_demo_1` | Logo ASUKA CARD | **Jean DUPONT**<br>Directeur de Création (Asuka Studio) | QR Code + Symbole NFC | `https://asukacard.com/jean-dupont` | `qr-jean-dupont.svg` | NTAG213 / 215 / 216 |

### 4.1. Structure normalisée du fichier d'échange (Format CSV d'export d'atelier)
```csv
ID_Carte,Recto_Marquage,Nom_Prenom_Verso,Fonction_Entreprise_Verso,Symbole_NFC,Ref_QR_Code,URL_NFC,Puce_Norme
crd_rk8m4x29,LOGO_ASUKA_CARD,Richard ODJRADO,CEO chez AS WORLD TECH,OUI,qr-richard-odjrado.svg,https://asukacard.com/rk8m4x29,ISO_14443A_NTAG
crd_ga9m3x7w,LOGO_ASUKA_CARD,Georges ALE,Ministre - Cadre de Vie & Transports,OUI,qr-georges-ale.svg,https://asukacard.com/ga9m3x7w,ISO_14443A_NTAG
crd_v7p1k3d8,LOGO_ASUKA_CARD,Richard ODJRADO,Lead Product Architect - Asuka Card,OUI,qr-richard-odjrado-orange.svg,https://asukacard.com/v7p1k3d8,ISO_14443A_NTAG
crd_demo_1,LOGO_ASUKA_CARD,Jean DUPONT,Directeur de Creation - Asuka Studio,OUI,qr-jean-dupont.svg,https://asukacard.com/jean-dupont,ISO_14443A_NTAG
```

### 4.2. Canaux de transmission autorisés & Sécurité des flux
* **Option 1 (Canal officiel recommandé) :** Espace Cloud professionnel sécurisé AS WORLD TECH (Google Workspace / OneDrive Pro avec 2FA) partagé nominativement avec le responsable d'atelier désigné.
* **Option 2 (Canal atelier physique Cotonou) :** Remise directe en main propre sur support USB chiffré remis contre bordereau d'émargement physique.

> **⛔ INTERDICTION FORMELLE DE L'USAGE DE WHATSAPP / TELEGRAM :**  
> Transmission exclusive par Cloud sécurisé AS WORLD TECH ou support USB chiffré remis contre émargement. Interdiction formelle de transférer les listes de collaborateurs ou maquettes par messageries instantanées personnelles.

---

## 5. SPÉCIFICITÉS LOCALES DE COTONOU : CONTRÔLE SUR PLACE, LIVRAISON & REBUTS

* **Droit d'audit physique sur place :** AS WORLD TECH se réserve le droit d'effectuer des visites de contrôle inopinées dans l'atelier de l'imprimeur à Cotonou pour s'assurer des conditions de stockage des cartes vierges et de la destruction des rebuts.
* **Destruction physique impérative des rebuts (Gâches et tests) :** Broyage mécanique obligatoire de toute carte défectueuse. Interdiction absolue de jeter des cartes rebuts intactes dans les poubelles ou de les exposer comme cartes échantillons.
* **Durée de conservation maximale des fichiers (30 jours) :** Conservation des fichiers numériques limitée à **30 jours calendaires** après la livraison. À J+30, purge définitive et certifiée de tous les fichiers informatiques.

---

## 6. CLAUSES CONTRACTUELLES TYPES (POUR L'ASSISTANTE JURIDIQUE)

### Clause 1 : Définition des Informations Confidentielles et Données Transmises
> *"Sont considérées comme Informations Confidentielles toutes les données à caractère personnel imprimées au verso des cartes (noms, prénoms, fonctions, entreprises), les fichiers tabulaires de production, les URL dynamiques associées au domaine asukacard.com, les fichiers de QR codes, ainsi que le logo officiel et les maquettes graphiques de la marque Asuka Card transmis par AS WORLD TECH au Prestataire pour l'exécution des travaux dans son atelier de Cotonou."*

### Clause 2 : Respect de la réglementation APDP et du Code du Numérique
> *"Le Prestataire reconnaît expressément être soumis aux dispositions du Livre V de la Loi n° 2017-20 portant Code du Numérique en République du Bénin et aux directives de l'APDP. Le Prestataire traite les données confiées uniquement sur instruction écrite d'AS WORLD TECH, à l'exclusion de toute réutilisation, cession, commercialisation ou exploitation pour son propre compte."*

### Clause 3 : Agencement des supports et interdiction des messageries grand public
> *"Le Prestataire s'engage à respecter scrupuleusement l'agencement validé par AS WORLD TECH : Face Recto réservée exclusivement au logo officiel ASUKA CARD ; Face Verso regroupant le QR code, le nom, prénom, la fonction et le symbole sans contact NFC. La transmission des fichiers de fabrication s'effectue exclusivement par canal Cloud professionnel sécurisé ou par support physique sécurisé remis contre émargement, à l'exclusion formelle de messageries instantanées grand public (notamment WhatsApp, Telegram)."*

### Clause 4 : Sécurité de la puce NFC et verrouillage d'écriture (Write-Lock)
> *"Le Prestataire garantit l'utilisation d'une puce sans contact 13.56 MHz conforme à la norme ISO/IEC 14443 Type A (modèle NXP NTAG 215, mémoire utile 504 octets). Le Prestataire active obligatoirement le verrouillage définitif en écriture (Write-Lock / Lock bits) de la puce immédiatement après l'encodage de l'URL fournie par AS WORLD TECH, de manière à empêcher toute altération, écrasement ou réécriture non autorisée sur le support."*

### Clause 5 : Destruction certifiée des rebuts et purge des fichiers
> *"Le Prestataire s'interdit formellement de conserver ou d'exposer toute carte défectueuse ou exemplaire de test. Tout rebut de fabrication comportant des mentions nominatives ou une puce encodée doit être immédiatement et physiquement détruit par broyage. Les fichiers informatiques seront définitivement effacés dans un délai maximal de trente (30) jours suivant la livraison."*

### Clause 6 : Droit applicable et attribution de juridiction
> *"Le présent accord est régi par le droit béninois, notamment le Code du Numérique. En cas de différend relatif à la validité, l'interprétation ou l'exécution du présent accord qui ne pourrait être résolu à l'amiable, compétence expresse est attribuée au Tribunal de Commerce de Cotonou, sans préjudice des compétences et pouvoirs de sanction dévolus à l'APDP."*
