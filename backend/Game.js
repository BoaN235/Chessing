class Game {
    constructor(id, name, players) {
      this.id = id;
      this.name = name;
      this.players = players;
    }
  
    addPlayer(player) {
      this.players.push(player);
    }
  
    // Add other game-related methods here
  }


module.exports = Game;