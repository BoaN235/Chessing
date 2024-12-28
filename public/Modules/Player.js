export const COLORS = {
    WHITE: 'w',
    BLACK: 'b'
};

export class Player {
    constructor() {
        if (Player.instance) {
            return Player.instance;
        }
        this.username = ''; // Initialize username as an empty string
        for (let i = 0; i < 8; i++) {
            const randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
            this.username += randomNumber.toString();
        }
        this.color = COLORS.WHITE; // Default color
        Player.instance = this;
        this.host = false;
        this.client = false;
        this.gameID = 0;
        this.secret = '';
        for (let i = 0; i < 64; i++) {
            const randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
            this.secret += randomNumber.toString();
        }
    }

}