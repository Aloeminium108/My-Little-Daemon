import { Component } from "../component.js";
class JewelType extends Component {
    constructor(color = null, special = null) {
        super();
        this.color = color;
        this.special = special;
        this.active = true;
        this.swapped = false;
        this.conversion = null;
        this.randomizeColor = (color) => {
            let newColor;
            do {
                newColor = JewelType.randomColor();
            } while (newColor === color);
            this.color = newColor;
        };
        if (this.special === null && this.color === null)
            this.color = JewelType.randomColor();
    }
}
JewelType.randomColor = () => {
    let colorLength = Object.keys(Color).length / 2;
    return Math.floor(Math.random() * colorLength);
};
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["YELLOW"] = 1] = "YELLOW";
    Color[Color["GREEN"] = 2] = "GREEN";
    Color[Color["BLUE"] = 3] = "BLUE";
    Color[Color["PURPLE"] = 4] = "PURPLE";
    Color[Color["ORANGE"] = 5] = "ORANGE";
})(Color || (Color = {}));
var SpecialProperty;
(function (SpecialProperty) {
    SpecialProperty[SpecialProperty["V_LINECLEAR"] = 0] = "V_LINECLEAR";
    SpecialProperty[SpecialProperty["H_LINECLEAR"] = 1] = "H_LINECLEAR";
    SpecialProperty[SpecialProperty["BOMB"] = 2] = "BOMB";
    SpecialProperty[SpecialProperty["COLORBOMB"] = 3] = "COLORBOMB";
    SpecialProperty[SpecialProperty["ULTRABOMB"] = 4] = "ULTRABOMB";
})(SpecialProperty || (SpecialProperty = {}));
export { JewelType, Color, SpecialProperty };
