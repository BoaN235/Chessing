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
        if (this.player.host) {
            try {
                const response = await fetch('http://localhost:8000/games/start', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ secret: this.player.secret })
                });
                const game = await response.json();
                if (game.host.secret === this.player.secret) {
                    this.player.host = true;
                }
                // Set the player's color based on the response
                const playerData = game.players.find(p => p.secret === this.player.secret);
                if (playerData) {
                    this.player.color = playerData.color;
                }
            } catch (error) {
                console.error('Error joining game:', error);
            }
        }
        const board = new Board(this.player);
    }
}