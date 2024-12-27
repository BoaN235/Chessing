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
        if (this.player === 'b') {
            this.cell.cell.addEventListener('click', this.onClick.bind(this));
        }


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
            for (const Capture of this.captures) {
                Capture.capture = true;
                Capture.cell.addEventListener('click', this.onCaptureClick.bind(this));
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
            console.log(typeof(target_notation), typeof(cell.notation));
            if (cell.notation === target_notation) {
                this.Move(cell);
            }
        }
        this.board.Change_colors();
    }

    Move(Cell) {
        this.cell.clicked = false;
        this.board.Change_colors();
        this.erase();
        this.cell.cell.removeEventListener('click', this.onClick.bind(this));
        this.cell.piece = null;
        Cell.piece = this;
        this.cell = Cell;
        this.draw();
        Cell.cell.addEventListener('click', this.onClick.bind(this));
        this.moves.forEach(cell => {
            cell.move = false;
            cell.cell.removeEventListener('click', this.onMoveClick.bind(this));
        });
        this.captures.forEach(cell => cell.capture = false);
    }

    onCaptureClick(event) {
        console.log("captured")
        //this.cell = event.target;
        //this.draw();
    }

    Captured(event) {
        this.cell = event.target;
        this.erase();
    }
}