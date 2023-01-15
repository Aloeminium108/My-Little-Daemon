import { Drawable } from "../../component/drawable.js";
import { Hitbox } from "../../component/hitbox.js";
import { JewelType } from "../../component/jeweltype.js";
import { Position } from "../../component/position.js";
import { Entity } from "../entity.js";
import { Jewel } from "./jewel.js";
class PuzzleGrid extends Entity {
    constructor(x, y) {
        super();
        this.numRows = 8;
        this.numColumns = 8;
        this.columns = [];
        this.groups = new Set([]);
        this.checkForMatches = () => {
            this.checkColumns();
            this.checkRows();
        };
        // These two particularly ugly functions work the same
        // Each row/column is scanned, and groups of consecutive jewels with the same
        // color are built. Once a jewel that does not match the color of the current
        // group being built is encountered, the group is added to PuzzleGrid.groups
        // if the group is large enough, and discarded otherwise.
        this.checkColumns = () => {
            for (let i = 0; i < this.numColumns; i++) {
                let group = new Group(this.columns[i][0]);
                for (let j = 1; j < this.numRows; j++) {
                    let currentCell = this.columns[i][j];
                    if (group.checkCell(currentCell)) {
                        group.addCell(currentCell);
                    }
                    else {
                        if (group.set.size >= 3)
                            this.groups.add(group);
                        group = new Group(currentCell);
                    }
                }
                if (group.set.size >= 3)
                    this.groups.add(group);
            }
        };
        this.checkRows = () => {
            for (let j = 0; j < this.numRows; j++) {
                let group = new Group(this.columns[0][j]);
                for (let i = 1; i < this.numColumns; i++) {
                    let currentCell = this.columns[i][j];
                    if (group.checkCell(currentCell)) {
                        group.addCell(currentCell);
                    }
                    else {
                        if (group.set.size >= 3)
                            this.groups.add(group);
                        group = new Group(currentCell);
                    }
                }
                if (group.set.size >= 3)
                    this.groups.add(group);
            }
        };
        for (let i = 0; i < this.numColumns; i++) {
            let column = [];
            for (let j = 0; j < this.numRows; j++) {
                let puzzleCell = new PuzzleCell(i, j, x + (i * PuzzleCell.width), y + (j * PuzzleCell.width));
                column.push(puzzleCell);
                this.childEntities.add(puzzleCell);
            }
            this.columns.push(column);
        }
        this.checkForMatches();
        // Testing to make sure checkForMatches() works properly
        this.groups.forEach((group) => {
            group.set.forEach((cell) => {
                cell.activated = true;
            });
        });
    }
}
class PuzzleCell extends Entity {
    constructor(i, j, x, y) {
        super();
        this.i = i;
        this.j = j;
        this.activated = false;
        this.getJewelColor = () => {
            return this.jewel.getComponent(JewelType).color;
        };
        let position = new Position(x, y);
        this.addComponent(new Hitbox(position, PuzzleCell.width, PuzzleCell.width));
        this.addComponent(new Drawable((ctx) => {
            if (this.activated) {
                ctx.fillStyle = 'green';
                ctx.fillRect(position.x, position.y, PuzzleCell.width, PuzzleCell.width);
            }
        }));
        let jewel = new Jewel(x + PuzzleCell.padding, y + PuzzleCell.padding, new JewelType());
        this.jewel = jewel;
        this.childEntities.add(jewel);
    }
}
PuzzleCell.padding = 5;
PuzzleCell.width = 40 + (PuzzleCell.padding * 2);
class Group {
    constructor(cell) {
        this.set = new Set();
        this.checkCell = (cell) => {
            return cell.getJewelColor() === this.color;
        };
        this.addCell = (cell) => {
            this.set.add(cell);
        };
        this.set.add(cell);
        this.color = cell.getJewelColor();
    }
}
export { PuzzleGrid };
