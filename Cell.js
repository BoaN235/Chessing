export class Cell {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
    draw() {
        const cell = document.createElement('div');
        cell.classList.add('grid-square');
        document.querySelector('.grid-container').appendChild(cell);
    }
}