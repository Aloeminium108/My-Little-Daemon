import { Component } from "./component.js";

class Position extends Component {

    constructor(public x: number, public y: number) {
        super()
    }

    moveTo = (x: number, y: number) => {
        this.x = x
        this.y = y
    }

}

export {Position}