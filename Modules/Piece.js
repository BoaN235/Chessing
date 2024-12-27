export class Piece {
    constructor(player, cell, board) {
        this.player = player;
        this.cell = cell;
        this.board = board;
        this.moves = [];
        this.cell.cell.addEventListener('click', this.cell.onClick.bind(this.cell));
    }
    onClick() {
        //this.moves = this.check_moves();
        console.log(`Piece clicked: ${this.type} at ${this.cell.col}, ${this.cell.row}`);
        console.log(this.moves);
        for (const move of this.moves) {
            move.changeColor('#ff9e70')
        }
    }

}