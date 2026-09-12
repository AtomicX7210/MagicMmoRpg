import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const SOCKET_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [player, setPlayer] = useState(null);
  const [gameState, setGameState] = useState('login'); // login, character-creation, game
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Connexion WebSocket
    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      console.log('✅ Connecté au serveur');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Déconnecté du serveur');
      setIsConnected(false);
    });

    newSocket.on('playerJoined', (playerData) => {
      console.log('👤 Un joueur a rejoint:', playerData);
      setPlayers(prev => [...prev, playerData]);
    });

    newSocket.on('playerMoved', (data) => {
      setPlayers(prev => 
        prev.map(p => p.playerId === data.playerId ? { ...p, position: data.position } : p)
      );
    });

    newSocket.on('playerLeft', (data) => {
      setPlayers(prev => prev.filter(p => p.playerId !== data.playerId));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleLogin = (username, password) => {
    // Simulation de connexion
    const newPlayer = { id: Math.random(), username, level: 1, empire: null };
    setPlayer(newPlayer);
    setGameState('character-creation');
  };

  const handleCharacterCreation = (characterData) => {
    const updatedPlayer = { ...player, ...characterData };
    setPlayer(updatedPlayer);
    socket?.emit('playerJoin', updatedPlayer);
    setGameState('game');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🌟 Aethermoor - MMO RPG</h1>
        <p>Un monde magique de gestion complexe</p>
        <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '🟢 Connecté' : '🔴 Déconnecté'}
        </div>
      </header>

      <main className="main">
        {gameState === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}

        {gameState === 'character-creation' && (
          <CharacterCreationScreen onComplete={handleCharacterCreation} />
        )}

        {gameState === 'game' && player && (
          <GameScreen 
            player={player} 
            socket={socket} 
            players={players}
            onMove={(position) => socket?.emit('playerMove', position)}
          />
        )}
      </main>
    </div>
  );
}

// Écran de Connexion
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <div className="screen login-screen">
      <div className="card">
        <h2>Bienvenue à Aethermoor</h2>
        <p>Connectez-vous pour entrer dans le monde magique</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur:</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom..."
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Se Connecter
          </button>
        </form>

        <div className="demo-section">
          <p>Ou utilisez ce compte de démo:</p>
          <button 
            className="btn btn-secondary"
            onClick={() => onLogin('DemoPlayer', 'demo123')}
          >
            Jouer en Démo
          </button>
        </div>
      </div>
    </div>
  );
}

