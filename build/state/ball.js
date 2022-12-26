class Ball {
    constructor(radius, x, y) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.held = false;
    }
    draw(ctx) {
        const { x, y, radius } = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
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
        if (this.dx > Ball.vCap)
            this.dx = Ball.vCap;
        if (this.dy > Ball.vCap)
            this.dy = Ball.vCap;
        if (this.dx < -Ball.vCap)
            this.dx = -Ball.vCap;
        if (this.dy < -Ball.vCap)
            this.dy = -Ball.vCap;
        if (!this.held) {
            this.dy += Ball.gravity;
        }
        this.dx = Math.floor(Ball.friction * this.dx);
        this.dy = Math.floor(Ball.friction * this.dy);
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
Ball.vCap = 50;
Ball.friction = 0.99;
Ball.gravity = 2;
export { Ball };
