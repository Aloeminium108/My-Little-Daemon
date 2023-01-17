import { GemSlot } from "../component/gemslot.js";
import { Gravity } from "../component/gravity.js";
import { Grid } from "../component/grid.js";
import { JewelType } from "../component/jeweltype.js";
import { Group, PuzzleMatches } from "../component/puzzlematches.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { PuzzleCell } from "../entity/puzzle/puzzlegrid.js";
import { GemGrabSystem } from "./gemgrabsystem.js";
import { UnorderedSystem } from "./system.js";

class Match3System extends UnorderedSystem {
    public componentsRequired = new Set([Grid, PuzzleMatches])

    constructor() {
        super()
    }

    public update(interval: number): void {

        this.entities.forEach(entity => {

            let grid = entity.getComponent(Grid)
            let puzzleMatches = entity.getComponent(PuzzleMatches)

            puzzleMatches.groups.clear()

            this.checkColumns(grid, puzzleMatches)
            this.checkRows(grid, puzzleMatches)

            this.consolidateGroups(puzzleMatches)

            puzzleMatches.groups.forEach(group => {
                if (group.color === null) puzzleMatches.groups.delete(group)
            })

            puzzleMatches.groups.forEach(group => {
                group.set.forEach(cell => {
                    this.ecs?.removeEntity(cell.jewel)
                    cell.jewel = null

                    let replacementJewel = new Jewel(cell.x + cell.padding, cell.y + cell.padding - 500, new JewelType())
                    replacementJewel.addComponent(new Gravity())
                    this.ecs?.addEntity(replacementJewel)
                })
            })
            
            grid.columns.forEach(this.updateColumn)

        })
    }

    // These two particularly ugly functions work the same
    // Each row/column is scanned, and groups of consecutive jewels with the same
    // color are built. Once a jewel that does not match the color of the current
    // group being built is encountered, the group is added to PuzzleGrid.groups
    // if the group is large enough, and discarded otherwise.
    private checkColumns = (grid: Grid, puzzlematches: PuzzleMatches) => {
        for (let i = 0; i < grid.numColumns; i++) {
            let group = new Group(grid.columns[i][0])
            for (let j = 1; j < grid.numRows; j++) {
                let currentCell = grid.columns[i][j]
                if (group.checkCell(currentCell)) {
                    group.addCell(currentCell)
                } else {
                    if (group.set.size >= 3) puzzlematches.groups.add(group)
                    group = new Group(currentCell)
                }
            }
            if (group.set.size >= 3) puzzlematches.groups.add(group)
        }
    }

    private checkRows = (grid: Grid, puzzlematches: PuzzleMatches) => {
        for (let j = 0; j < grid.numRows; j++) {
            let group = new Group(grid.columns[0][j])
            for (let i = 1; i < grid.numColumns; i++) {
                let currentCell = grid.columns[i][j]
                if (group.checkCell(currentCell)) {
                    group.addCell(currentCell)
                } else {
                    if (group.set.size >= 3) puzzlematches.groups.add(group)
                    group = new Group(currentCell)
                }
            }
            if (group.set.size >= 3) puzzlematches.groups.add(group)
        }
    }

    private updateColumn = (column: Array<GemSlot>) => {
        let emptyCell = false
        for(let i = column.length - 1; i >= 0; i--) {
            if (emptyCell) {
                column[i].jewel?.addComponent(new Gravity())
                column[i].jewel = null
                column[i].open = false
            } else if (column[i].jewel === null) {
                emptyCell = true
                column[i].open = true
            } 
        }
    }

    private consolidateGroups = (puzzleMatches: PuzzleMatches) => {
        let map = new Map<GemSlot, Group>()
        let groupSet = new Set<Group>()

        puzzleMatches.groups.forEach(group => {
            let overlappingGroups = new Set([group])
            group.set.forEach(cell => {
                if (map.has(cell)) {
                    overlappingGroups.add(map.get(cell)!!)
                }
            })
            let combinedGroup = new Group()
            overlappingGroups.forEach(group => {
                groupSet.delete(group)
                group.set.forEach(cell => {
                    combinedGroup.addCell(cell)
                })
            })
            combinedGroup.set.forEach(cell => {
                map.set(cell, combinedGroup)
            })
            groupSet.add(combinedGroup)
        })

        puzzleMatches.groups = groupSet
    }

    
    
}

export {Match3System}