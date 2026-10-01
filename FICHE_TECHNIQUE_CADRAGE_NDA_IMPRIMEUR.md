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

## 2. QU'EST-CE QU'IL Y A SUR LA CARTE ? (INVENTAIRE DU SUPPORT PHYSIQUE & NUMÉRIQUE)

Chaque carte physique Asuka Card est un objet connecté articulé autour de 3 niveaux d'informations :

### 2.1. Face Recto (Impression & Finition visible)
* **Éléments graphiques & Identité visuelle** :
  * Logo vectoriel haute définition du client d'AS WORLD TECH.
  * Charte graphique, texture de fond (ex: Noir mat, micro-points tactiles, titane/métal).
  * Pictogramme universel sans contact (symbole Contactless / NFC).
* **Données nominatives imprimées** :
  * Prénom et Nom du titulaire.
  * Fonction / Poste professionnel.
  * Nom de l'entreprise / Institution cliente.
  * *(Optionnel selon commande)* : Photo d'identité (format badge).

### 2.2. Face Verso (Impression & Gravure laser visible)
* **QR Code individualisé unique** :
  * Matrice carrée imprimée en haute définition ou gravée au laser.
  * **Contenu encodé dans le QR Code** : Strictement l'URL dynamique chiffrée HTTPS menant au profil (ex. : `https://asukacard.com/[slug]`).
* **Identifiants techniques & Mentions d'agrément** :
  * Numéro de série unique / Serial ID gravé (traçabilité de fabrication et contrôle qualité).
  * Logo discret Asuka Card et mentions de conformité.
* **⚠️ RÈGLE DE SÉCURITÉ CRUCIALE POUR L'ASSISTANTE JURIDIQUE** :
  * **Aucune donnée de contact directe ou intime (numéro de téléphone mobile, email personnel, WhatsApp, réseaux sociaux, adresse de domicile) n'est imprimée en clair sur la carte physique**.
  * Ces données sensibles restent cantonnées sur les serveurs sécurisés d'AS WORLD TECH et ne sont révélées qu'au moment du scan (selon les autorisations de visibilité paramétrées par le titulaire).

### 2.3. Puce Électronique NFC Intégrée (Couche logique invisible)
* **Composant matériel** :
  * Puce RFID haute fréquence 13.56 MHz (norme ISO/IEC 14443 Type A, standard NXP NTAG213 / NTAG215 / NTAG216).
  * Antenne intégrée dans l'épaisseur de la carte.
* **Données écrites dans la puce** :
  * Enregistrement standard NDEF de type URI.
  * Contenu : **Strictement l'URL dynamique HTTPS** du profil (ex. : `https://asukacard.com/[slug]`).
* **Sécurité & Verrouillage en écriture (Write-Lock)** :
  * **Obligation impérative pour l'imprimeur** : Activer les bits de verrouillage d'écriture (*Lock bits / Password protection*) dès la fin de l'encodage, interdisant à quiconque de réécrire ou de pirater la carte sur le terrain.

---

## 3. TYPOLOGIE DES DONNÉES PARTAGÉES AVEC L'IMPRIMEUR DE COTONOU

| Catégorie de données | Éléments transmis | Sensibilité | Base légale APDP (Code du Numérique) |
| :--- | :--- | :--- | :--- |
| **Données à Caractère Personnel (DCP)** | Noms, Prénoms, Postes, Entreprise, adresses emails professionnelles, éventuelle photo. | **DCP directe** (Art. 380 et s.) | Soumises aux obligations de sécurité et de confidentialité de l'APDP. |
| **Secrets d'Affaires & Créations Graphiques** | Fichiers sources vectoriels (AI, EPS, SVG), logos d'institutions et de grandes entreprises béninoises/internationales clientes d'AS WORLD TECH. | **Propriété Intellectuelle & Secret d'Affaires** | Droit des marques, protection contre la contrefaçon et le plagiat. |
| **Données Techniques & Liens Web** | Table de correspondance (Mapping Table) : `ID_Carte` $\leftrightarrow$ `Nom/Prénom` $\leftrightarrow$ `URL slug` $\leftrightarrow$ `UID puce NFC`. | **Données Techniques Sensibles** | Protection contre le détournement d'identité et la cybercriminalité. |

---

## 4. COMMENT PARTAGE-T-ON LES DONNÉES ? (PROTOCOLE D'ÉCHANGE SÉCURISÉ)

Bien que l'imprimeur soit à Cotonou, les données doivent circuler de façon hermétique :

### 4.1. Canaux de transmission autorisés
* **Interdiction absolue** : Envoi de listes de collaborateurs ou de fichiers de production via WhatsApp standard ou emails personnels non chiffrés.
* **Méthodes prescrites** :
  1. **Espace Cloud sécurisé ou lien de téléchargement chiffré** : Espace réservé avec mot de passe et restriction d'accès.
  2. **Support physique sécurisé (option locale Cotonou)** : Remise en main propre contre décharge d'un support chiffré (clé USB sécurisée ou remise directe sur poste d'atelier dédié) si nécessaire.
  3. **Fichier tabulaire chiffré** : Fichier CSV/XLSX verrouillé par mot de passe robuste transmis par canal séparé.

