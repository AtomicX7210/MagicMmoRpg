# 🎮 Mécaniques de Jeu Détaillées

## 1. Gestion d'Empire

### Construction de Bâtiments

Chaque bâtiment prend du temps à construire et consomme des ressources.

```
Temps de construction = (Coût de Base × Niveau) / (Vitesse de Construction de l'Empereur)
```

#### Types de Bâtiments

| Bâtiment | Coût | Temps | Effet |
|----------|------|-------|-------|
| **Donjon** | 100 Or, 50 Pierre | 1h | Base de puissance, +10 Pop |
| **Ferme** | 50 Or, 30 Bois | 30min | Produit Nourriture +5/min |
| **Mine d'Or** | 75 Or, 40 Pierre | 45min | Produit Or +3/min |
| **Scierie** | 50 Or, 25 Bois | 30min | Produit Bois +4/min |
| **Carrière** | 60 Or, 35 Pierre | 40min | Produit Pierre +3/min |
| **Tour de Mage** | 200 Or, 100 Pierre, 50 Cristal | 2h | Recherche Magie +20% |
| **Caserne** | 150 Or, 80 Pierre | 1.5h | Entraîne Soldats |
| **Auberge** | 100 Or, 50 Bois | 1h | Attire Héros |
| **Bibliothèque** | 120 Or, 60 Bois | 1h30 | Recherche Tech +25% |
| **Muraille** | 80 Or, 100 Pierre | 2h | Défense +50% |

### Ressources

#### Types de Ressources

1. **Or** - Monnaie principale, commerce
2. **Nourriture** - Soutient la population
3. **Bois** - Construction et artisanat
4. **Pierre** - Fortifications et infrastructure
5. **Cristal Magique** - Composant de sorts
6. **Essence d'Âme** - Ressource rare pour rituels

#### Production de Ressources

```
Production/minute = (Bâtiment Base × Bonus Technologie × Bonus Héros) - Consommation
```

Consommation = Population × 0.1 (Nourriture/min par habitant)

### Population & Bonheur

- Chaque bâtiment civil ajoute +10 habitants
- La population génère 10 Or par minute et consomme 1 Nourriture par minute
- **Bonheur:**
  - Faible bonheur (-30%) → rébellion possible
  - Bonheur normal → production standard
  - Haut bonheur (+20%) → production augmentée

Facteurs affectant le bonheur:
- Nourriture disponible
- Impôts payés
- Événements mondiaux
- Présence de Héros populaires

---

## 2. Système de Magie

### Apprentissage de Sorts

Les mages apprennent les sorts selon leur École de Magie:

```
Temps d'Apprentissage = (Niveau Sort × 100) / (Intelligence du Mage + Bonus Tour de Mage)
```

### Créer des Synergies Magiques

Les sorts peuvent se combiner pour créer des effets puissants:

#### Combinaisons Connues

| Sort 1 | Sort 2 | Résultat | Puissance |
|--------|--------|----------|-----------|
| Boule de Feu | Brasier Éternel | Tempête de Feu | 150% |
| Illumination | Dispel | Purification | 120% |
| Croissance Végétale | Communion Bêtiale | Armée de la Nature | 140% |
| Vol de Vie | Malédiction | Drain d'Essence | 130% |
| Lien Éthéré | Stabilisation | Barrière Cosmique | 110% |

### Grimoires & Compétences

Chaque mage possède un grimoire avec jusqu'à 5 sorts actifs:

```json
{
  "grimoire": {
    "sorts": [
      {
        "nom": "Boule de Feu",
        "école": "Feu",
        "niveau": 3,
        "dégâts": 45,
        "coût_mana": 30,
        "cooldown": 5,
        "portée": 15
      }
    ],
    "mana_max": 100,
    "mana_regen": 5
  }
}
```

---

## 3. Système Militaire

### Entraînement d'Unités

```
Temps d'entraînement = (Niveau Unité × 30) / (Bonus Caserne)
```

#### Types d'Unités

| Unité | Coût | Santé | Attaque | Défense | Spécial |
|-------|------|-------|---------|---------|---------|
| **Soldat** | 10 Or | 30 | 5 | 2 | - |
| **Archer** | 15 Or | 20 | 8 | 1 | Attaque à Distance |
| **Chevalier** | 30 Or | 50 | 10 | 8 | Charge +50% Dégâts |
| **Mage de Bataille** | 40 Or | 25 | 12 | 3 | Lance Sorts |
| **Prêtre de Lune** | 35 Or | 30 | 4 | 5 | Soigne +10 PV/tour |
| **Catapulte** | 80 Or, 50 Pierre | 40 | 25 | 2 | Attaque Zone |

### Combats

#### Mode Temps Réel
- Joueurs et IA commandent les unités en direct
- Terrain affecte les stratégies
- Morale des troupes affecte la puissance

#### Mode Tactique (Tour par Tour)
- Chaque unité a un tour
- Initiative basée sur Vitesse
- Les sorts sont lancés chaque tour

