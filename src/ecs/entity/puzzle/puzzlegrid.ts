import { Drawable } from "../../component/drawable.js"
import { Hitbox } from "../../component/hitbox.js"
import { Color, JewelType } from "../../component/jeweltype.js"
import { Position } from "../../component/position.js"
import { Entity } from "../entity.js"
import { Jewel } from "./jewel.js"

class PuzzleGrid extends Entity {
    numRows: number = 8
    numColumns: number = 8

    columns: Array<Array<PuzzleCell>> = []

    groups: Set<Group> = new Set([])

    constructor(x: number, y: number, ) {
        super()

        for (let i = 0; i < this.numColumns; i++) {
            let column = []
            for (let j = 0; j < this.numRows; j++) {
                let puzzleCell = new PuzzleCell(i, j, x + (i*PuzzleCell.width), y + (j*PuzzleCell.width))
                column.push(puzzleCell)
                this.childEntities.add(puzzleCell)
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
        for (let i = 0; i < this.numColumns; i++) {
            let group = new Group(this.columns[i][0])
            for (let j = 1; j < this.numRows; j++) {
                let currentCell = this.columns[i][j]
                if (group.checkCell(currentCell)) {
                    group.addCell(currentCell)
                } else {
                    if (group.set.size >= 3) this.groups.add(group)
                    group = new Group(currentCell)
                }
            }
            if (group.set.size >= 3) this.groups.add(group)
        }
    }

    private checkRows = () => {
        for (let j = 0; j < this.numRows; j++) {
            let group = new Group(this.columns[0][j])
            for (let i = 1; i < this.numColumns; i++) {
                let currentCell = this.columns[i][j]
                if (group.checkCell(currentCell)) {
                    group.addCell(currentCell)
                } else {
                    if (group.set.size >= 3) this.groups.add(group)
                    group = new Group(currentCell)
                }
            }
            if (group.set.size >= 3) this.groups.add(group)
        }
    }

    // private checkColumns = () => {
    //     this.columns.forEach((column) => {
    //         let currentCell = column[0]
    //         let group: Group = { set: [currentCell], color: currentCell.getJewelColor() }
    //         for (let i = 1; i < this.numRows; i++) {
    //             currentCell = column[i]
    //             if (currentCell.jewel.getComponent(JewelType).color === group.color) {
    //                 group.set.push(currentCell)
    //                 if (i != this.numRows - 1) continue
    //             }
    //             if (group.set.length >= 3) this.groups.push(group)
    //             group = { set: [currentCell], color: currentCell.getJewelColor()}
    //         }
    //     })
    // }
    // private checkRows = () => {
    //     for (let r = 0; r < this.numRows; r++) {
    //         let currentCell = this.columns[0][r]
    //         let group: Group = { set: [currentCell], color: currentCell.getJewelColor() }
    //         for (let i = 0; i < this.numColumns; i++) {
    //             currentCell = this.columns[i][r]
    //             if (currentCell.jewel.getComponent(JewelType).color === group.color) {
    //                 group.set.push(currentCell)
    //                 if (i != this.numColumns - 1) continue
    //             }
    //             if (group.set.length >= 3) this.groups.push(group)
    //             group = { set: [currentCell], color: currentCell.getJewelColor()}
    //         }
    //     }
    // }

}

class PuzzleCell extends Entity {
    jewel: Jewel

    static padding = 5

    static width = 40 + (PuzzleCell.padding * 2)

    activated: boolean = false

    constructor(public i: number, public j: number, x: number, y: number) {
        super()

        let position = new Position(x, y)
        this.addComponent(new Hitbox(position, PuzzleCell.width, PuzzleCell.width))
        this.addComponent(new Drawable((ctx) => {
            if (this.activated) {
                ctx.fillStyle = 'green'
                ctx.fillRect(position.x, position.y, PuzzleCell.width, PuzzleCell.width)
            }
        }))

        let jewel = new Jewel(x + PuzzleCell.padding, y + PuzzleCell.padding, new JewelType())
        this.jewel = jewel
        this.childEntities.add(jewel)
    }

    getJewelColor = () => {
        return this.jewel.getComponent(JewelType).color
    }
}

class Group {
    public set = new Set<PuzzleCell>()
    private color: Color | null

    constructor(cell: PuzzleCell) {
        this.set.add(cell)
        this.color = cell.getJewelColor()
    }

    checkCell = (cell: PuzzleCell) => {
        return cell.getJewelColor() === this.color
    }

    addCell = (cell: PuzzleCell) => {
        this.set.add(cell)
    }

}

export { PuzzleGrid }