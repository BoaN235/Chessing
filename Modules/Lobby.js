const socket = io();


export class Lobby {
    constructor() {
        this.games = [];
        this.buttonlist = [];
        this.game_name = document.getElementById('game-name');
        this.create_game_button = document.getElementById('create-game');
        this.create_game_button.addEventListener('click', () => this.create_game());

        socket.on('updateGameList', (games) => {
            this.update_game_list(games);
        });
    }

    update_game_list(games) {
        this.games = games;
        const gameList = document.getElementById('game-list');
        gameList.innerHTML = '';
        for (const game of games) {
            const listItem = document.createElement('li');
            listItem.textContent = game;
            gameList.appendChild(listItem);
            const button = document.createElement('button');
            button.textContent = `Join ${game}`;
            document.body.appendChild(button);
            button.addEventListener('click', () => this.join_game(game));
            this.buttonlist.push(button);
        }
    }

    create_game() {
        const game = this.game_name.value;
        socket.emit('createGame', game);
    }

    join_game(game) {
        alert(`Joining ${game}`);
        // Implement game joining logic here
    }
}