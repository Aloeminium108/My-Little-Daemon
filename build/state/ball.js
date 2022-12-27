import { Entity } from "../entity/entity.js";
class Ball extends Entity {
    constructor(radius, x, y) {
        super(radius, x, y);
    }
    draw(ctx) {
        const { x, y, radius } = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
Ball.vCap = 50;
Ball.friction = 0.99;
Ball.gravity = 2;
export { Ball };
