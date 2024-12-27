import { Board } from './Board.js';

export class Chess {
    constructor() {
        this.title = "Chess";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
    }
    load() {
            const board = new Board();
            board.load();
        }

}

