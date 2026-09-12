const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const heroSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    ref: 'Player',
    required: true
  },
  classe: {
    type: String,
    enum: ['Guerrier', 'Mage', 'Archer', 'Pretre', 'Paladin'],
    required: true
  },
  niveau: {
    type: Number,
    default: 1,
    min: 1,
    max: 50
  },
  experience: {
    type: Number,
    default: 0
  },
  ecole_magie: {
    type: String,
    enum: ['Lune', 'Feu', 'Nature', 'Ether', 'Ombre'],
    default: 'Lune'
  },
  statistiques: {
    force: { type: Number, default: 10 },
    intelligence: { type: Number, default: 10 },
    sagesse: { type: Number, default: 10 },
    vitesse: { type: Number, default: 10 },
    endurance: { type: Number, default: 10 }
  },
  competences: [String],
  equipement: {
    arme: String,
    armure: String,
    accessoire: String
  },
  sante: {
    type: Number,
    default: 100
  },
  mana: {
    type: Number,
    default: 50
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hero', heroSchema);