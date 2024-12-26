export class Lobby {
    constructor() {
        this.title = "Lobby";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
        this.games = ['Game 1', 'Game 2', 'Game 3']; // Example game list
    }

    load() {
        // Create title buttons
        for (const [text, handler, loc] of this.titlebuttons) {
            const button = document.createElement('button');
            button.textContent = text;
            document.body.appendChild(button);
            button.addEventListener('click', handler.bind(this));
            this.buttonlist.push(button);
        }

        // Populate game list
        const gameList = document.getElementById('game-list');
        for (const game of this.games) {
            const listItem = document.createElement('li');
            listItem.textContent = game;
            gameList.appendChild(listItem);
        }

        // Create buttons for each game
        for (const game of this.games) {
            const button = document.createElement('button');
            button.textContent = `Join ${game}`;
            document.body.appendChild(button);
            button.addEventListener('click', () => this.join_game(game));
            this.buttonlist.push(button);
        }
    }

    start_clicked() {
        for (const button of this.buttonlist) {
            button.remove();
        }
        this.buttonlist = [];
        window.location.href = 'Chess.html';
    }

    join_game(game) {
        alert(`Joining ${game}`);
        // Implement game joining logic here
    }
}