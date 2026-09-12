const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aethermoor')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Aethermoor Server is running' });
});

app.get('/api/version', (req, res) => {
  res.json({ version: '0.1.0', name: 'Aethermoor MMO RPG' });
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`🎮 New player connected: ${socket.id}`);

  socket.on('playerJoin', (playerData) => {
    console.log(`👤 Player joined:`, playerData);
    socket.broadcast.emit('playerJoined', playerData);
  });

  socket.on('playerMove', (position) => {
    socket.broadcast.emit('playerMoved', {
      playerId: socket.id,
      position: position
    });
  });

  socket.on('buildingConstruction', (buildingData) => {
    console.log(`🏗️ Building construction started:`, buildingData);
    io.emit('buildingStarted', buildingData);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Player disconnected: ${socket.id}`);
    io.emit('playerLeft', { playerId: socket.id });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🌟 Aethermoor Server Running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 WebSocket connected\n`);
});

module.exports = { app, server, io };