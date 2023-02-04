import { Component } from "../component.js";
class MouseComponent2 extends Component {
    constructor() {
        super(...arguments);
        this.pressed = false;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.move = (e) => {
            let newX = e.offsetX;
            let newY = e.offsetY;
            this.dx = newX - this.x;
            this.dy = newY - this.y;
            this.x = newX;
            this.y = newY;
        };
        this.update = (gameEvent) => {
            this.move(gameEvent.e);
            if (gameEvent.pressed === null)
                return;
            this.pressed = gameEvent.pressed;
        };
    }
}
export { MouseComponent2 as MouseComponent2 };
