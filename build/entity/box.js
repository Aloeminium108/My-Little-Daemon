import { Body } from "./body.js";
import { Entity } from "./entity.js";
class Box extends Entity {
    constructor(x, y, width, height) {
        super(new Body(x, y, width, height));
        this.drawBody = (ctx) => {
            return (x, y) => {
                ctx.fillRect(x, y, this.width, this.height);
            };
        };
        this.updateSelf = () => {
        };
        this.width = width;
        this.height = height;
    }
}
export { Box };
