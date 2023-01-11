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
                entity.getComponent(Sprite).draw(this.ctx);
            });
        };
    }
}
export { DrawingSystem };
