const { Game } = require("./backend/Game.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const WebSocket = require('ws');
const WebSocketServer = require('./backend/WebSocketServer.js');

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

// Endpoint to start a game
app.post("/start", (req, res) => {
  const { secret, GameId } = req.body;
  console.log("Start request received with:", { secret, GameId });
  let game = games.find(g => g.id === GameId);
  if (game) {
    game = new Game(game);
    const color = game.start();
    current_games.push(game); // Add the game to the current_games array

    // Find the player and include their color in the response
    const player = game.players.find(p => p.secret === secret);
    const playerColor = player ? player.color : null;

    return res.json({ color, playerColor });
  } else {
    console.log("Game not found for start:", GameId);
    return res.status(404).json({ error: "Game not found" });
  }
});

// Endpoint to check game status
app.post("/status", (req, res) => {
  const { gameId } = req.body;
  console.log("Status request received with:", { gameId });
  const game = games.find(g => g.id === gameId);
  if (game) {
    const ready = game.players.length === 2;
    return res.json({ ready });
  } else {
    console.log("Game not found for status:", gameId);
    return res.status(404).json({ error: "Game not found" });
  }
});

// Create an HTTP server
const server = require('http').createServer(app);

// Create a WebSocket server
const wss = new WebSocketServer(server);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});