class Entity {
    constructor(x, y, width, height) {
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
        this.width = width;
        this.height = height;
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
        if (x > this.x
            && x < this.x + this.width
            && y > this.y
            && y < this.y + this.height) {
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
