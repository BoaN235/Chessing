export class Cell {
    constructor(col, row, board) {
        this.col = col;
        this.row = row;
        this.cell = document.createElement('div');
        this.color = "#769656";
        this.board = board;
        this.piece = null; // Initialize piece property
        this.notation = `${String.fromCharCode(97 + col)}${8 - row}`;
        this.seen = false;
        this.clicked = false;
        this.capture = false;
        this.move = false;
    }
    draw() {
        this.cell.classList.add('grid-square');
        if ((this.col + this.row) % 2 === 0) {
            this.cell.style.setProperty('--cell-color', '#769656');
            this.color = "#769656";
        } else {
            this.cell.style.setProperty('--cell-color', '#eeeed2');
            this.color = "#eeeed2";
        }
        document.querySelector('.grid-container').appendChild(this.cell);
        this.cell.style.setProperty('--notation', `'${this.notation}'`);
    }
    changeColor() {
        if (this.capture) {
            this.cell.style.setProperty('--cell-color', '#ff9e70');
        } else if (this.clicked) {
            this.cell.style.setProperty('--cell-color', '#ff6060');
        } else if (this.move) {
            this.cell.style.setProperty('--cell-color', '#baca44');
        } else {
            this.cell.style.setProperty('--cell-color', this.color); // Reset to original color if no condition is met
        }
    }
}