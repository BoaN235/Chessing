import { PTypes } from './Piece.js';

class OpponentPiece {
    constructor(type, cell, color) {
        this.type = type;
        this.cell = cell;
        this.color = color;
    }

    move(newPosition) {
        this.cell = newPosition;
    }

    capture() {
        this.cell = null;
    }

    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/${this.type}-${this.color}.svg`;
        pieceElement.classList.add('piece', this.type, this.color);
        this.cell.cell.appendChild(pieceElement);
    }
}

export default OpponentPiece;