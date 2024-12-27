

export class Cell {
    constructor(col, row, board) {
        this.col = col;
        this.row = row;
        this.cell = document.createElement('div');
        this.color = "#769656";
        this.board = board;
        this.piece
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
    }
    changeColor(color) {
        this.color = color;
        this.cell.style.setProperty('--cell-color', color);
    }
    onClick() {
        if (this.cell.style.getPropertyValue('--cell-color') === '#ff6060') {
            this.cell.style.setProperty('--cell-color', this.color);
        } else {
            this.cell.style.setProperty('--cell-color', '#ff6060');
        }
        this.piece.onClick();
    }
}