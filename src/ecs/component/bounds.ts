import { Component } from "./component.js";

class Bounds extends Component {
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