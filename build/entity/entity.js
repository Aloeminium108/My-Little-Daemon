class Entity {
    constructor(radius, x, y) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.held = false;
    }
    moveTo(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    hold() {
        this.held = true;
        this.dx = 0;
        this.dy = 0;
    }
    release() {
        this.held = false;
    }
    update() {
        if (this.dx > Entity.vCap)
            this.dx = Entity.vCap;
        if (this.dy > Entity.vCap)
            this.dy = Entity.vCap;
        if (this.dx < -Entity.vCap)
            this.dx = -Entity.vCap;
        if (this.dy < -Entity.vCap)
            this.dy = -Entity.vCap;
        if (!this.held) {
            this.dy += Entity.gravity;
        }
        this.dx = Math.floor(Entity.friction * this.dx);
        this.dy = Math.floor(Entity.friction * this.dy);
        this.x += this.dx;
        this.y += this.dy;
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
}
Entity.vCap = 50;
Entity.friction = 0.99;
Entity.gravity = 2;
export { Entity };
