export class Title {
    constructor() {
        this.title = "Chess";
        this.titlebuttons = [['Start', this.start_clicked, "loc"]];
    }
    load() {
        for (const [text, handler, loc] of this.titlebuttons) {
            const button = document.createElement('button');
            button.textContent = text;
            document.body.appendChild(button);
            button.addEventListener('click', handler.bind(this));
        }

    }
    start_clicked() {
        console.log('Start clicked');
    }
}