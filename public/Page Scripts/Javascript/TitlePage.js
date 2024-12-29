class TitlePage {
    constructor() {
        this.startbutton = document.querySelector("#start-game");
        if (this.startbutton) {
            this.startbutton.addEventListener('click', this.start_clicked.bind(this));
        } else {
            console.error('Start button not found');
        }
        
        this.createSquareGrid(100, 100); // Create a 10x10 grid of small squares
    }

    start_clicked() {
        window.location.href = 'Page Scripts/Html/Lobby.html';
    }

    createSquareGrid(rows, cols) {
        const container = document.querySelector("#big-square");
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const square = document.createElement("div");
                square.className = "small-square";
                square.id = `square-${row}-${col}`;
                container.appendChild(square);
            }
        }
    }
}



// Initialize the TitlePage
const titlePage = new TitlePage();