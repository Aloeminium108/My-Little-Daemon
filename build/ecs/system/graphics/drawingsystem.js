import { Drawable } from "../../component/graphics/drawable.js";
import { UnorderedSystem } from "../system.js";
class DrawingSystem extends UnorderedSystem {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.componentsRequired = new Set([Drawable]);
        this.update = (interval) => {
            this.entities.forEach(entity => {
                entity.getComponent(Drawable).draw(this.ctx);
            });
        };
    }
}
export { DrawingSystem };
