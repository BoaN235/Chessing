const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const JSONdb = require('simple-json-db');

const gdb = new JSONdb('backend/game_storage.json');
const pdb = new JSONdb('backend/player_storage.json');


const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Page Scripts/Html/Index.html'));
});


io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("join", (data) => {
      console.log("Join event received with data:", data);
      console.log("Games:", games);
      const game = games.find(game => game.id === data.gameId);
      if (game) {
          console.log("Game found:", game);
          const player = game.players.find(player => player.secret === data.player);
          if (player) {
              if (game.players.length === 2) {
                  const otherPlayer = game.players.find(p => p.secret !== player.secret);
                  player.color = otherPlayer.color === "w" ? "b" : "w";
              } else {
                  player.color = Math.random() < 0.5 ? "w" : "b";
              }
              console.log("Player joined: ", player, player.color);
              socket.emit("player_joined", { OtherPlayer: player.username, Color: player.color });
          } else {
              console.log("Player not found in the game");
          }
      } else {
          console.log("Game not found for the player");
      }
    });

    socket.on("move", (data) => {
      console.log("Move made: ", data);
      io.to(data.gameId).emit("move", { move: data.move });
    });
});

// Endpoint to create a new game
app.post("/lobby", async (req, res) => {
  const { gameName } = req.body;
  const game = { id: games.length + 1, name: gameName, players: [], host: null, client: null };
  gdb.set(String(game.id), JSON.stringify(game));
  return res.json({ id: game.id });
});

// Endpoint to get the list of games
app.get("/games", (req, res) => {
  return res.json({ games });
});

// Endpoint to join a game
app.post("/games/join", (req, res) => {
  const { username, gameId, secret } = req.body;
  let game = games.find(g => g.id === gameId);
  if (game) {
    const player = { username, secret, color: null, gameId }; // Add gameId to the player object
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

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});