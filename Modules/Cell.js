export class Cell {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.cell = document.createElement('div');
    }
    draw() {
        this.cell.classList.add('grid-square');
        if ((this.col + this.row) % 2 === 0) {
            this.cell.style.setProperty('--cell-color', '#769656');
        } else {
            this.cell.style.setProperty('--cell-color', '#eeeed2');
        }
        document.querySelector('.grid-container').appendChild(this.cell);
        this.cell.addEventListener('click', this.onClick.bind(this));
    }
    onClick() {
        console.log(`Cell ${this.col}, ${this.row} clicked`);
        this.cell.style.setProperty('--cell-color', '#ff6060');
    }
}