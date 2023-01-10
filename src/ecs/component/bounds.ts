import { Component } from "./component.js";

class Bounds extends Component {
    constructor(
        public xLowerBound: number, 
        public xUpperBound: number, 
        public yLowerBound: number,
        public yUpperBound: number 
        ) {
        super()
    }
}

export {Bounds}