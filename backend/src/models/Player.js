const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const playerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 50
  },
  experience: {
    type: Number,
    default: 0
  },
  kingdom: {
    type: String,
    enum: ['Lunaria', 'Solstice', 'Sylvaine', 'Etheree', 'Ombre'],
    default: 'Lunaria'
  },
  magicSchool: {
    type: String,
    enum: ['Lune', 'Feu', 'Nature', 'Ether', 'Ombre'],
    default: 'Lune'
  },
  statistics: {
    force: { type: Number, default: 10 },
    intelligence: { type: Number, default: 10 },
    sagesse: { type: Number, default: 10 },
    vitesse: { type: Number, default: 10 },
    endurance: { type: Number, default: 10 }
  },
  resources: {
    or: { type: Number, default: 100 },
    nourriture: { type: Number, default: 50 },
    bois: { type: Number, default: 50 },
    pierre: { type: Number, default: 50 },
    cristal: { type: Number, default: 10 },
    essenceAme: { type: Number, default: 0 }
  },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  empire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empire'
  },
  guild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guild',
    default: null
  },
  heroes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hero'
  }],
  spells: [{
    type: String
  }],
  equipment: {
    weapon: String,
    armor: String,
    accessory: String
  },
  bonheur: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  lastLogin: {
    type: Date,
    default: Date.now
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

module.exports = mongoose.model('Player', playerSchema);