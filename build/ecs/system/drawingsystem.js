import { Drawable } from "../component/drawable.js";
import { Position } from "../component/position.js";
import { System } from "./system.js";
class DrawingSystem extends System {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Drawable, Position]);
        this.update = (interval) => { };
        this.animate = (ctx) => {
            this.entities.forEach(entity => {
                entity.getComponent(Drawable).draw(ctx);
            });
        };
    }
}
export { DrawingSystem };
