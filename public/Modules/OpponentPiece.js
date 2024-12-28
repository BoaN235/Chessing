import { PTypes } from './Piece.js';
import { COLORS, Player } from './Player.js';

export class OpponentPiece {
    constructor(type, cell, color, player) {
        this.type = PTypes[type.toUpperCase()]; // Ensure type is set correctly
        this.cell = cell;
        this.color = String(player.color === COLORS.BLACK ? COLORS.WHITE : COLORS.BLACK) //
    }

    move(newPosition) {
        this.cell = newPosition;
    }

    capture() {
        this.cell = null;
    }

    draw() {
        const pieceElement = document.createElement('img');
        pieceElement.src = `/Assets/${this.color}/${this.type}-${this.color}.svg`; // Corrected the src path
        pieceElement.classList.add('piece', this.type, this.color);
        this.cell.cell.appendChild(pieceElement);
    }
}