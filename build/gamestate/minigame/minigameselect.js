class MinigameSelectState {
    constructor(game, minigames) {
        this.game = game;
        this.minigames = minigames;
        this.init = () => {
            this.minigames.forEach(minigame => {
                let selectionIcon = createMinigameIcon(minigame);
                this.selectionBox.appendChild(selectionIcon);
                selectionIcon.addEventListener('dblclick', (e) => {
                    this.game.changeState(minigame.constructor);
                });
            });
        };
        this.pause = () => {
            this.menuHTML.style.visibility = 'hidden';
        };
        this.resume = () => {
            this.menuHTML.style.visibility = 'visible';
        };
        this.pet = game.pet;
        this.menuHTML = document.getElementById('minigame-select');
        this.selectionBox = document.querySelector('#minigame-select .selection-box');
        this.init();
    }
}
function createMinigameIcon(minigame) {
    let selectionIcon = document.createElement('div');
    selectionIcon.className = 'selection-icon';
    selectionIcon.innerHTML =
        `<img src="${minigame.iconsrc}" alt="${minigame.name}">
    <h3>${minigame.name}</h3>`;
    return selectionIcon;
}
export { MinigameSelectState };
