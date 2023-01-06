import { PhysicsBody } from "./body/physicsbody.js";
class Food {
    constructor(x, y, nourishmentValue) {
        this.mouseOver = 'grab';
        this.mouseHold = 'grabbing';
        this.getNourishmentValue = () => {
            return this.nourishmentValue;
        };
        this.body = new PhysicsBody(x, y, 50, 50);
        this.nourishmentValue = nourishmentValue;
    }
    getBody() {
        return this.body;
    }
    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.body.getX(), this.body.getY(), 50, 50);
    }
    getMouseOver() {
        return this.mouseOver;
    }
    getMouseHold() {
        return this.mouseHold;
    }
}
export { Food };
