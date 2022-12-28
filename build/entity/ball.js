import { Entity } from "./entity.js";
class Ball extends Entity {
    constructor(x, y, radius) {
        super(x, y, radius * 2, radius * 2);
        this.boundaryCollision = (xBound, yBound) => {
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.dx *= -1;
            }
            else if (this.x + this.radius > xBound) {
                this.x = xBound - this.radius;
                this.dx *= -1;
            }
            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.dy *= -1;
            }
            else if (this.y + this.radius > yBound) {
                this.y = yBound - this.radius;
                this.dy *= -1;
            }
        };
        this.radius = radius;
    }
    draw(ctx) {
        const { x, y, radius } = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    inside(x, y) {
        const xDistance = this.x - x;
        const yDistance = this.y - y;
        const distance = Math.sqrt((Math.pow(xDistance, 2)) + (Math.pow(yDistance, 2)));
        if (distance < this.radius) {
            return true;
        }
        else {
            return false;
        }
    }
    moveTo(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}
export { Ball };
