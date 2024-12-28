class Game {
  constructor(Game) {
      this.id = Game.id;
      this.players = Game.players;
  }

  assignColors() {
      if (this.players.length === 2) {
          const colors = ['w', 'b'];
          this.players[0].color = colors.splice(Math.floor(Math.random() * colors.length), 1)[0];
          this.players[1].color = colors[0];
          return this.players.map(player => player.color);
      }
      return [];
  }

  addPlayer(player) {
      this.players.push(player);
  }

  start() {
      const colored_players = this.assignColors();
      return colored_players;
  }
}
module.exports = Game;