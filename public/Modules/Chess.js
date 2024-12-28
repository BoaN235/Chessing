import { Board } from './Board.js';
import { Player } from './Player.js';

export class Chess {
    constructor() {
        this.player = new Player(); // Correctly instantiate the Player class
        this.title = "Chess";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
    }
    load() {
        const board = new Board(this.player);
    }
}