import { Player } from './Player.js';


export class PTypes {
    static PAWN = 'pawn';
    static ROOK = 'rook';
    static KNIGHT = 'knight';
    static BISHOP = 'bishop';
    static QUEEN = 'queen';
    static KING = 'king';

}


export class Piece {
    constructor(player, cell, board) {
        this.player = player;
        this.cell = cell;
        this.board = board;
        this.moves = [];
        this.captures = [];
        this.color = this.player.color;

        this.cell.cell.addEventListener('click', this.onClick.bind(this));
        
    }

    onClick() {
        this.moves = this.check_moves();
        this.captures = this.check_captures();
        console.log(`Piece clicked: ${this.type} at ${this.cell.col}, ${this.cell.row}`);
        console.log(this.moves);
        
        if (this.moves) {
            for (const move of this.moves) {
                move.move = true;
                move.cell.addEventListener('click', this.onMoveClick.bind(this));
            }
        }   
        if (this.captures) {
            for (const capture of this.captures) {
                capture.capture = true;
                capture.cell.addEventListener('click', this.onCaptureClick.bind(this));
            }
        }
        if (this.cell.clicked) {
            this.cell.clicked = false;
        } else {
            this.cell.clicked = true;
        }
        this.board.Change_colors();
    }

    onMoveClick(event) {
        let target_notation = event.target.style.getPropertyValue('--notation').replace(/^'|'$/g, '');

        for (const cell of this.moves) {
            if (cell.notation === target_notation) {
                this.Move(cell);
                break; // Exit the loop once the move is made
            }
        }
        this.board.Change_colors();
    }

    Move(targetCell) {
        // Clear the current cell
        this.cell.clicked = false;
        this.erase();
        this.cell.cell.removeEventListener('click', this.onClick.bind(this));
        this.cell.piece = null;

        // Move to the target cell
        targetCell.piece = this;
        this.cell = targetCell;
        this.draw();
        targetCell.cell.addEventListener('click', this.onClick.bind(this));

        // Reset move and capture states
        this.moves.forEach(cell => {
            cell.move = false;
            cell.cell.removeEventListener('click', this.onMoveClick.bind(this));
        });
        this.captures.forEach(cell => {
            cell.capture = false;
            cell.cell.removeEventListener('click', this.onCaptureClick.bind(this));
        });

        // Update the board colors
        this.board.Change_colors();
    }

    onCaptureClick(event) {
        console.log("captured");
        //this.cell = event.target;
        //this.draw();
    }

    Captured(event) {
        this.cell = event.target;
        this.erase();
    }
}