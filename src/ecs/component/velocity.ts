import { Component } from "./component.js";

class Velocity extends Component {
    constructor(public dx: number, public dy: number) {
        super()
    }

    hold = () => {
        this.dx = 0
        this.dy = 0
    }

    dxInvert = () => {
        this.dx *= -1
    }

    dyInvert = () => {
        this.dy *= -1
    }

}

export {Velocity}