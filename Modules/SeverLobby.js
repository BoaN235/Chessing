const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../Page Scripts/Html')));

let games = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    // Send the current game list to the newly connected client
    socket.emit('updateGameList', games);

    // Handle creating a new game
    socket.on('createGame', (game) => {
        games.push(game);
        io.emit('updateGameList', games); // Notify all clients about the new game
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});