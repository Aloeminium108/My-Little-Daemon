import { Sprite } from "../component/sprite.js";
import { Position } from "../component/position.js";
import { OrderedSystem } from "./system.js";
class DrawingSystem extends OrderedSystem {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.componentsRequired = new Set([Sprite, Position]);
        this.orderingComponent = Sprite;
        this.update = (interval) => {
            this.entities.forEach(entity => {
                let sprite = entity.getComponent(Sprite).sprite;
                let position = entity.getComponent(Position);
                this.ctx.drawImage(sprite, position.x, position.y);
            });
        };
    }
}
export { DrawingSystem };
