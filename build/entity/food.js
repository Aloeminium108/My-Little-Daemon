import { Entity } from "./entity.js";
import { PhysicsBody } from "./body/physicsbody.js";
class Food extends Entity {
    constructor(x, y, nourishmentValue) {
        super();
        this.mouseOver = 'grab';
        this.mouseGrab = 'grabbing';
        this.drawBody = (ctx) => {
            return (x, y) => {
                ctx.fillStyle = 'red';
                ctx.fillRect(x, y, 50, 50);
                ctx.fillStyle = 'black';
            };
        };
        this.updateSelf = () => {
        };
        this.release = (dx, dy) => {
            this.body.toss(dx, dy);
        };
        this.getNourishmentValue = () => {
            return this.nourishmentValue;
        };
        this.body = new PhysicsBody(x, y, 50, 50);
        this.nourishmentValue = nourishmentValue;
    }
}
export { Food };
