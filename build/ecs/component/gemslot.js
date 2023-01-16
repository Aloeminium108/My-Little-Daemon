import { Component } from "./component.js";
import { JewelType } from "./jeweltype.js";
class GemSlot extends Component {
    constructor(jewel, x, y) {
        super();
        this.jewel = jewel;
        this.x = x;
        this.y = y;
        this.activated = false;
        this.open = false;
        this.getJewelColor = () => {
            var _a, _b;
            return (_b = (_a = this.jewel) === null || _a === void 0 ? void 0 : _a.getComponent(JewelType).color) !== null && _b !== void 0 ? _b : null;
        };
    }
}
export { GemSlot };
