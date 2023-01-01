import { State } from "./state.js";
import { Box } from "../entity/box.js";
import { PetEntity } from "../entity/petentity.js";
class GameState extends State {
    constructor(game) {
        super(game);
        this.toys = [];
        this.food = [];
        this.petEntity = [];
        this.entities = [this.petEntity, this.toys, this.food];
        this.heldEntity = null;
        this.mouse = {
            pressed: false,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0
        };
        this.init = () => {
            this.toys.push(new Box(500, 300, 50, 50));
            this.toys.push(new Box(700, 300, 100, 100));
            this.petEntity.push(new PetEntity(this.pet));
        };
        this.animate = (ctx) => {
            this.entities.flat().forEach((entity, index) => {
                for (let i = index + 1; i < this.entities.flat().length; i++) {
                    if (entity.detectCollision(this.entities.flat()[i])) {
                        console.log("Collision detected");
                    }
                }
                entity.update();
                entity.boundaryCollision(this.width, this.height);
                entity.draw(ctx);
            });
        };
        this.mouseDown = (e) => {
            this.mouse.pressed = true;
            for (let entity of this.entities.flat().reverse()) {
                if (entity.inside(this.mouse.x, this.mouse.y)) {
                    entity.hold();
                    this.heldEntity = entity;
                    break;
                }
            }
        };
        this.mouseUp = (e) => {
            var _a;
            this.mouse.pressed = false;
            (_a = this.heldEntity) === null || _a === void 0 ? void 0 : _a.release(this.mouse.dx, this.mouse.dy);
            this.heldEntity = null;
        };
        this.mouseMove = (e) => {
            let newX = e.offsetX;
            let newY = e.offsetY;
            this.mouse.dx = newX - this.mouse.x;
            this.mouse.dy = newY - this.mouse.y;
            this.mouse.x = newX;
            this.mouse.y = newY;
            if (this.heldEntity != null) {
                this.heldEntity.moveTo(this.mouse.x, this.mouse.y);
            }
            else {
                for (let entity of this.entities.flat().reverse()) {
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
            var _a;
            this.mouse.pressed = false;
            (_a = this.heldEntity) === null || _a === void 0 ? void 0 : _a.release(0, 0);
            this.heldEntity = null;
        };
        this.pause = () => { };
        this.resume = () => { };
        this.width = game.canvas.width;
        this.height = game.canvas.height;
        this.init();
    }
}
export { GameState };
