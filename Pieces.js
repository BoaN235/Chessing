import { Piece } from './Piece.js';

export class Pawn extends Piece {
    constructor(piece) {
        super(piece);
        this.piece = piece;
    }
    move() {
        console.log('Pawn moved');
    }
}