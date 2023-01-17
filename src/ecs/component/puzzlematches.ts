import { PuzzleCell } from "../entity/puzzle/puzzlegrid.js";
import { Component } from "./component.js";
import { GemSlot } from "./gemslot.js";
import { Color } from "./jeweltype.js";

class PuzzleMatches extends Component {
    public groups: Set<Group> = new Set()
}

class Group {
    public set = new Set<GemSlot>()
    public color: Color | null = null

    constructor(cell: GemSlot | null = null) {
        if (cell === null) return
        this.set.add(cell)
        this.color = cell.getJewelColor()
    }

    checkCell = (cell: GemSlot) => {
        if (cell.jewel === null) return false
        return cell.getJewelColor() === this.color
    }

    addCell = (cell: GemSlot) => {
        this.set.add(cell)
        if (this.color === null) this.color = cell.getJewelColor()
    }

}

export {PuzzleMatches, Group}