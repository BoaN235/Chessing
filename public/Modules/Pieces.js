import { Piece, PTypes } from './Piece.js';

export class Pawn extends Piece {
    constructor(player, cell, board) {
        super(player, cell, board);
        this.piece = Pawn;
        this.type = 'Pawn';
        this.color = player.color; // Correctly set the color property
        this.cell = cell;
        this.board = board;
    }

    check_moves() {
        let moves = [];
        this.board.grid_list.forEach(cell => {
            if (cell.row === this.cell.row - 1 && cell.col === this.cell.col) {
                if (!cell.piece) {
                    moves.push(cell);
                }
            }
        });
        return moves;
    }

    check_captures() {
        let moves = [];
        this.board.grid_list.forEach(cell => {
            if (cell.row === this.cell.row - 1 && (cell.col === this.cell.col - 1 || cell.col === this.cell.col + 1)) {
                if (cell.piece && cell.piece.color !== this.color) {
                    moves.push(cell);
                }
            }
        });
        return moves;
    }

    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/pawn-${this.color}.svg`;
        pieceElement.classList.add('piece', 'pawn', this.color);
        super.draw(pieceElement);
    }

    erase() {
        const pieceElement = this.cell.cell.querySelector('.piece');
        if (pieceElement) {
            pieceElement.remove();
        }
    }
}
export class Rook extends Piece {
    constructor(player, cell, board) {
        super(player, cell, board);
        this.piece = Rook;
        this.type = 'Rook';
        this.color = player.color; // Correctly set the color property
        this.cell = cell;
        this.board = board;
    }
    check_moves() {
        console.log('Rook moved');
    }
    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/rook-${this.color}.svg`;
        pieceElement.classList.add('piece', 'rook', this.color);
        super.draw(pieceElement);
    }
}
export class Knight extends Piece {
    constructor(player, cell, board) {
        super(player, cell, board);
        this.piece = Knight;
        this.type = 'Knight';
        this.color = player.color; // Correctly set the color property
        this.cell = cell;
        this.board = board;
    }
    check_moves() {
        console.log('Knight moved');
    }
    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/knight-${this.color}.svg`;
        pieceElement.classList.add('piece', 'knight', this.color);
        super.draw(pieceElement);
    }
}
export class Bishop extends Piece {
    constructor(player, cell, board) {
        super(player, cell, board);
        this.piece = Bishop;
        this.type = 'Bishop';
        this.color = player.color; // Correctly set the color property
        this.cell = cell;
        this.board = board;
    }
    check_moves() {
        console.log('Bishop moved');
    }
    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/bishop-${this.color}.svg`;
        pieceElement.classList.add('piece', 'bishop', this.color);
        super.draw(pieceElement);
    }
}
export class Queen extends Piece {
    constructor(player, cell, board) {
        super(player, cell, board);
        this.piece = Queen;
        this.type = 'Queen';
        this.color = player.color; // Correctly set the color property
        this.cell = cell;
        this.board = board;
    }
    check_moves() {
        console.log('Queen moved');
    }
    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/queen-${this.color}.svg`;
        pieceElement.classList.add('piece', 'queen', this.color);
        super.draw(pieceElement);
    }
}
export class King extends Piece {
    constructor(player, cell, board) {
        super(player, cell, board);
        this.piece = King;
        this.type = 'King';
        this.color = player.color; // Correctly set the color property
        this.cell = cell;
        this.board = board;
    }
    check_moves() {
        console.log('King moved');
    }
    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/king-${this.color}.svg`;
        pieceElement.classList.add('piece', 'king', this.color);
        super.draw(pieceElement);
    }
}