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
        this.checkColumns = () => {
            this.columns.forEach((column) => {
                let currentCell = column[0];
                console.log(currentCell);
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
        this.x = x;
        this.y = y;
        for (let i = 0; i < this.numColumns; i++) {
            let column = [];
            for (let j = 0; j < this.numRows; j++) {
                column.push(new PuzzleCell(this.x + (i * PuzzleCell.width), this.y + (j * PuzzleCell.width)));
            }
            this.columns.push(column);
        }
        this.checkColumns();
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
            var _a;
            ctx.fillStyle = this.activated ? '#A6FFC9' : '#000000';
            ctx.fillRect(this.x, this.y, PuzzleCell.width, PuzzleCell.width);
            (_a = this.jewel) === null || _a === void 0 ? void 0 : _a.drawBody(ctx)(this.x + PuzzleCell.padding, this.y + PuzzleCell.padding);
        };
        this.getJewelColor = () => {
            return this.jewel.type.color;
        };
        this.x = x;
        this.y = y;
        this.jewel = new Jewel();
    }
}
PuzzleCell.padding = 5;
PuzzleCell.width = Jewel.width + (PuzzleCell.padding * 2);
export { PuzzleGrid };
