const { Game } = require("./backend/Game.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

const io = new Server(server);

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


// Create an HTTP server

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});