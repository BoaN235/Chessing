import { Cell } from './Cell.js';

export class Board {
    constructor() {
        this.grid_list = [];
    }
    load() {
        const grid = document.createElement('div');
        grid.classList.add('grid-container');
        document.body.appendChild(grid);

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = new Cell(col, row);
                this.grid_list.push(cell);
            }
        }
        for (let Cell of this.grid_list) {
            Cell.draw();
        }
    }
}