export class Lobby {
    constructor() {
        this.title = "Lobby";
        this.games = []; // List of games
        this.selectedGameId = null; // ID of the selected game
        this.createGameForm = document.getElementById('create-game-form');
        this.createGameForm.addEventListener('submit', this.create_game.bind(this));
        this.game_name = document.getElementById('game-name');
        this.username = this.generateRandomUsername();
        this.joinButton = document.getElementById('join-selected-game');
        this.joinButton.addEventListener('click', this.join_selected_game.bind(this));
        this.refreshButton = document.getElementById('refresh-game-list');
        this.refreshButton.addEventListener('click', this.load.bind(this));
        
    }

    async generateRandomUsername() {
        const randomNumbers = new Uint32Array(10);
        window.crypto.getRandomValues(randomNumbers);
        const randomString = Array.from(randomNumbers).join('');
        const encoder = new TextEncoder();
        const data = encoder.encode(randomString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async load() {
        // Fetch the list of games from the server
        await this.fetchGames();

        const username = document.getElementById('username');
        username.addEventListener('change', () => { this.username = username.value; });
        this.populate_game_list();

    }

    populate_game_list() {
            // Populate game list
            const gameList = document.getElementById('game-list');
            gameList.innerHTML = ''; // Clear any existing games
            for (const game of this.games) {
                const listItem = document.createElement('li');
                listItem.textContent = `${game.name} (Players: ${game.players.length}/2)`;
                listItem.addEventListener('click', () => this.select_game(game.id, listItem));
                gameList.appendChild(listItem);
            }
    }

    async fetchGames() {
        try {
            const response = await fetch('http://localhost:8000/games');
            const data = await response.json();
            console.log('Fetched games:', data.games);
            this.games = data.games;
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    async create_game(event) {
        event.preventDefault();
        const gameName = this.game_name.value;
        const username = await this.username;
        try {
            const response = await fetch('http://localhost:8000/lobby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, gameName })
            });
            const game = await response.json();
            this.games.push(game);
            this.load(); // Reload the game list
        } catch (error) {
            console.error('Error creating game:', error);
        }
    }

    async join_game(gameId) {
        const username = await this.username;
        try {
            const response = await fetch('http://localhost:8000/games/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, gameId })
            });
            const game = await response.json();
            this.load(); // Reload the game list
        } catch (error) {
            console.error('Error joining game:', error);
        }
        window.location.href = 'Page Scripts/Html/Chess.html';
    }

    async join_selected_game() {
        if (this.selectedGameId !== null) {
            await this.join_game(this.selectedGameId);
        }

    }

    select_game(gameId, listItem) {
        // Deselect previously selected game
        const previouslySelected = document.querySelector('.selected-game');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected-game');
        }

        // Select the new game
        listItem.classList.add('selected-game');
        this.selectedGameId = gameId;
        this.joinButton.disabled = false; // Enable the join button
    }

}