import { Component } from "./component.js";
class PuzzleMatches extends Component {
    constructor() {
        super(...arguments);
        this.groups = new Set();
    }
}
class Group {
    constructor(cell) {
        this.set = new Set();
        this.checkCell = (cell) => {
            if (cell.jewel === null)
                return false;
            return cell.getJewelColor() === this.color;
        };
        this.addCell = (cell) => {
            this.set.add(cell);
        };
        this.set.add(cell);
        this.color = cell.getJewelColor();
    }
}
export { PuzzleMatches, Group };
