import { Component } from "./component.js";

class Bounds extends Component {
    public onGround = false
    constructor(
        public xLowerBound: number, 
        public xUpperBound: number, 
        public yLowerBound: number,
        public yUpperBound: number,
        public bounciness: number = 1
        ) {
        super()
    }
}

export {Bounds}