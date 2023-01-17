import { Drawable } from "../../component/drawable.js"
import { GemSlot } from "../../component/gemslot.js"
import { Grid } from "../../component/grid.js"
import { Hitbox } from "../../component/hitbox.js"
import { Color, JewelType } from "../../component/jeweltype.js"
import { Position } from "../../component/position.js"
import { PuzzleMatches } from "../../component/puzzlematches.js"
import { Sprite } from "../../component/sprite.js"
import { Entity } from "../entity.js"
import { Jewel } from "./jewel.js"

class PuzzleGrid extends Entity {
    numRows: number = 8
    numColumns: number = 8

    constructor(x: number, y: number, ) {
        super()

        let columns = this.populatePuzzleCells(x, y)

        this.addComponent(new Grid(columns, this.numRows, this.numColumns))
        this.addComponent(new PuzzleMatches())

    }

    private populatePuzzleCells = (x: number, y: number) => {
        let columns: Array<Array<GemSlot>> = []
        for (let i = 0; i < this.numColumns; i++) {
            let column = []
            for (let j = 0; j < this.numRows; j++) {
                let puzzleCell = new PuzzleCell(i, j, x + (i*PuzzleCell.width), y + (j*PuzzleCell.width))
                column.push(puzzleCell.getComponent(GemSlot))
                this.childEntities.add(puzzleCell)
            }
            columns.push(column)
        }
        return columns
    }

}

class PuzzleCell extends Entity {

    static padding = 5

    static width = 40 + (PuzzleCell.padding * 2)

    constructor(public i: number, public j: number, public x: number, public y: number) {
        super()

        let position = new Position(x, y)
        this.addComponent(new Hitbox(position, PuzzleCell.width, PuzzleCell.width))
        this.addComponent(new Drawable(ctx => {
            let gemSlot = this.getComponent(GemSlot)
            if (gemSlot.open && gemSlot.jewel !== null) {
                ctx.fillStyle = 'red'
            } else if (gemSlot.open) {
                ctx.fillStyle = 'green'
            } else if (gemSlot.jewel === null) {
                ctx.fillStyle = 'blue'
            } else {
                ctx.fillStyle = 'white'
            }
            ctx.fillRect(x, y, PuzzleCell.width, PuzzleCell.width)
        }))

        let jewel = new Jewel(x + PuzzleCell.padding, y + PuzzleCell.padding, new JewelType())

        this.addComponent(new GemSlot(jewel, this))

        this.childEntities.add(jewel)
    }

}

export { PuzzleGrid, PuzzleCell}