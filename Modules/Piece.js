export class Piece {
    constructor(player, cell, board) {
        this.player = player;
        this.cell = cell;
        this.board = board;
        this.moves = [];
        this.captures = [];
        if (this.player === 'w') {
            this.color = 'white';
        } else {
            this.color = 'black';
        }
        this.cell.cell.addEventListener('click', this.onClick.bind(this));

    }
    onClick() {
        this.moves = this.check_moves();
        this.captures = this.check_captures();
        console.log(`Piece clicked: ${this.type} at ${this.cell.col}, ${this.cell.row}`);
        console.log(this.moves);
        
        if (this.moves) {
            for (const move of this.moves) {
                move.changeColor('#ff9e70')
            }
        }   
        if (this.captures) {
            for (const capture of this.captures) {
                capture.changeColor('#ff6060')
            }
        }
    }
}