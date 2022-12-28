import { Entity } from "./entity.js";
class Box extends Entity {
    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
export { Box };
