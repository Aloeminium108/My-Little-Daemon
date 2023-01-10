import { Component } from "./component.js";
import { Position } from "./position.js";

class Hitbox extends Component {

    constructor(private position: Position, public width: number, public height: number) {
        super()
    }

    inside = (x: number, y: number) => {
        if (x > this.position.x 
            && x < this.position.x + this.width 
            && y > this.position.y
            && y < this.position.y + this.height
        ) {
            return true
        } else {
            return false
        }
    }

    moveCenterTo = (x: number, y: number) => {
        this.position.x = Math.floor(x - this.width/2)
        this.position.y = Math.floor(y - this.height/2)
    }

}

export {Hitbox}