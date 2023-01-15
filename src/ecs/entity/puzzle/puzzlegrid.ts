import { Entity } from "../entity.js"
import { Color, Jewel } from "./jewel.js"

class PuzzleGrid extends Entity {
    numRows: number = 8
    numColumns: number = 8

    x: number
    y: number

    columns: Array<Array<PuzzleCell>> = []

    groups: Array<Group> = []

    constructor(x: number, y: number) {
        super()

        

        this.x = x
        this.y = y

        for (let i = 0; i < this.numColumns; i++) {
            let column = []
            for (let j = 0; j < this.numRows; j++) {
                column.push(new PuzzleCell(this.x + (i*PuzzleCell.width), this.y + (j*PuzzleCell.width)))
            }
            this.columns.push(column)
        }

        this.checkForMatches()

        // Testing to make sure checkForMatches() works properly
        this.groups.forEach((group) => {
            group.set.forEach((cell) => {
                cell.activated = true
            })
        })
    }

    // draw = (ctx: CanvasRenderingContext2D) => {
    //     this.columns.forEach((column, i) => {
    //         column.forEach((cell, j) => {
    //             cell.draw(ctx)
    //         })
    //     })
    // }

    checkForMatches = () => {
        this.checkColumns()
        this.checkRows()
    }

    // These two particularly ugly functions work the same
    // Each row/column is scanned, and groups of consecutive jewels with the same
    // color are built. Once a jewel that does not match the color of the current
    // group being built is encountered, the group is added to PuzzleGrid.groups
    // if the group is large enough, and discarded otherwise.
    private checkColumns = () => {
        this.columns.forEach((column) => {
            let currentCell = column[0]
            let group: Group = { set: [currentCell], color: currentCell.getJewelColor() }
            for (let i = 1; i < this.numRows; i++) {
                currentCell = column[i]
                if (currentCell.jewel.type.color === group.color) {
                    group.set.push(currentCell)
                    if (i != this.numRows - 1) continue
                }
                if (group.set.length >= 3) this.groups.push(group)
                group = { set: [currentCell], color: currentCell.getJewelColor()}
            }
        })
    }
    private checkRows = () => {
        for (let r = 0; r < this.numRows; r++) {
            let currentCell = this.columns[0][r]
            let group: Group = { set: [currentCell], color: currentCell.getJewelColor() }
            for (let i = 0; i < this.numColumns; i++) {
                currentCell = this.columns[i][r]
                if (currentCell.jewel.type.color === group.color) {
                    group.set.push(currentCell)
                    if (i != this.numColumns - 1) continue
                }
                if (group.set.length >= 3) this.groups.push(group)
                group = { set: [currentCell], color: currentCell.getJewelColor()}
            }
        }
    }

}

class PuzzleCell {
    jewel: Jewel

    x: number
    y: number

    static padding = 5

    static width = Jewel.width + (PuzzleCell.padding * 2)

    activated: boolean = false

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.jewel = new Jewel(x + PuzzleCell.padding, y + PuzzleCell.padding)
    }

    // draw = (ctx: CanvasRenderingContext2D) => {
    //     ctx.fillStyle = this.activated ? '#A6FFC9' : '#000000'
    //     ctx.fillRect(this.x, this.y, PuzzleCell.width, PuzzleCell.width)
    //     this.jewel.draw(ctx)
    // }

    getJewelColor = () => {
        return this.jewel.type.color
    }
}

type Group = {
    set: Array<PuzzleCell>
    color: Color
}

export { PuzzleGrid }