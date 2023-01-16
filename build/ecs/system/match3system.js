import { Gravity } from "../component/gravity.js";
import { Grid } from "../component/grid.js";
import { Group, PuzzleMatches } from "../component/puzzlematches.js";
import { UnorderedSystem } from "./system.js";
class Match3System extends UnorderedSystem {
    constructor(gemGrabSystem) {
        super();
        this.gemGrabSystem = gemGrabSystem;
        this.componentsRequired = new Set([Grid, PuzzleMatches]);
        // These two particularly ugly functions work the same
        // Each row/column is scanned, and groups of consecutive jewels with the same
        // color are built. Once a jewel that does not match the color of the current
        // group being built is encountered, the group is added to PuzzleGrid.groups
        // if the group is large enough, and discarded otherwise.
        this.checkColumns = (grid, puzzlematches) => {
            for (let i = 0; i < grid.numColumns; i++) {
                let group = new Group(grid.columns[i][0]);
                for (let j = 1; j < grid.numRows; j++) {
                    let currentCell = grid.columns[i][j];
                    if (group.checkCell(currentCell)) {
                        group.addCell(currentCell);
                    }
                    else {
                        if (group.set.size >= 3)
                            puzzlematches.groups.add(group);
                        group = new Group(currentCell);
                    }
                }
                if (group.set.size >= 3)
                    puzzlematches.groups.add(group);
            }
        };
        this.checkRows = (grid, puzzlematches) => {
            for (let j = 0; j < grid.numRows; j++) {
                let group = new Group(grid.columns[0][j]);
                for (let i = 1; i < grid.numColumns; i++) {
                    let currentCell = grid.columns[i][j];
                    if (group.checkCell(currentCell)) {
                        group.addCell(currentCell);
                    }
                    else {
                        if (group.set.size >= 3)
                            puzzlematches.groups.add(group);
                        group = new Group(currentCell);
                    }
                }
                if (group.set.size >= 3)
                    puzzlematches.groups.add(group);
            }
        };
    }
    update(interval) {
        this.entities.forEach(entity => {
            let grid = entity.getComponent(Grid);
            let puzzleMatches = entity.getComponent(PuzzleMatches);
            // grid.columns.forEach(column => {
            //     column.forEach(cell => {
            //         cell.getComponent(GemSlot).activated = false
            //     })
            // })
            puzzleMatches.groups.clear();
            this.checkColumns(grid, puzzleMatches);
            this.checkRows(grid, puzzleMatches);
            // puzzleMatches.groups.forEach(group => {
            //     group.set.forEach(cell => {
            //         cell.activated = true
            //     })
            // })
            puzzleMatches.groups.forEach(group => {
                group.set.forEach(cell => {
                    var _a;
                    (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.removeEntity(cell.jewel);
                    cell.jewel = null;
                });
            });
            grid.columns.forEach(this.updateColumn);
        });
    }
    updateColumn(column) {
        var _a;
        let emptyCell = false;
        for (let i = column.length - 1; i >= 0; i--) {
            if (emptyCell) {
                (_a = column[i].jewel) === null || _a === void 0 ? void 0 : _a.addComponent(new Gravity());
                column[i].jewel = null;
                column[i].open = false;
            }
            else if (column[i].jewel === null) {
                console.log("Cell opened");
                emptyCell = true;
                column[i].open = true;
            }
        }
    }
}
export { Match3System };