### 4.2. Structure du fichier d'échange (Table de production)
Le fichier transmis à l'imprimeur se limite aux colonnes strictement nécessaires :
```csv
ID_Carte,Nom,Prenom,Fonction,Entreprise,URL_NFC,Ref_Logo,Ref_QR_Code
CRD_001,Koudjo,Marc,Directeur Général,Société Client,https://asukacard.com/marc-koudjo,logo_client.eps,qr_crd_001.svg
```

### 4.3. Restriction d'accès dans l'atelier de Cotonou
* Seuls les opérateurs habilités affectés à la PAO et aux machines d'impression/encodage ont le droit d'ouvrir les fichiers.
* Interdiction de copier les fichiers clients sur des ordinateurs personnels ou des supports non contrôlés.

---

## 5. SPÉCIFICITÉS LOCALES DE COTONOU : CONTRÔLE SUR PLACE, LIVRAISON & REBUTS

L'implantation locale de l'imprimeur à Cotonou offre des leviers de contrôle directs que l'assistante juridique doit verrouiller :

### 5.1. Droit d'audit physique et de visite de l'atelier
* **Clause d'inspection sur place** : AS WORLD TECH se réserve le droit d'effectuer des visites de contrôle inopinées dans l'atelier de l'imprimeur à Cotonou pour s'assurer des conditions de stockage des cartes vierges, de la sécurité des postes informatiques et de la bonne exécution des protocoles de destruction.

### 5.2. Gestion et destruction physique impérative des rebuts (Gâches et tests)
* **Risque local majeur** : Lors des réglages machines et calages couleurs, des cartes imprimées avec de vraies identités (cadres d'entreprises ou personnalités béninoises) peuvent comporter des défauts.
* **Obligation contractuelle stricte** :
  * Interdiction absolue de jeter des cartes rebuts intactes dans les poubelles de l'atelier à Cotonou.
  * **Obligation de broyage mécanique / destruction physique** (déchiquetage ou perforation de la puce et de la surface imprimée).
  * **Interdiction totale de conserver ou d'exposer** les cartes des clients d'AS WORLD TECH comme cartes de démonstration sur le comptoir de l'imprimerie ou lors de salons sans accord écrit.

### 5.3. Protocole de remise des cartes finies à Cotonou
* Les cartes achevées et contrôlées doivent être conditionnées sous emballage scellé et opaque.
* La remise s'effectue contre signature conjointe d'un **Bordereau de livraison / Décharge** mentionnant le nombre exact de cartes produites et le numéro de lot.

### 5.4. Durée de conservation maximale des fichiers (30 jours)
* Conservation des fichiers numériques limitée à **30 jours calendaires** après la livraison (pour le traitement d'éventuels retirages SAV).
* À J+30 : purge définitive de tous les fichiers clients sur les ordinateurs et serveurs de l'imprimerie.

---

## 6. CLAUSES CONTRACTUELLES TYPES (POUR L'ASSISTANTE JURIDIQUE)

Ces clauses sont rédigées selon le droit béninois et le Code du Numérique :

### Clause 1 : Définition des Informations Confidentielles
> *"Sont considérées comme Informations Confidentielles toutes les données à caractère personnel (noms, prénoms, titres, photographies), les fichiers de mapping, les URL associées au domaine asukacard.com, les identifiants de puces NFC, ainsi que les logos, éléments graphiques et maquettes confiés par AS WORLD TECH au Prestataire pour l'exécution des travaux d'impression à Cotonou."*

### Clause 2 : Respect de la réglementation APDP et du Code du Numérique
> *"Le Prestataire reconnaît expressément être soumis aux dispositions du Livre V de la Loi n° 2017-20 portant Code du Numérique en République du Bénin et aux directives de l'Autorité de Protection des Données Personnelles (APDP). Le Prestataire garantit qu'il traite les données confiées uniquement sur instruction écrite d'AS WORLD TECH, à l'exclusion de toute réutilisation, cession, commercialisation ou exploitation pour son propre compte."*

### Clause 3 : Sécurité des ateliers et droit d'audit
> *"Le Prestataire s'engage à maintenir dans ses ateliers de Cotonou des mesures de sécurité physiques et logiques suffisantes pour empêcher toute divulgation, altération ou soustraction des supports et fichiers. AS WORLD TECH ou son représentant dûment mandaté pourra procéder à tout moment, aux heures ouvrables, à un contrôle sur place du respect de ces engagements."*

### Clause 4 : Destruction certifiée des rebus et purge des fichiers
> *"Le Prestataire s'interdit formellement de conserver ou d'exposer toute carte défectueuse ou exemplaire de test. Tout rebut de fabrication comportant des données nominatives ou une puce encodée doit être immédiatement et physiquement détruit par broyage. Les fichiers informatiques seront définitivement effacés dans un délai maximal de trente (30) jours suivant la livraison."*

### Clause 5 : Droit applicable et attribution de juridiction
> *"Le présent accord est régi par le droit béninois, notamment le Code du Numérique. En cas de différend relatif à la validité, l'interprétation ou l'exécution du présent accord qui ne pourrait être résolu à l'amiable, compétence expresse est attribuée au Tribunal de Commerce de Cotonou, sans préjudice des compétences et pouvoirs de sanction dévolus à l'APDP."*
