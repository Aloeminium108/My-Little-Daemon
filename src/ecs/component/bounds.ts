import { Component } from "./component.js";

class Bounds extends Component {
    public onGround: boolean = false
    public offScreen: boolean = false

    constructor(
        public xLowerBound: number, 
        public xUpperBound: number, 
        public yLowerBound: number,
        public yUpperBound: number,
        public bouncy: boolean = false,
        public ceiling: boolean = false
        ) {
        super()
    }
}

export {Bounds}