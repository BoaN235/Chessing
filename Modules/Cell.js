export class Cell {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
    draw() {
        const cell = document.createElement('div');
        cell.classList.add('grid-square');
        if ((this.col + this.row) % 2 === 0) {
            cell.style.setProperty('--cell-color', '#769656');
        } else {
            cell.style.setProperty('--cell-color', '#eeeed2');
        }
        document.querySelector('.grid-container').appendChild(cell);
    }
    onClick() {
        console.log(`Cell ${this.col}, ${this.row} clicked`);
    }
}