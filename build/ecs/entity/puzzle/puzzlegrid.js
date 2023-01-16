import { Drawable } from "../../component/drawable.js";
import { GemSlot } from "../../component/gemslot.js";
import { Grid } from "../../component/grid.js";
import { Hitbox } from "../../component/hitbox.js";
import { JewelType } from "../../component/jeweltype.js";
import { Position } from "../../component/position.js";
import { PuzzleMatches } from "../../component/puzzlematches.js";
import { Entity } from "../entity.js";
import { Jewel } from "./jewel.js";
class PuzzleGrid extends Entity {
    constructor(x, y) {
        super();
        this.numRows = 8;
        this.numColumns = 8;
        this.populatePuzzleCells = (x, y) => {
            let columns = [];
            for (let i = 0; i < this.numColumns; i++) {
                let column = [];
                for (let j = 0; j < this.numRows; j++) {
                    let puzzleCell = new PuzzleCell(i, j, x + (i * PuzzleCell.width), y + (j * PuzzleCell.width));
                    column.push(puzzleCell.getComponent(GemSlot));
                    this.childEntities.add(puzzleCell);
                }
                columns.push(column);
            }
            return columns;
        };
        let columns = this.populatePuzzleCells(x, y);
        this.addComponent(new Grid(columns, this.numRows, this.numColumns));
        this.addComponent(new PuzzleMatches());
    }
}
class PuzzleCell extends Entity {
    constructor(i, j, x, y) {
        super();
        this.i = i;
        this.j = j;
        let position = new Position(x, y);
        this.addComponent(new Hitbox(position, PuzzleCell.width, PuzzleCell.width));
        this.addComponent(new Drawable((ctx) => {
            if (this.getComponent(GemSlot).activated) {
                ctx.fillStyle = 'green';
                ctx.fillRect(position.x, position.y, PuzzleCell.width, PuzzleCell.width);
            }
        }));
        let jewel = new Jewel(x + PuzzleCell.padding, y + PuzzleCell.padding, new JewelType());
        this.addComponent(new GemSlot(jewel, x + PuzzleCell.padding, y + PuzzleCell.padding));
        this.childEntities.add(jewel);
    }
}
PuzzleCell.padding = 5;
PuzzleCell.width = 40 + (PuzzleCell.padding * 2);
export { PuzzleGrid, PuzzleCell };
