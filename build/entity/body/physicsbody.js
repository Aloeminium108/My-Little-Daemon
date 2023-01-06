import { Body } from "./body.js";
class PhysicsBody extends Body {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.dx = 0;
        this.dy = 0;
        this.boundaryCollision = (xBound, yBound) => {
            if (this.x < 0) {
                this.x = 0;
                this.dx *= -PhysicsBody.boundaryElasticity;
            }
            else if (this.x + this.width > xBound) {
                this.x = xBound - this.width;
                this.dx *= -PhysicsBody.boundaryElasticity;
            }
            if (this.y < 0) {
                this.y = 0;
                this.dy *= -PhysicsBody.boundaryElasticity;
            }
            else if (this.y + this.height > yBound) {
                this.y = yBound - this.height;
                this.dy *= -PhysicsBody.floorElasticity;
            }
        };
        this.hold = () => {
            this.held = true;
            this.dx = 0;
            this.dy = 0;
        };
        this.toss = (dx, dy) => {
            this.held = false;
            this.dx = dx;
            this.dy = dy;
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
        this.dx = PhysicsBody.friction * this.dx;
        this.dy = PhysicsBody.friction * this.dy;
        this.x += this.dx;
        this.y += this.dy;
    }
    release(dx, dy) {
        this.toss(dx, dy);
    }
}
PhysicsBody.vCap = 50;
PhysicsBody.friction = 0.99;
PhysicsBody.gravity = 1;
PhysicsBody.boundaryElasticity = 0.8;
PhysicsBody.floorElasticity = 0.7;
export { PhysicsBody };
