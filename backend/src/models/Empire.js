const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const empireSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: String,
    ref: 'Player',
    required: true
  },
  kingdom: {
    type: String,
    enum: ['Lunaria', 'Solstice', 'Sylvaine', 'Etheree', 'Ombre'],
    required: true
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 100
  },
  population: {
    type: Number,
    default: 10
  },
  buildings: [{
    type: {
      type: String,
      enum: ['Donjon', 'Ferme', 'MineOr', 'Scierie', 'Carriere', 'TourMage', 'Caserne', 'Auberge', 'Bibliotheque', 'Muraille']
    },
    level: { type: Number, default: 1 },
    completionTime: Date,
    isConstructing: { type: Boolean, default: false }
  }],
  resources: {
    or: { type: Number, default: 500 },
    nourriture: { type: Number, default: 200 },
    bois: { type: Number, default: 200 },
    pierre: { type: Number, default: 200 },
    cristal: { type: Number, default: 50 },
    essenceAme: { type: Number, default: 0 }
  },
  army: {
    soldats: { type: Number, default: 0 },
    archers: { type: Number, default: 0 },
    chevaliers: { type: Number, default: 0 },
    magesBataille: { type: Number, default: 0 },
    pretresLune: { type: Number, default: 0 },
    catapultes: { type: Number, default: 0 }
  },
  diplomacy: {
    allies: [String],
    enemies: [String],
    treaties: [{
      empireName: String,
      type: String,
      expiresAt: Date
    }]
  },
  technologies: [String],
  spells: [String],
  bonheur: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Empire', empireSchema);