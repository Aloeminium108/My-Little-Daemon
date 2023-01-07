import { Jewel } from "./jewel.js";
class PuzzleGrid {
    constructor(x, y) {
        this.numRows = 8;
        this.numColumns = 8;
        this.columns = [];
        this.groups = [];
        this.draw = (ctx) => {
            this.columns.forEach((column, i) => {
                column.forEach((cell, j) => {
                    cell.draw(ctx);
                });
            });
        };
        this.checkForMatches = () => {
            this.checkColumns();
            this.checkRows();
        };
        this.checkColumns = () => {
            this.columns.forEach((column) => {
                let currentCell = column[0];
                let group = { set: [currentCell], color: currentCell.getJewelColor() };
                for (let i = 1; i < this.numRows; i++) {
                    currentCell = column[i];
                    if (currentCell.jewel.type.color === group.color) {
                        group.set.push(currentCell);
                        if (i != this.numRows - 1)
                            continue;
                    }
                    if (group.set.length >= 3)
                        this.groups.push(group);
                    group = { set: [currentCell], color: currentCell.getJewelColor() };
                }
            });
        };
        this.checkRows = () => {
            for (let r = 0; r < this.numRows; r++) {
                let currentCell = this.columns[0][r];
                let group = { set: [currentCell], color: currentCell.getJewelColor() };
                for (let i = 0; i < this.numColumns; i++) {
                    currentCell = this.columns[i][r];
                    if (currentCell.jewel.type.color === group.color) {
                        group.set.push(currentCell);
                        if (i != this.numColumns - 1)
                            continue;
                    }
                    if (group.set.length >= 3)
                        this.groups.push(group);
                    group = { set: [currentCell], color: currentCell.getJewelColor() };
                }
            }
        };
        this.x = x;
        this.y = y;
        for (let i = 0; i < this.numColumns; i++) {
            let column = [];
            for (let j = 0; j < this.numRows; j++) {
                column.push(new PuzzleCell(this.x + (i * PuzzleCell.width), this.y + (j * PuzzleCell.width)));
            }
            this.columns.push(column);
        }
        this.checkForMatches();
        this.groups.forEach((group) => {
            group.set.forEach((cell) => {
                cell.activated = true;
            });
        });
    }
}
class PuzzleCell {
    constructor(x, y) {
        this.activated = false;
        this.draw = (ctx) => {
            ctx.fillStyle = this.activated ? '#A6FFC9' : '#000000';
            ctx.fillRect(this.x, this.y, PuzzleCell.width, PuzzleCell.width);
            this.jewel.draw(ctx);
        };
        this.getJewelColor = () => {
            return this.jewel.type.color;
        };
        this.x = x;
        this.y = y;
        this.jewel = new Jewel(x + PuzzleCell.padding, y + PuzzleCell.padding);
    }
}
PuzzleCell.padding = 5;
PuzzleCell.width = Jewel.width + (PuzzleCell.padding * 2);
export { PuzzleGrid };
