import { Drawable } from "../../component/drawable.js"
import { GemSlot } from "../../component/gemslot.js"
import { Grid } from "../../component/grid.js"
import { Hitbox } from "../../component/hitbox.js"
import { Color, JewelType } from "../../component/jeweltype.js"
import { Position } from "../../component/position.js"
import { Sprite } from "../../component/sprite.js"
import { Entity } from "../entity.js"
import { Jewel } from "./jewel.js"

class PuzzleGrid extends Entity {
    numRows: number = 8
    numColumns: number = 8

    columns: Array<Array<PuzzleCell>> = []

    groups: Set<Group> = new Set([])

    constructor(x: number, y: number, ) {
        super()

        this.addComponent(new Grid())

        for (let i = 0; i < this.numColumns; i++) {
            let column = []
            for (let j = 0; j < this.numRows; j++) {
                let puzzleCell = new PuzzleCell(i, j, x + (i*PuzzleCell.width), y + (j*PuzzleCell.width))
                column.push(puzzleCell)
                this.childEntities.add(puzzleCell)
            }
            this.columns.push(column)
        }

        this.checkColumns()
        this.checkRows()

        while (this.groups.size > 0) {

            console.log(this.columns
                .map(column => column.map(cell => cell.jewel.getComponent(JewelType).color))
            )

            console.log("Randomizing jewels")

            this.groups.forEach(group => {
                group.set.forEach(async cell => {
                    cell.jewel.getComponent(JewelType).randomizeColor(group.color)
                })
            })

            this.groups.clear()

            this.checkColumns()
            this.checkRows()
        } 

        console.log("FINISHED RANDOMIZING, FINAL CONFIGURATION:")
        console.log(this.columns
            .map(column => column.map(cell => cell.jewel.getComponent(JewelType).color))
        )

        this.columns.forEach((column) => {
            column.forEach(cell => {
                cell.jewel.getComponent(Sprite)
                .updateSprite(
                    Jewel.getImageSrc(cell.jewel.getComponent(JewelType))
                )
            })
        })

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

        this.addComponent(new GemSlot(jewel))

        this.childEntities.add(jewel)
    }

    getJewelColor = () => {
        return this.jewel.getComponent(JewelType).color
    }
}

class Group {
    public set = new Set<PuzzleCell>()
    public color: Color | null

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