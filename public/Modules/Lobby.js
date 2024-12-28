import { Player } from './Player.js';

export class Lobby {
    constructor() {
        this.player = new Player(); // Correctly instantiate the Player class
        this.games = {}; // List of games
        this.title = "Lobby";
        this.games = []; // List of games
        this.secret = this.player.secret; // Use this.player.secret
        this.username = this.player.username; // Use this.player.username
        
        this.selectedGameId = null; // ID of the selected game
        
        
        this.createGameForm = document.getElementById('create-game-form');
        this.createGameForm.addEventListener('submit', this.create_game.bind(this));
        this.game_name = document.getElementById('game-name');
        this.joinButton = document.getElementById('join-selected-game');
        this.joinButton.addEventListener('click', this.join_selected_game.bind(this));
        this.refreshButton = document.getElementById('refresh-game-list');
        this.refreshButton.addEventListener('click', this.populate_game_list.bind(this));
    }

    async load() {
        // Fetch the list of games from the server
        const username = document.getElementById('username');
        username.value = this.username;
        username.addEventListener('change', () => { this.username = username.value; });
        this.populate_game_list();
    }

    async populate_game_list() {
        // Populate game list
        await this.fetchGames();
        const gameList = document.getElementById('game-list');
        gameList.innerHTML = ''; // Clear any existing games
        for (const game of this.games) {
            if (game.players.length < 2) {
                const listItem = document.createElement('li');
                listItem.textContent = `${game.name} (Players: ${game.players.length}/2)`;
                listItem.addEventListener('click', () => this.select_game(game.id, listItem));
                gameList.appendChild(listItem);
            }
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

    async create_game(event) {
        event.preventDefault();
        const gameName = this.game_name.value;
        try {
            const response = await fetch('http://localhost:8000/lobby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameName })
            });
            const result = await response.json();
            this.game = result.game; // Access the game property
            this.games.push(this.game);
            await this.populate_game_list(); // Reload the game list
    
            // Join the newly created game
            await this.join_game(this.game.id);
        } catch (error) {
            console.error('Error creating game:', error);
        }
    }

    async join_game(gameId) {
        const username = this.username;
        const secret = this.player.secret; // Use this.player.secret
        try {
            const response = await fetch('http://localhost:8000/games/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, gameId , secret})
            });
            const game = await response.json();
            if (game.host) {
                if (game.host.secret === this.player.secret) {
                    this.player.host = true;
                }
            }
            if (game.client) {
                if (game.client.secret === this.player.secret) {
                    this.player.client = true;
                }
            }
            this.player.gameID = game.gameId;
            window.location.href = '/Page Scripts/Html/Chess.html'; // Corrected path
        } catch (error) {
            console.error('Error joining game:', error);
        }
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