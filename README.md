# Application Interne Commune - Madagascar

Application administrative pour la gestion des documents officiels dans les communes de Madagascar.

## 📋 Fonctionnalités

### 1️⃣ Tableau de bord
- Vue d'ensemble des statistiques
- Accès rapide à tous les modules
- Indicateurs de performance

### 2️⃣ Gestion des actes de naissance
- Création de nouvelles demandes
- Recherche et filtrage par nom, parents, numéro
- Approbation/rejet des demandes
- Ajout à la file d'impression

### 3️⃣ Vérification CIN
- Validation des demandes de carte d'identité nationale
- Prévisualisation des documents
- Notes de vérification
- Workflow d'approbation

### 4️⃣ Certificats de résidence
- Création de certificats de résidence
- Gestion des motifs de demande
- Validation et impression

### 5️⃣ File d'impression
- Gestion des documents en attente d'impression
- Marquage des urgences
- Suivi du statut d'impression

### 6️⃣ Gestion des employés
- Création de comptes employés
- Attribution des rôles (Maire, Secrétaire, Agent d'état civil, Archiviste)
- Suivi des activités

### 7️⃣ Historique administratif
- Journal d'audit de toutes les actions
- Traçabilité complète
- Horodatage et identification des utilisateurs

## 🔐 Rôles et permissions

- **MAIRE** : Accès complet à tous les modules
- **SECRETAIRE** : Gestion administrative et validation
- **AGENT_ETAT_CIVIL** : Création et traitement des documents
- **ARCHIVISTE** : Consultation et archivage

## 🚀 Comptes de démonstration

| Rôle | Username | Password |
|------|----------|----------|
| Maire | admin | admin123 |
| Secrétaire | secretaire | sec123 |
| Agent | agent | agent123 |
| Archiviste | archive | arch123 |

## 🛠️ Technologies utilisées

- **React** : Interface utilisateur
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styles
- **Radix UI** : Composants accessibles
- **Lucide React** : Icônes

## 📦 Mode actuel : Données mockées

L'application fonctionne actuellement avec des **données simulées** stockées en mémoire. 

Pour une utilisation en production avec persistance des données, connectez Supabase pour :
- Authentification sécurisée
- Stockage des documents
- Base de données citoyens
- Traçabilité persistante
- Synchronisation multi-utilisateurs

## ⚠️ Note de sécurité

Cette application est une démonstration. Pour un déploiement en production :
- Implémenter l'authentification sécurisée
- Chiffrer les données sensibles
- Respecter les réglementations RGPD/protection des données
- Mettre en place des sauvegardes régulières
- Configurer les contrôles d'accès stricts

## 🎯 Prochaines étapes

- Connexion à une base de données (Supabase)
- Génération de PDF avec QR codes
- Système de notifications par email/SMS
- Workflow de validation multi-niveaux
- Module d'archivage numérique
- Scan et stockage de documents
