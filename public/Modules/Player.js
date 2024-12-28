export class Player {
    constructor() {
        if (Player.instance) {
            return Player.instance;
        }
        this.username = '';
        this.color = 'w'; // Default color
        Player.instance = this;
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