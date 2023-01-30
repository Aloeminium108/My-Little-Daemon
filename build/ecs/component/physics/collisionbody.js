import { Component } from "../component.js";
class CollisionBody extends Component {
    constructor(hitbox, velocity, mass = 1, elasticity = 1, immovable = false, corporeal = true) {
        super();
        this.hitbox = hitbox;
        this.velocity = velocity;
        this.mass = mass;
        this.elasticity = elasticity;
        this.immovable = immovable;
        this.corporeal = corporeal;
        this.onGround = false;
        this.impulse = (dx, dy) => {
            this.dx += dx;
            this.dy += dy;
        };
    }
    get width() {
        return this.hitbox.width;
    }
    get height() {
        return this.hitbox.height;
    }
    get x() {
        return this.hitbox.x;
    }
    get y() {
        return this.hitbox.y;
    }
    set x(x) {
        this.hitbox.x = x;
    }
    set y(y) {
        this.hitbox.y = y;
    }
    get dx() {
        return this.velocity.dx;
    }
    get dy() {
        return this.velocity.dy;
    }
    set dx(dx) {
        this.velocity.dx = dx;
    }
    set dy(dy) {
        this.velocity.dy = dy;
    }
    get center() {
        return this.hitbox.center;
    }
}
export { CollisionBody };
