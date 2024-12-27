import { Lobby } from '../../Modules/Lobby.js';

document.addEventListener('DOMContentLoaded', () => {
    const lobby = new Lobby();
    lobby.load();
});