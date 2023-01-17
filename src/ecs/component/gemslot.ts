import { Jewel } from "../entity/puzzle/jewel.js";
import { PuzzleCell } from "../entity/puzzle/puzzlegrid.js";
import { Component } from "./component.js";
import { JewelType } from "./jeweltype.js";
 
class GemSlot extends Component {

    public activated: boolean = false

    public open: boolean = false

    public i: number
    public j: number

    public x: number
    public y: number
    public padding: number

    constructor(public jewel: Jewel | null, puzzleCell: PuzzleCell){
        super()
        this.i = puzzleCell.i
        this.j = puzzleCell.j
        this.x = puzzleCell.x
        this.y = puzzleCell.y
        this.padding = PuzzleCell.padding
    }

    public getJewelColor = () => {
        return this.jewel?.getComponent(JewelType).color ?? null
    }



}

export {GemSlot}