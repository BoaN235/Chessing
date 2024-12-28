//import { Game } from "./backend/SeverLobby.js";

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
  const game = { id: games.length + 1, name: gameName, players: [] };
  games.push(game);
  return res.json({ game });
});

// Endpoint to get the list of games
app.get("/games", (req, res) => {

  return res.json({ games });
});

app.get("/startgame", (req, res) => {
  
    return res.json({ color });
});

// Endpoint to join a game
app.post("/games/join", (req, res) => {
  const { username, gameId, secret } = req.body;
  const game = games.find(g => g.id === gameId);
  if (game) {
    player = { username, secret };
    game.players.push(player);
    console.log(game);
    return res.json({ game });
  } else {
    return res.status(404).json({ error: "Game not found" });
  }
});

app.post("/games/start", (req, res) => {

});

app.post("/games/move", (req, res) => { 

});

app.listen(8000);