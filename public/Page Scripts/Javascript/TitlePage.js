class TitlePage {
    constructor() {
        this.startbutton = document.querySelector("#start-game");
        if (this.startbutton) {
            this.startbutton.addEventListener('click', this.start_clicked.bind(this));
        } else {
            console.error('Start button not found');
        }
        
        this.createChessBoard(8, 8); // Create an 8x8 chess board
    }

    start_clicked() {
        window.location.href = 'Page Scripts/Html/Lobby.html';
    }

    createChessBoard(rows, cols) {
        const containers = document.querySelectorAll(".square");
        containers.forEach(container => {
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const square = document.createElement("div");
                    square.className = "small-square";
                    square.id = `square-${row}-${col}`;
                    // Alternate colors for chess board pattern
                    if ((row + col) % 2 === 0) {
                        square.style.backgroundColor = "#002f3b"; // Dark square
                    } else {
                        square.style.backgroundColor = "#36545f"; // Light square
                    }
                    container.appendChild(square);
                }
            }
        });
    }
}

// Initialize the TitlePage
const titlePage = new TitlePage();