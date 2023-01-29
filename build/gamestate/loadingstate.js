class LoadingState {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.update = (interval) => {
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect(0, 0, this.game.mainCanvas.width, this.game.mainCanvas.height);
        };
        this.game = game;
        this.pet = game.pet;
    }
    init() { }
    pause() { }
    resume() { }
}
export { LoadingState };
