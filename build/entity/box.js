import { Body } from "./body.js";
import { Entity } from "./entity.js";
class Box extends Entity {
    constructor(x, y, width, height) {
        super(new Body(x, y, width, height));
        this.update = () => {
            this.body.update();
            this.x = this.body.getX();
            this.y = this.body.getY();
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
export { Box };
