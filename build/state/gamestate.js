import { State } from "./state.js";
import { Box } from "../entity/toy/box.js";
import { PetEntity } from "../entity/petentity.js";
import { Food } from "../entity/food.js";
import { EntityList } from "../entity/entitylist.js";
import { CollisionHandler } from "../entity/collisionhandler.js";
import { Mouse } from "./mouse.js";
class GameState extends State {
    constructor(game) {
        super(game);
        this.floorHeight = 100;
        this.init = () => {
            this.entityList.addToy(new Box(500, 300, 50, 50));
            this.entityList.addToy(new Box(700, 300, 100, 100));
            this.entityList.addFood(new Food(900, 300, 20));
        };
        this.animate = (ctx) => {
            this.entityList.fullList().forEach((entity) => {
                entity.update();
            });
            this.collisionHandler.handleEntityCollisions();
            this.entityList.fullList().forEach((entity) => {
                entity.draw(ctx);
            });
        };
        this.mouseDown = (e) => {
            this.mouse.pressed = true;
            this.entityList.hold(this.collisionHandler.detectMouseCollisions(this.mouse));
        };
        this.mouseUp = (e) => {
            this.mouse.pressed = false;
            this.entityList.release(this.mouse.dx, this.mouse.dy);
        };
        this.mouseMove = (e) => {
            this.mouse.move(e);
            let heldEntity = this.entityList.getHeldEntity();
            if (heldEntity != null) {
                heldEntity.moveTo(this.mouse.x, this.mouse.y);
                this.game.canvas.style.cursor = heldEntity.getMouseHold();
            }
            else {
                this.mouse.mouseOverEntity(this.collisionHandler.detectMouseCollisions(this.mouse));
            }
        };
        this.mouseLeave = (e) => {
            this.mouse.pressed = false;
            this.entityList.release(0, 0);
        };
        this.pause = () => { };
        this.resume = () => { };
        this.entityList = new EntityList(new PetEntity(this.pet));
        this.width = game.canvas.width;
        this.height = game.canvas.height;
        this.collisionHandler = new CollisionHandler(this.entityList, this.width, this.height - this.floorHeight);
        this.mouse = new Mouse(game.canvas);
        this.init();
    }
}
export { GameState };
