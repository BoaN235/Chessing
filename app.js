const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const e = require("express");

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

// In-memory list of games
let games = [];
let current_games = [];

io.on("connection", (socket) => {

  socket.on("join", (data) => {
    for (game of games) {
      for (player of game.players) {
        if (player.secret === data.player) {
          players_loaded = 1;
          if (players_loaded === 2) {
            for (otherplayer of game.players) {
              if (player.secret != otherplayer.secret) {
                if (player.color == "w") {
                  player.color = "b";
                } else {
                  player.color = "w";
                }
              }
            }
            player.color = Math.random() < 0.5 ? "w" : "b";
          }
        }
      }
    }
    io.emit("player_joined", {OtherPlayer: player.username, Color : player.color});
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

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});