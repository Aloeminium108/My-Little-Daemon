import { Component } from "./component.js";
import { Hitbox } from "./hitbox.js";
import { Velocity } from "./velocity.js";

class CollisionBody extends Component {
    constructor(
        private hitbox: Hitbox,
        private velocity: Velocity,
        public mass: number = 1,
        public elasticity: number = 1, 
        public immovable: boolean = false,
        public corporeal: boolean = true
        ) {
        super()
    }

    public get width() {
        return this.hitbox.width
    }

    public get height() {
        return this.hitbox.height
    }

    public get x() {
        return this.hitbox.x
    }

    public get y() {
        return this.hitbox.y
    }

    public set x(x: number) {
        this.hitbox.x = x
    }

    public set y(y: number) {
        this.hitbox.y = y
    }

    public get dx() {
        return this.velocity.dx
    }

    public get dy() {
        return this.velocity.dy
    }

    public set dx(dx: number) {
        this.velocity.dx = dx
    }

    public set dy(dy: number) {
        this.velocity.dy = dy
    }

    public get center() {
        return this.hitbox.center
    }

    impulse = (dx: number, dy: number) => {
        this.dx += dx
        this.dy += dy
    }

}

export {CollisionBody}