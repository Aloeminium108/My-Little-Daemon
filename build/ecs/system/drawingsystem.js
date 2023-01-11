import { Sprite } from "../component/sprite.js";
import { Position } from "../component/position.js";
import { OrderedSystem } from "./system.js";
class DrawingSystem extends OrderedSystem {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Sprite, Position]);
        this.orderingComponent = Sprite;
        this.update = (interval) => { };
        this.animate = (ctx) => {
            this.entities.forEach(entity => {
                entity.getComponent(Sprite).draw(ctx);
            });
        };
    }
}
export { DrawingSystem };
