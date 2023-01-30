import { Sprite } from "../../component/graphics/sprite.js";
import { Position } from "../../component/physics/position.js";
import { OrderedSystem } from "../system.js";
class SpriteSystem extends OrderedSystem {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.componentsRequired = new Set([Sprite, Position]);
        this.orderingComponent = Sprite;
        this.update = (interval) => {
            this.entities.forEach(entity => {
                let sprite = entity.getComponent(Sprite).sprite;
                if (sprite === null)
                    return;
                let position = entity.getComponent(Position);
                this.ctx.drawImage(sprite, position.x, position.y);
            });
        };
    }
}
export { SpriteSystem };
