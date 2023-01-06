import { PhysicsBody } from "../body/physicsbody.js";
class Box {
    constructor(x, y, width, height) {
        this.mouseOver = 'grab';
        this.mouseHold = 'grabbing';
        this.body = new PhysicsBody(x, y, width, height);
        this.width = width;
        this.height = height;
    }
    getBody() {
        return this.body;
    }
    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.body.getX(), this.body.getY(), this.width, this.height);
    }
    getMouseOver() {
        return this.mouseOver;
    }
    getMouseHold() {
        return this.mouseHold;
    }
}
export { Box };
