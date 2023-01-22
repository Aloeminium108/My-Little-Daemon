import { Component } from "./component.js";

class Bounds extends Component {
    public onGround: boolean = false
    public offScreen: boolean = false

    constructor(
        public xLowerBound: number, 
        public xUpperBound: number, 
        public yLowerBound: number,
        public yUpperBound: number,
        public bounciness: number = 1,
        public ceiling: boolean = true
        ) {
        super()
    }
}

export {Bounds}