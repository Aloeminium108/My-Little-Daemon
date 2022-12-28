import { State } from "./state.js";
import { Ball } from "./ball.js";
class GameState extends State {
    constructor(game) {
        super(game);
        this.entities = [];
        this.heldEntity = null;
        this.mouse = {
            pressed: false,
            x: 0,
            y: 0
        };
        this.init = () => {
            this.entities.push(new Ball(100, 500, 300));
            this.entities.push(new Ball(30, 400, 300));
            this.entities.push(new Ball(50, 300, 300));
        };
        this.animate = (ctx) => {
            this.entities.forEach((entity) => {
                entity.update();
                entity.boundaryCollision(this.width, this.height);
                entity.draw(ctx);
            });
        };
        this.mouseDown = (e) => {
            this.mouse.pressed = true;
            for (let entity of this.entities) {
                if (entity.inside(this.mouse.x, this.mouse.y)) {
                    entity.hold();
                    this.heldEntity = entity;
                    break;
                }
            }
        };
        this.mouseUp = (e) => {
            this.mouse.pressed = false;
            this.entities.forEach((entity) => {
                if (entity.held) {
                    entity.moveTo(this.mouse.x, this.mouse.y);
                }
                entity.release();
            });
            this.heldEntity = null;
        };
        this.mouseMove = (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            if (this.heldEntity != null) {
                this.heldEntity.moveTo(this.mouse.x, this.mouse.y);
            }
            else {
                for (let entity of this.entities) {
                    if (entity.inside(this.mouse.x, this.mouse.y)) {
                        this.game.canvas.style.cursor = 'grab';
                        break;
                    }
                    else {
                        this.game.canvas.style.cursor = 'default';
                    }
                }
            }
        };
        this.mouseLeave = (e) => {
            this.mouse.pressed = false;
            this.entities.forEach((entity) => {
                entity.release();
            });
            this.heldEntity = null;
        };
        this.width = game.canvas.width;
        this.height = game.canvas.height;
        var mouse = {
            x: 0,
            y: 0,
            pressed: false
        };
        this.init();
    }
}
export { GameState };
