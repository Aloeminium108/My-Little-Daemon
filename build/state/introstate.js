import { State } from "./state.js";
class IntroState extends State {
    changeState() { }
    constructor(game) {
        super(game);
    }
    init() { }
    addStateChange(fun) {
        this.changeState = fun;
    }
    animate(ctx) {
        ctx.fillRect(80, 80, 500, 500);
    }
    mouseUp(e) {
    }
    mouseDown(e) {
        this.changeState();
    }
    mouseMove(e) {
    }
    mouseLeave(e) {
    }
}
export { IntroState };
