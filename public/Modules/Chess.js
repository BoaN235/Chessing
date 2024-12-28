import { Board } from './Board.js';
import { Player } from './Player.js';

export class Chess {
    constructor() {
        this.player = new Player(); // Correctly instantiate the Player class
        this.title = "Chess";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
    }

    async load() {
        try {
            const response = await fetch('http://localhost:8000/games/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ secret: this.player.secret, GameId: this.player.gameID })
            });
    
            const data = await response.json();
            if (this.player.host) { // Check if the player is the host
                this.player.color = data.color[0];
            }
            if (this.player.client) { // Check if the player is the client
                this.player.color = data.color[1];
            }
            await this.waitForGameReady(); // Wait until both players are ready
            const board = new Board(this.player); // Initialize the board after both players are ready
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async waitForGameReady() {
        const interval = setInterval(async () => {
            try {
                const response = await fetch('http://localhost:8000/games/status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameId: this.player.gameID }) // Ensure gameId is correctly passed
                });
                const data = await response.json();
                if (data.ready) {
                    clearInterval(interval);
                    // Notify the host that the game is ready to start
                    alert('Both players are ready. The game will start now.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 5000); // Poll every 5 seconds
    }
}