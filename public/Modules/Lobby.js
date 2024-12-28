export class Lobby {
    constructor() {
        this.title = "Lobby";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
        this.games = []; // List of games
        this.creategame = document.getElementById('create-game');
        this.creategame.addEventListener('click', this.create_game.bind(this));
        this.game_name = document.getElementById('game-name');
    }

    async load() {
        // Fetch the list of games from the server
        await this.fetchGames();

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
        gameList.innerHTML = ''; // Clear any existing games
        for (const game of this.games) {
            const listItem = document.createElement('li');
            listItem.textContent = `${game.name} (Players: ${game.players.length})`;
            gameList.appendChild(listItem);

            // Create join button for each game
            const joinButton = document.createElement('button');
            joinButton.textContent = `Join ${game.name}`;
            joinButton.addEventListener('click', () => this.join_game(game.id));
            listItem.appendChild(joinButton);
        }
    }

    async fetchGames() {
        try {
            const response = await fetch('http://localhost:8000/games');
            const data = await response.json();
            this.games = data.games;
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    async join_game(gameId) {
        try {
            const response = await fetch('http://localhost:8000/games/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: 'your-username', gameId })
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Joined game: ${data.game.name}`);
                // Implement further logic for joining the game
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error joining game:', error);
        }
    }

    start_clicked() {
        for (const button of this.buttonlist) {
            button.remove();
        }
        this.buttonlist = [];
        window.location.href = 'Chess.html';
    }

    create_game() {
        // Implement game creation logic here
    }
}