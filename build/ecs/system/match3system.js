import { Gravity } from "../component/gravity.js";
import { Grid } from "../component/grid.js";
import { JewelType } from "../component/jeweltype.js";
import { Group, PuzzleMatches } from "../component/puzzlematches.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { UnorderedSystem } from "./system.js";
class Match3System extends UnorderedSystem {
    constructor() {
        super();
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
        this.updateColumn = (column) => {
            var _a;
            let emptyCell = false;
            for (let i = column.length - 1; i >= 0; i--) {
                if (emptyCell) {
                    (_a = column[i].jewel) === null || _a === void 0 ? void 0 : _a.addComponent(new Gravity());
                    column[i].jewel = null;
                    column[i].open = false;
                }
                else if (column[i].jewel === null) {
                    emptyCell = true;
                    column[i].open = true;
                }
            }
        };
        this.consolidateGroups = (puzzleMatches) => {
            let map = new Map();
            let groupSet = new Set();
            puzzleMatches.groups.forEach(group => {
                let overlappingGroups = new Set([group]);
                group.set.forEach(cell => {
                    if (map.has(cell)) {
                        overlappingGroups.add(map.get(cell));
                    }
                });
                let combinedGroup = new Group();
                overlappingGroups.forEach(group => {
                    groupSet.delete(group);
                    group.set.forEach(cell => {
                        combinedGroup.addCell(cell);
                    });
                });
                combinedGroup.set.forEach(cell => {
                    map.set(cell, combinedGroup);
                });
                groupSet.add(combinedGroup);
            });
            puzzleMatches.groups = groupSet;
        };
    }
    update(interval) {
        this.entities.forEach(entity => {
            let grid = entity.getComponent(Grid);
            let puzzleMatches = entity.getComponent(PuzzleMatches);
            puzzleMatches.groups.clear();
            this.checkColumns(grid, puzzleMatches);
            this.checkRows(grid, puzzleMatches);
            this.consolidateGroups(puzzleMatches);
            puzzleMatches.groups.forEach(group => {
                if (group.color === null)
                    puzzleMatches.groups.delete(group);
            });
            puzzleMatches.groups.forEach(group => {
                group.set.forEach(cell => {
                    var _a, _b;
                    (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.removeEntity(cell.jewel);
                    cell.jewel = null;
                    let replacementJewel = new Jewel(cell.x + cell.padding, cell.y + cell.padding - 500, new JewelType());
                    replacementJewel.addComponent(new Gravity());
                    (_b = this.ecs) === null || _b === void 0 ? void 0 : _b.addEntity(replacementJewel);
                });
            });
            grid.columns.forEach(this.updateColumn);
        });
    }
}
export { Match3System };
