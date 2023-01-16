class LoadingState {
    constructor(game) {
        this.update = (interval) => {
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        };
        this.game = game;
        this.pet = game.pet;
        this.ctx = game.ctx;
    }
    init() { }
    pause() { }
    resume() { }
}
export { LoadingState };
