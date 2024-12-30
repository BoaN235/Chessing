import { Board } from './Board.js';
import { Player } from './Player.js';

export class Chess {
    constructor() {
        this.player = Player.getInstance();
        this.title = "Chess";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
        document.getElementById("loading").style.display = "none";
        this.socket = io();
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.socket.on("connect", () => {
            console.log("Connected to server");
        });

        this.socket.on("player_joined", (data) => {
            console.log("Player joined event received:", data);
            this.player.color = data.Color;
            document.getElementById("loading").style.display = "none";
            const board = new Board(this.player, this);
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    }

    async load() {
        let player = this.player.secret;
        let gameId = this.player.gameID; // Ensure gameID is set correctly
        console.log("Emitting join event with player:", player, "and gameId:", gameId);
        this.socket.emit("join", { player: player, gameId: gameId });
        document.getElementById("loading").style.display = "block";
    }

    move_made(move) {
        this.socket.emit("move", { move: move, player: this.player.secret });
    }
}