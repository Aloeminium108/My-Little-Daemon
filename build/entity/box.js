import { Body } from "./body.js";
import { Entity } from "./entity.js";
class Box extends Entity {
    constructor(x, y, width, height) {
        super(new Body(x, y, width, height));
    }
    draw(ctx) {
        ctx.fillRect(this.body.x, this.body.y, this.body.width, this.body.height);
    }
}
export { Box };
