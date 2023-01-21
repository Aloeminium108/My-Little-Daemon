import { Component } from "./component.js";
class JewelType extends Component {
    constructor(color = null, special = null) {
        super();
        this.color = color;
        this.special = special;
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
})(Color || (Color = {}));
var SpecialProperty;
(function (SpecialProperty) {
    SpecialProperty[SpecialProperty["LINECLEAR"] = 0] = "LINECLEAR";
    SpecialProperty[SpecialProperty["BOMB"] = 1] = "BOMB";
    SpecialProperty[SpecialProperty["COLORBOMB"] = 2] = "COLORBOMB";
    SpecialProperty[SpecialProperty["ULTRABOMB"] = 3] = "ULTRABOMB";
})(SpecialProperty || (SpecialProperty = {}));
export { JewelType, Color, SpecialProperty };
