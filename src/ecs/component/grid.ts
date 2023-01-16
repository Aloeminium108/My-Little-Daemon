import { Entity } from "../entity/entity.js";
import { PuzzleCell } from "../entity/puzzle/puzzlegrid.js";
import { Component } from "./component.js";
import { GemSlot } from "./gemslot.js";

class Grid extends Component {

    constructor(
        public columns: Array<Array<GemSlot>>, 
        public numRows: number, 
        public numColumns: number
        ) {
        super()
    }

}

export {Grid}