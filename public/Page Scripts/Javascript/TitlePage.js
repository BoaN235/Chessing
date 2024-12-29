class TitlePage {
    constructor() {
        this.startbutton = document.querySelector("#start-game");
        if (this.startbutton) {
            this.startbutton.addEventListener('click', this.start_clicked.bind(this));
        } else {
            console.error('Start button not found');
        }
    }

    start_clicked() {
        window.location.href = 'Page Scripts/Html/Lobby.html';
    }
}

// Initialize the TitlePage
const titlePage = new TitlePage();