import { PuzzleCell } from "../entity/puzzle/puzzlegrid.js";
import { Component } from "./component.js";
import { JewelType } from "./jeweltype.js";
class GemSlot extends Component {
    constructor(jewel, puzzleCell) {
        super();
        this.jewel = jewel;
        this.activated = false;
        this.open = false;
        this.getJewelColor = () => {
            var _a, _b;
            return (_b = (_a = this.jewel) === null || _a === void 0 ? void 0 : _a.getComponent(JewelType).color) !== null && _b !== void 0 ? _b : null;
        };
        this.i = puzzleCell.i;
        this.j = puzzleCell.j;
        this.x = puzzleCell.x;
        this.y = puzzleCell.y;
        this.padding = PuzzleCell.padding;
    }
}
export { GemSlot };
