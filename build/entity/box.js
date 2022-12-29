import { Entity } from "./entity.js";
class Box extends Entity {
    draw(ctx) {
        ctx.fillRect(this.body.x, this.body.y, this.body.width, this.body.height);
    }
}
export { Box };
