const { Game } = require("./backend/Game.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const WebSocket = require('ws');
const { WebSocketServer } = require('./backend/WebSocketServer.js');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Page Scripts/Html/Index.html'));
});

// In-memory list of games
let games = [];
let current_games = [];

// Endpoint to create a new game
app.post("/lobby", async (req, res) => {
  const { gameName } = req.body;
  const game = { id: games.length + 1, name: gameName, players: [], host: null, client: null };
  games.push(game);
  return res.json({ game });
});

// Endpoint to get the list of games
app.get("/games", (req, res) => {
  return res.json({ games });
});

app.post("/games/join", (req, res) => {
  const { username, gameId, secret } = req.body;
  let game = games.find(g => g.id === gameId);
  if (game) {
    const player = { username, secret, color: null };
    game.players.push(player);
    if (game.players.length === 1) {
      game.host = player;
    } else if (game.players.length === 2) {
      game.client = player;
    }
    return res.json({ gameId: game.id, host: game.host, client: game.client });
  } else {
    return res.status(404).json({ error: "Game not found" });
  }
});

// Start WebSocket server
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});