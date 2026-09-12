# 🌟 Aethermoor - MMO RPG de Gestion Magique

Bienvenue dans **Aethermoor**, un MMO RPG de vue de haut combinant gestion complexe, diplomatie, magie et stratégie dans un monde magique riche et dynamique.

## 📖 L'Histoire du Monde

### Le Lore d'Aethermoor

Il y a mille ans, le Grand Cataclysme a déchiré les voiles entre les dimensions, créant des zones d'instabilité magique à travers le monde. De ces ruptures sont nés les **Cristaux Primordiaux** - des sources infinies de pouvoir magique.

Aujourd'hui, plusieurs royaumes se battent pour le contrôle de ces cristaux :

- **🔵 Royaume de Lunaria** - Maîtres de la magie de lune et des technologies arcanes
- **🔴 Empire du Solstice** - Guerriers du feu dominants, conquistadors impériaux
- **🟢 Confédération Sylvaine** - Druides et bêtes magiques, gardiens de la nature
- **🟣 Ordre Éthéré** - Mages neutres régulant l'équilibre magique
- **⚫ Culte de l'Ombre** - Forces chaotiques cherchant à dominer tous les royaumes

Les joueurs bâtissent leurs propres empires, gèrent des ressources, recrutent des armées, nouent des alliances et défient l'équilibre du pouvoir.

## 🎮 Caractéristiques Principales

### 1. **Gestion d'Empire Complexe**
- Construire et gérer des châteaux, tours et structures magiques
- Gérer l'économie : ressources, commerce, impôts
- Développer des technologies et sorts
- Recruter et entraîner des unités militaires

### 2. **Système de Magie Profond**
- 5 écoles de magie : Lune, Feu, Nature, Éther, Ombre
- Créer des synergies magiques pour des pouvoirs uniques
- Grimoires à débloquer avec des sorts puissants
- Enchantements d'objets et de territoires

### 3. **Diplomatie & Politique**
- Négocier des traités, alliances et mariages royaux
- Espionnage et contre-espionnage
- Intrigues de cour et coups d'état
- Élections de chefs de guildes

### 4. **Stratégie Militaire**
- Combats en temps réel ou au tour par tour
- Terrain affectant les stratégies magiques
- Sièges de châteaux et batailles épiques
- Héros avec compétences et évolutions

### 5. **Guildes & Coopération**
- Créer ou rejoindre des guildes
- Guerres de guildes pour le territoire
- Quêtes de guilde collaboratives
- Maisons de commerce interguilde

### 6. **Monde Dynamique**
- Événements mondiaux changeant le lore
- Catastrophes magiques aléatoires
- Créatures mythiques à domestiquer
- Donjons et explorations procedurales

## 🏗️ Structure du Projet

```
MagicMmoRpg/
├── docs/
│   ├── LORE.md                 # Lore complet du monde
│   ├── GAMEPLAY_MECHANICS.md   # Mécaniques de jeu
│   └── API.md                  # Documentation API
├── backend/
│   ├── src/
│   │   ├── server.js           # Serveur principal
│   │   ├── database/           # Couche données
│   │   ├── api/                # Routes API
│   │   ├── game-logic/         # Logique métier
│   │   └── auth/               # Authentification
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/         # Composants React
│   │   ├── scenes/             # Scènes du jeu
│   │   ├── utils/              # Utilitaires
│   │   └── App.jsx
│   └── package.json
├── database/
│   ├── schemas/                # Schémas DB
│   └── migrations/             # Migrations
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

## 🎯 Roadmap de Développement

### Phase 1 : Fondations (Semaines 1-4)
- [ ] Architecture serveur avec WebSocket
- [ ] Authentification joueur
- [ ] Système de base de données
- [ ] Création de personnage
- [ ] Carte du monde interactive

### Phase 2 : Gestion d'Empire (Semaines 5-8)
- [ ] Système de bâtiments
- [ ] Ressources et économie
- [ ] Queue de production
- [ ] Arbre de technologies

### Phase 3 : Magie & Combat (Semaines 9-12)
- [ ] Système de sorts
- [ ] Combats en temps réel
- [ ] Unités militaires
- [ ] Intelligence artificielle ennemis

### Phase 4 : Contenu Avancé (Semaines 13-16)
- [ ] Guildes et diplomatie
- [ ] Événements mondiaux
- [ ] Donjons et explorations
- [ ] Compétitions et classements

### Phase 5 : Polish & Launch (Semaines 17-20)
- [ ] Optimisations performance
- [ ] Design UI/UX
- [ ] Tests complets
- [ ] Lancement alpha/beta

## 🛠️ Stack Technologique

### Backend
- **Node.js + Express** - Serveur
- **WebSocket (Socket.io)** - Communication temps réel
- **MongoDB/PostgreSQL** - Base de données
- **Redis** - Cache et sessions

### Frontend
- **React** - Interface utilisateur
- **Phaser/Babylon.js** - Rendu 2D/3D
- **WebGL** - Graphiques
- **Redux** - Gestion d'état

### DevOps
- **Docker** - Containerisation
- **GitHub Actions** - CI/CD
- **AWS/Digital Ocean** - Hosting

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- MongoDB ou PostgreSQL
- Redis (optionnel)

### Installation

```bash
# Cloner le repo
git clone https://github.com/AtomicX7210/MagicMmoRpg.git
cd MagicMmoRpg

# Installer backend
cd backend
npm install
npm run dev

# Installer frontend (dans un autre terminal)
cd frontend
npm install
npm start
```

Le jeu sera accessible sur `http://localhost:3000`

## 📚 Documentation

- [📖 Lore Complet](./docs/LORE.md)
- [🎮 Mécaniques de Jeu](./docs/GAMEPLAY_MECHANICS.md)
- [🔌 API Documentation](./docs/API.md)
- [🏗️ Architecture](./docs/ARCHITECTURE.md)

## 🤝 Contribuer

Les contributions sont bienvenues ! Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) pour les directives.

## 📝 License

Ce projet est sous license MIT - voir [LICENSE](./LICENSE) pour détails.

---

**Bienvenue dans Aethermoor, Sorcier ! 🌟**
