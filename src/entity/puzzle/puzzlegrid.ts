import { Color, Jewel } from "./jewel.js"

class PuzzleGrid {
    numRows: number = 8
    numColumns: number = 8

    x: number
    y: number

    columns: Array<Array<PuzzleCell>> = []

    groups: Array<Group> = []

    constructor(x: number, y: number) {
        this.x = x
        this.y = y

        for (let i = 0; i < this.numColumns; i++) {
            let column = []
            for (let j = 0; j < this.numRows; j++) {
                column.push(new PuzzleCell(this.x + (i*PuzzleCell.width), this.y + (j*PuzzleCell.width)))
            }
            this.columns.push(column)
        }

        this.checkColumns()

        this.groups.forEach((group) => {
            group.set.forEach((cell) => {
                cell.activated = true
            })
        })
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.columns.forEach((column, i) => {
            column.forEach((cell, j) => {
                cell.draw(ctx)
            })
        })
    }

    checkColumns = () => {
        this.columns.forEach((column) => {
            let currentCell = column[0]
            console.log(currentCell)
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
        this.jewel = new Jewel()
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = this.activated ? '#A6FFC9' : '#000000'
        ctx.fillRect(this.x, this.y, PuzzleCell.width, PuzzleCell.width)
        this.jewel?.drawBody(ctx)(this.x + PuzzleCell.padding, this.y + PuzzleCell.padding)
    }

    getJewelColor = () => {
        return this.jewel.type.color
    }
}

type Group = {
    set: Array<PuzzleCell>
    color: Color
}

export { PuzzleGrid }