import { Cell } from './Cell.js';
import { Pawn, Rook, Knight, Bishop, Queen, King } from './Pieces.js';
import { Player } from './Player.js';

export class Board {
    constructor(player) {
        this.grid_list = [];
        this.player = Player;
    }
    load() {
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

        // Place pieces on the board
        this.placePieces();
    }

    Change_colors() {  
        this.grid_list.forEach(cell => cell.changeColor());
    }

    placePieces() {
        if (this.player.color === 'w') {
            this.pieces = [
                // Pawns
                ...Array(8).fill().map((_, col) => {
                    const piece = new Pawn('b', this.grid_list[col + 8], this);
                    this.grid_list[col + 8].piece = piece;
                    return piece;
                }),
                ...Array(8).fill().map((_, col) => {
                    const piece = new Pawn('w', this.grid_list[col + 48], this);
                    this.grid_list[col + 48].piece = piece;
                    return piece;
                }),
                
                // Rooks
                (() => {
                    const piece = new Rook('b', this.grid_list[0], this);
                    this.grid_list[0].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Rook('b', this.grid_list[7], this);
                    this.grid_list[7].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Rook('w', this.grid_list[56], this);
                    this.grid_list[56].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Rook('w', this.grid_list[63], this);
                    this.grid_list[63].piece = piece;
                    return piece;
                })(),
                
                // Knights
                (() => {
                    const piece = new Knight('b', this.grid_list[1], this);
                    this.grid_list[1].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Knight('b', this.grid_list[6], this);
                    this.grid_list[6].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Knight('w', this.grid_list[57], this);
                    this.grid_list[57].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Knight('w', this.grid_list[62], this);
                    this.grid_list[62].piece = piece;
                    return piece;
                })(),
                
                // Bishops
                (() => {
                    const piece = new Bishop('b', this.grid_list[2], this);
                    this.grid_list[2].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Bishop('b', this.grid_list[5], this);
                    this.grid_list[5].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Bishop('w', this.grid_list[58], this);
                    this.grid_list[58].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Bishop('w', this.grid_list[61], this);
                    this.grid_list[61].piece = piece;
                    return piece;
                })(),
                
                // Queens
                (() => {
                    const piece = new Queen('b', this.grid_list[3], this);
                    this.grid_list[3].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Queen('w', this.grid_list[59], this);
                    this.grid_list[59].piece = piece;
                    return piece;
                })(),
                
                // Kings
                (() => {
                    const piece = new King('b', this.grid_list[4], this);
                    this.grid_list[4].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new King('w', this.grid_list[60], this);
                    this.grid_list[60].piece = piece;
                    return piece;
                })()
            ];
        } else {
            this.pieces = [
                // Pawns
                ...Array(8).fill().map((_, col) => {
                    const piece = new Pawn('w', this.grid_list[col + 8], this);
                    this.grid_list[col + 8].piece = piece;
                    return piece;
                }),
                ...Array(8).fill().map((_, col) => {
                    const piece = new Pawn('b', this.grid_list[col + 48], this);
                    this.grid_list[col + 48].piece = piece;
                    return piece;
                }),
                
                // Rooks
                (() => {
                    const piece = new Rook('w', this.grid_list[0], this);
                    this.grid_list[0].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Rook('w', this.grid_list[7], this);
                    this.grid_list[7].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Rook('b', this.grid_list[56], this);
                    this.grid_list[56].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Rook('b', this.grid_list[63], this);
                    this.grid_list[63].piece = piece;
                    return piece;
                })(),
                
                // Knights
                (() => {
                    const piece = new Knight('w', this.grid_list[1], this);
                    this.grid_list[1].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Knight('w', this.grid_list[6], this);
                    this.grid_list[6].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Knight('b', this.grid_list[57], this);
                    this.grid_list[57].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Knight('b', this.grid_list[62], this);
                    this.grid_list[62].piece = piece;
                    return piece;
                })(),
                
                // Bishops
                (() => {
                    const piece = new Bishop('w', this.grid_list[2], this);
                    this.grid_list[2].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Bishop('w', this.grid_list[5], this);
                    this.grid_list[5].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Bishop('b', this.grid_list[58], this);
                    this.grid_list[58].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Bishop('b', this.grid_list[61], this);
                    this.grid_list[61].piece = piece;
                    return piece;
                })(),
                
                // Queens
                (() => {
                    const piece = new Queen('w', this.grid_list[3], this);
                    this.grid_list[3].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new Queen('b', this.grid_list[59], this);
                    this.grid_list[59].piece = piece;
                    return piece;
                })(),
                
                // Kings
                (() => {
                    const piece = new King('w', this.grid_list[4], this);
                    this.grid_list[4].piece = piece;
                    return piece;
                })(),
                (() => {
                    const piece = new King('b', this.grid_list[60], this);
                    this.grid_list[60].piece = piece;
                    return piece;
                })()
            ];
        }
        
        this.pieces.forEach(piece => piece.draw());
    }
}