#### Formule de Dégâts

```
Dégâts Finaux = (Attaque - Défense) × Bonus École Magique × Moral des Troupes
```

### Sièges de Château

Caractéristiques:
- Les Murailles réduisent les dégâts entrants de -50%
- Les Tours de Mage défendent automatiquement (+30% Magie)
- Durée: Les sièges prennent 3-24 heures
- Renforts: D'autres royaumes peuvent venir à l'aide

---

## 4. Diplomatie & Politique

### Traités

#### Types de Traités

1. **Paix** - Arrête temporairement l'hostilité (24-168h)
2. **Alliance** - Partagez les ressources et défenses (-20% coût !)
3. **Mariage Royal** - Fusion d'empires (+30% production conjointe)
4. **Commerce** - Échangez des ressources à taux préférentiel
5. **Vassalité** - Dominance d'une faction sur une autre

### Espionnage

Les agents espions peuvent:
- Voler des ressources (+5-15%)
- Sabotage de bâtiments (réduction 50% production)
- Assassiner un Héros (risqué, peut être découvert)
- Voler des plans technologiques

Coût: 50 Or + 10 Cristal par mission
Chances de succès: 60-90% selon Intelligence

---

## 5. Système de Héros

### Création d'un Héros

Chaque empire peut recruter des Héros avec des compétences uniques:

```json
{
  "héros": {
    "nom": "Theron le Valeureux",
    "niveau": 5,
    "expérience": 1200,
    "classe": "Guerrier",
    "école_magie": "Feu",
    "statistiques": {
      "force": 18,
      "intelligence": 10,
      "sagesse": 12,
      "vitesse": 14,
      "endurance": 16
    },
    "compétences": ["Charge Héroïque", "Boule de Feu", "Cri de Guerre"],
    "équipement": {
      "arme": "Épée Flamboyante",
      "armure": "Armure Écarlate",
      "accessoire": "Anneau de Pouvoir"
    }
  }
}
```

### Progression des Héros

- **Expérience:** Gagnée en combats
- **Niveaux:** Jusqu'à niveau 50
- **Talents:** Déblocqués tous les 5 niveaux
- **Équipement:** Améliorable avec ressources

---

## 6. Guildes & Coopération

### Création de Guilde

- **Nom & Emblème:** Personnalisable
- **Chef de Guilde:** Leadership
- **Membres:** Jusqu'à 100
- **Coffre Partagé:** 20 emplacements

### Activités de Guilde

1. **Quêtes de Guilde** - Missions collaboratives
2. **Guerres de Guilde** - Combats pour le territoire
3. **Maisons de Commerce** - Échanges collectifs
4. **Donjons de Guilde** - Contenu exclusif

### Classement de Guilde

```
Points de Guilde = (Quêtes Complétées × 10) + (Victoires en Guerre × 50) + (Trésor Accumulé / 100)
```

---

## 7. Exploration & Donjons

### Donjons Proceduraux

- **Niveaux:** 1-10 (difficulté croissante)
- **Monstres:** Générés aléatoirement
- **Récompenses:** Or, Expérience, Équipement rare
- **Durée:** 15-60 minutes par donjon

### Types de Donjons

1. **Donjon de Cristal** - Combat intense
2. **Catacombes de l'Ombre** - Énigmes + Combat
3. **Tours Flottantes** - Plate-forme + Puzzle
4. **Forêt Corrompue** - Combat + Environnement Hostile

---

## 8. Événements Mondiaux

### Cycle des Événements

```
Tous les 7 jours = 1 Événement Majeur
Toutes les 24h = Événements Mineurs
```

### Types d'Événements

| Événement | Fréquence | Effet |
|-----------|-----------|-------|
| Éclipse Magique | Mensuelle | Magie +50% pour 12h |
| Invasion Corrompue | Hebdo | Boss Raid mondial |
| Tournoi de Cristal | Trimestriel | Récompense Cristal |
| Tempête Magique | Aléatoire | Dégâts randomisés |
| Festival de Lune | Mensuelle | Bonheur +50%, Ventes x2 |

---

## 9. Système d'Économie

### Marché Mondial

Les joueurs peuvent acheter/vendre des ressources sur un marché centralisé:

```
Prix = Offre × Demande / Stabilité Mondiale
```

### Impôts

Les empires gagnent de l'Or par la taxe:

```
Revenu Fiscal = Population × Taux d'Impôt × Multiplicateur Bonheur
```

---

## 10. Progression Personnelle

### Arbre de Compétences

Chaque joueur peut débloquer des compétences:

1. **Maîtrise Magique** - +10% Magie
2. **Leadership** - +15% Moral Troupes
3. **Diplomatie** - Traités -20% temps
4. **Ruse** - Espionnage +25% succès
5. **Commerce** - Ressources +15% valeur
6. **Défense** - Murailles +30% puissance

Déblocage: Via Quêtes ou Cristaux Primordiaux

---

**La complexité et la profondeur d'Aethermoor vous attendent !** 🌟
