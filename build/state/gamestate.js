import { State } from "./state.js";
import { Box } from "../entity/box.js";
import { Pet } from "../entity/pet.js";
class GameState extends State {
    constructor(game) {
        super(game);
        this.toys = [];
        this.pet = [];
        this.entities = [this.toys, this.pet];
        this.heldEntity = null;
        this.mouse = {
            pressed: false,
            x: 0,
            y: 0
        };
        this.init = () => {
            this.toys.push(new Box(500, 300, 50, 50));
            this.toys.push(new Box(700, 300, 100, 100));
            this.pet.push(new Pet());
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
            for (let entity of this.entities.flat()) {
                if (entity.inside(this.mouse.x, this.mouse.y)) {
                    entity.hold();
                    this.heldEntity = entity;
                    break;
                }
            }
        };
        this.mouseUp = (e) => {
            this.mouse.pressed = false;
            this.entities.flat().forEach((entity) => {
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
                for (let entity of this.entities.flat()) {
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
            this.entities.flat().forEach((entity) => {
                entity.release();
            });
            this.heldEntity = null;
        };
        this.width = game.canvas.width;
        this.height = game.canvas.height;
        this.init();
    }
}
export { GameState };