// Écran de Création de Personnage
function CharacterCreationScreen({ onComplete }) {
  const [characterName, setCharacterName] = useState('');
  const [kingdom, setKingdom] = useState('Lunaria');
  const [magicSchool, setMagicSchool] = useState('Lune');

  const kingdoms = [
    { id: 'Lunaria', name: '🔵 Royaume de Lunaria', color: '#00BFFF' },
    { id: 'Solstice', name: '🔴 Empire du Solstice', color: '#FF4500' },
    { id: 'Sylvaine', name: '🟢 Confédération Sylvaine', color: '#228B22' },
    { id: 'Etheree', name: '🟣 Ordre Éthéré', color: '#9370DB' },
    { id: 'Ombre', name: '⚫ Culte de l\'Ombre', color: '#1C1C1C' }
  ];

  const magicSchools = ['Lune', 'Feu', 'Nature', 'Ether', 'Ombre'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (characterName) {
      onComplete({ 
        characterName, 
        kingdom, 
        magicSchool,
        position: { x: Math.random() * 1000, y: Math.random() * 1000 }
      });
    }
  };

  return (
    <div className="screen character-creation-screen">
      <div className="card">
        <h2>Créez Votre Personnage</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du Personnage:</label>
            <input 
              type="text" 
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Choisissez un nom..."
              required
            />
          </div>

          <div className="form-group">
            <label>Choisir un Royaume:</label>
            <div className="kingdoms-grid">
              {kingdoms.map(k => (
                <div 
                  key={k.id}
                  className={`kingdom-card ${kingdom === k.id ? 'selected' : ''}`}
                  style={{ borderColor: kingdom === k.id ? k.color : '#ccc' }}
                  onClick={() => setKingdom(k.id)}
                >
                  <h3>{k.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>École de Magie:</label>
            <select value={magicSchool} onChange={(e) => setMagicSchool(e.target.value)}>
              {magicSchools.map(school => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Commencer l'Aventure!
          </button>
        </form>
      </div>
    </div>
  );
}

// Écran de Jeu Principal
function GameScreen({ player, socket, players, onMove }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [resources, setResources] = useState({
    or: 500,
    nourriture: 200,
    bois: 200,
    pierre: 200,
    cristal: 50
  });

  const buildings = [
    { name: 'Donjon', icon: '🏰', cost: { or: 100, pierre: 50 } },
    { name: 'Ferme', icon: '🌾', cost: { or: 50, bois: 30 } },
    { name: 'Mine d\'Or', icon: '⛏️', cost: { or: 75, pierre: 40 } },
    { name: 'Tour de Mage', icon: '🔮', cost: { or: 200, cristal: 50 } },
    { name: 'Caserne', icon: '⚔️', cost: { or: 150, pierre: 80 } }
  ];

  const handleBuildBuilding = (building) => {
    setSelectedBuilding(building);
    socket?.emit('buildingConstruction', { 
      playerName: player.username,
      building: building.name,
      position: player.position
    });
    
    // Simuler la déduction des ressources
    setResources(prev => ({
      ...prev,
      or: prev.or - building.cost.or
    }));

    alert(`🏗️ Construction de ${building.name} démarrée!`);
    setSelectedBuilding(null);
  };

  return (
    <div className="screen game-screen">
      <div className="game-container">
        {/* Sidebar - Informations du Joueur */}
        <div className="sidebar">
          <div className="player-info">
            <h2>👤 {player.username}</h2>
            <p><strong>Niveau:</strong> {player.level}</p>
            <p><strong>Royaume:</strong> {player.kingdom}</p>
            <p><strong>École Magique:</strong> {player.magicSchool}</p>
          </div>

          <div className="resources">
            <h3>💰 Ressources</h3>
            <div className="resource-item">
              <span>Or:</span>
              <span className="amount">{Math.floor(resources.or)}</span>
            </div>
            <div className="resource-item">
              <span>Nourriture:</span>
              <span className="amount">{resources.nourriture}</span>
            </div>
            <div className="resource-item">
              <span>Bois:</span>
              <span className="amount">{resources.bois}</span>
            </div>
            <div className="resource-item">
              <span>Pierre:</span>
              <span className="amount">{resources.pierre}</span>
            </div>
            <div className="resource-item">
              <span>Cristal:</span>
              <span className="amount">{resources.cristal}</span>
            </div>
          </div>

          <div className="buildings-list">
            <h3>🏗️ Construire</h3>
            {buildings.map((building, idx) => (
              <button 
                key={idx}
                className="building-btn"
                onClick={() => handleBuildBuilding(building)}
              >
                <span>{building.icon} {building.name}</span>
                <span className="cost">Or: {building.cost.or}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Zone de Jeu Principale */}
        <div className="game-world">
          <h2>Carte d'Aethermoor</h2>
          
          <div className="world-grid">
            <div className="empire-plot">
              <div className="empire-center">
                <p>🏰 Votre Empire</p>
                <p className="coords">Position: ({Math.floor(player.position?.x || 0)}, {Math.floor(player.position?.y || 0)})</p>
              </div>
            </div>

            {/* Afficher les autres joueurs */}
            {players.map((otherPlayer, idx) => (
              <div key={idx} className="other-player" style={{
                left: `${(otherPlayer.position?.x || 0) % 100}%`,
                top: `${(otherPlayer.position?.y || 0) % 100}%`
              }}>
                <span>👤</span>
              </div>
            ))}
          </div>

          <div className="game-controls">
            <button className="btn btn-secondary">Armée</button>
            <button className="btn btn-secondary">Magie</button>
            <button className="btn btn-secondary">Diplomatie</button>
            <button className="btn btn-secondary">Guilde</button>
            <button className="btn btn-secondary">Quêtes</button>
          </div>
        </div>

        {/* Chat et Événements */}
        <div className="right-panel">
          <div className="events-log">
            <h3>📜 Événements</h3>
            <div className="event-item">
              <p>🎮 Bienvenue à Aethermoor!</p>
            </div>
            <div className="event-item">
              <p>🏗️ Prêt à construire votre empire?</p>
            </div>
            <div className="event-item">
              <p>🌍 {players.length} autres joueurs en ligne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;