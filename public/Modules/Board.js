import { COLORS } from './Player.js';
import { Cell } from './Cell.js';
import { Pawn, Rook, Knight, Bishop, Queen, King } from './Pieces.js';
import  {OpponentPiece} from './OpponentPiece.js';
import { PTypes } from './Piece.js';
//import e from 'express';



export class Board {
    constructor(player) {
        this.player = player;
        this.grid_list = [];
        this.pieces = [];
        this.createGrid();
        this.placePieces();
        this.op_color = String(this.player.color === COLORS.BLACK ? COLORS.WHITE : COLORS.BLACK); 
    }

    createGrid() {
        const grid = document.createElement('div');
        grid.classList.add('grid-container');
        document.body.appendChild(grid);

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = new Cell(col, row, this);
                this.grid_list.push(cell);
            }
        }
        for (let cell of this.grid_list) {
            cell.draw();
        }
    }

    flipBoard() {
        if (this.player.color === COLORS.BLACK) {
            this.grid_list.reverse();
        }
    }

    Change_colors() {  
        this.grid_list.forEach(cell => cell.changeColor());
    }

    placePieces() {
        this.flipBoard(); // Flip the board if the player is black

        this.pieces = [
            // Pawns
            ...Array(8).fill().map((_, col) => {
                const piece = new OpponentPiece('pawn', this.grid_list[col + 48], this.op_color, this.player);
                this.grid_list[col + 48].piece = piece;
                return piece;
            }),
            ...Array(8).fill().map((_, col) => {
                const piece = new Pawn(this.player, this.grid_list[col + 8], this);
                this.grid_list[col + 8].piece = piece;
                return piece;
            }),
            
            // Rooks
            (() => {
                const piece = new Rook(this.player, this.grid_list[0], this);
                this.grid_list[0].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Rook(this.player, this.grid_list[7], this);
                this.grid_list[7].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Rook(this.player, this.grid_list[56], this);
                this.grid_list[56].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Rook(this.player, this.grid_list[63], this);
                this.grid_list[63].piece = piece;
                return piece;
            })(),
            
            // Knights
            (() => {
                const piece = new Knight(this.player, this.grid_list[1], this);
                this.grid_list[1].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Knight(this.player, this.grid_list[6], this);
                this.grid_list[6].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Knight(this.player, this.grid_list[57], this);
                this.grid_list[57].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Knight(this.player, this.grid_list[62], this);
                this.grid_list[62].piece = piece;
                return piece;
            })(),
            
            // Bishops
            (() => {
                const piece = new Bishop(this.player, this.grid_list[2], this);
                this.grid_list[2].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Bishop(this.player, this.grid_list[5], this);
                this.grid_list[5].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Bishop(this.player, this.grid_list[58], this);
                this.grid_list[58].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Bishop(this.player, this.grid_list[61], this);
                this.grid_list[61].piece = piece;
                return piece;
            })(),
            
            // Queens
            (() => {
                const piece = new Queen(this.player, this.grid_list[3], this);
                this.grid_list[3].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new Queen(this.player, this.grid_list[59], this);
                this.grid_list[59].piece = piece;
                return piece;
            })(),
            
            // Kings
            (() => {
                const piece = new King(this.player, this.grid_list[4], this);
                this.grid_list[4].piece = piece;
                return piece;
            })(),
            (() => {
                const piece = new King(this.player, this.grid_list[60], this);
                this.grid_list[60].piece = piece;
                return piece;
            })(),
        ];

        // If the board was flipped, flip it back to maintain the correct notation
        if (this.player.color === COLORS.BLACK) {
            this.grid_list.reverse();
        }
        this.pieces.forEach(piece => piece.draw());
    }
}