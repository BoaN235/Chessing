//import { Game } from "./backend/SeverLobby.js";
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
    player = { username, secret };
    if (game.players.length == 0) {
      game.host = player;
    } 
    if (game.players.length == 1) {
      game.client = player;
    }
    game.players.push(player);
    console.log(game);
    return res.json({ game });
  } else {
    return res.status(404).json({ error: "Game not found" });
  }
});

app.post("/games/start", (req, res) => {
  const { secret } = req.body;
  const gameIndex = games.findIndex(g => g.host && g.host.secret === secret);
  const randomNumber = Math.floor(Math.random() * 1); // Generates a random number between 0 and 9
  if (randomNumber = 0) {
    games[gameIndex].players[0].color = 'w';
    games[gameIndex].players[1].color = 'b';
  }
  if (gameIndex !== -1) {
      const game = games.splice(gameIndex, 1)[0]; // Remove the game from games array
      current_games.push(game); // Add the game to current_games array
      return res.json({ game });
  } else {
      return res.status(404).json({ error: "Game not found or invalid secret" });
  }
});

app.post("/games/move", (req, res) => { 

});

app.listen(8000);