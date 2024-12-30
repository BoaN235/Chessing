import { Board } from './Board.js';
import { Player } from './Player.js';

export class Chess {
    constructor() {
        this.player = new Player(); // Correctly instantiate the Player class
        this.title = "Chess";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
        document.getElementById("loading").style.display = "none";
        this.socket=io();  
    }
    async load() {
      let player = this.player.secret;
      this.socket.emit("join", {player:player.secret});
      document.getElementById("loading").style.display = "block";
      socket.on("player_joined", player_joined);
      const board = new Board(this.player, this);
    }
    move_made(move) {

      this.socket.emit("move", {move:move, player:player});

    }
    
    



}