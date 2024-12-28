
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
        this.secret = this.generateRandomUsername();
        this.host = false;
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
}