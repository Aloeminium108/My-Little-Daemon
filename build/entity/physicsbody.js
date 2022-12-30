import { Body } from "./body.js";
class PhysicsBody extends Body {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.dx = 0;
        this.dy = 0;
        this.boundaryCollision = (xBound, yBound) => {
            if (this.x < 0) {
                this.x = 0;
                this.dx *= -1;
            }
            else if (this.x + this.width > xBound) {
                this.x = xBound - this.width;
                this.dx *= -1;
            }
            if (this.y < 0) {
                this.y = 0;
                this.dy *= -1;
            }
            else if (this.y + this.height > yBound) {
                this.y = yBound - this.height;
                this.dy *= -1;
            }
        };
    }
    update() {
        if (this.dx > PhysicsBody.vCap)
            this.dx = PhysicsBody.vCap;
        if (this.dy > PhysicsBody.vCap)
            this.dy = PhysicsBody.vCap;
        if (this.dx < -PhysicsBody.vCap)
            this.dx = -PhysicsBody.vCap;
        if (this.dy < -PhysicsBody.vCap)
            this.dy = -PhysicsBody.vCap;
        if (!this.held) {
            this.dy += PhysicsBody.gravity;
        }
        this.dx = Math.floor(PhysicsBody.friction * this.dx);
        this.dy = Math.floor(PhysicsBody.friction * this.dy);
        this.x += this.dx;
        this.y += this.dy;
    }
    hold() {
        this.held = true;
        this.dx = 0;
        this.dy = 0;
    }
}
PhysicsBody.vCap = 50;
PhysicsBody.friction = 0.99;
PhysicsBody.gravity = 2;
export { PhysicsBody };
