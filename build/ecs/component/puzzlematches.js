import { Component } from "./component.js";
class PuzzleMatches extends Component {
    constructor() {
        super(...arguments);
        this.groups = new Set();
    }
}
class Group {
    constructor(cell = null) {
        this.set = new Set();
        this.color = null;
        this.checkCell = (cell) => {
            if (cell.jewel === null)
                return false;
            return cell.getJewelColor() === this.color;
        };
        this.addCell = (cell) => {
            this.set.add(cell);
            if (this.color === null)
                this.color = cell.getJewelColor();
        };
        if (cell === null)
            return;
        this.set.add(cell);
        this.color = cell.getJewelColor();
    }
}
export { PuzzleMatches, Group };
