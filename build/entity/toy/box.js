import { PhysicsBody } from "../body/physicsbody.js";
import { Entity } from "../entity.js";
class Box extends Entity {
    constructor(x, y, width, height) {
        super();
        this.mouseOver = 'grab';
        this.mouseGrab = 'grabbing';
        this.drawBody = (ctx) => {
            return (x, y) => {
                ctx.fillRect(x, y, this.width, this.height);
            };
        };
        this.updateSelf = () => {
        };
        this.body = new PhysicsBody(x, y, width, height);
        this.width = width;
        this.height = height;
    }
    release(dx, dy) {
        this.body.toss(dx, dy);
    }
}
export { Box };
