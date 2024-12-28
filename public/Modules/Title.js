export class Title {
    constructor() {
        this.title = "Chess";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
        this.buttonlist = [];
    }
    load() {
        for (const [text, handler, loc] of this.titlebuttons) {
            const button = document.createElement('button');
            button.textContent = text;
            document.body.appendChild(button);
            button.addEventListener('click', handler.bind(this));
            this.buttonlist.push(button);
        }

    }
    start_clicked() {
        for (const button of this.buttonlist) {
            button.remove();
        }
        this.buttonlist = [];
        window.location.href = 'Page Scripts/Html/Lobby.html';
    }
}