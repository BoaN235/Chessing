const { Game } = require("./backend/Game.js");
const express = require("express");
const cors = require("cors");
const path = require("path");

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

// Endpoint to join a game
app.post("/games/join", (req, res) => {
  const { username, gameId, secret } = req.body;
  const game = games.find(g => g.id === gameId);
  if (game) {
    if (game.players.length < 2) {
      const player = { username, secret };
      if (game.players.length === 0) {
        game.host = player;
      } else if (game.players.length === 1) {
        game.client = player;
      }
      game.players.push(player);
      return res.json({ game });
    } else {
      return res.status(404).json({ error: "Game is full" });
    }
  } else {
    return res.status(404).json({ error: "Game not found" });
  }
});

// Endpoint to check game status
app.post("/games/status", (req, res) => {
  const { gameId } = req.body;
  const game = games.find(g => g.id === gameId); // Use games array instead of current_games
  if (game) {
    const ready = game.players.length === 2;
    return res.json({ ready });
  } else {
    return res.status(404).json({ error: "Game not found" });
  }
});

// Endpoint to start the game
app.post("/games/start", (req, res) => {
  const { secret, GameID } = req.body;
  let game = games.find(g => g.id === GameID);
  if (game) {
    game = new Game(game);
    const color = game.start();
    current_games.push(game); // Add the game to the current_games array
    return res.json({ color });
  } else {
    return res.status(404).json({ error: "Game not found" });
  }
});

app.listen(8000);