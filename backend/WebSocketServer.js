const WebSocket = require('ws');

class WebSocketServer {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Map(); // Store clients with their usernames

        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => this.handleMessage(ws, message));
            ws.on('close', () => this.handleDisconnect(ws));
        });
    }

    handleMessage(ws, message) {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'register':
                this.registerClient(ws, data.username);
                break;
            case 'move':
                this.broadcastMove(data);
                break;
            // Add more cases as needed for different message types
        }
    }

    registerClient(ws, username) {
        this.clients.set(ws, username);
        this.broadcast({ type: 'userJoined', username });
    }

    broadcastMove(data) {
        this.broadcast({ type: 'move', move: data.move });
    }

    broadcast(data) {
        const message = JSON.stringify(data);
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    handleDisconnect(ws) {
        const username = this.clients.get(ws);
        this.clients.delete(ws);
        this.broadcast({ type: 'userLeft', username });
    }
}
module.exports = WebSocketServer;