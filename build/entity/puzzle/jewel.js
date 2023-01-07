import { GemBody } from "../body/gembody.js";
class Jewel {
    constructor(x, y, type = null) {
        this.mouseOver = 'grab';
        this.mouseHold = 'grabbing';
        this.getBody = () => {
            return this.body;
        };
        this.draw = (ctx) => {
            ctx.fillStyle = this.type.color;
            ctx.fillRect(this.body.getX(), this.body.getY(), Jewel.width, Jewel.width);
        };
        this.getMouseOver = () => {
            return this.mouseOver;
        };
        this.getMouseHold = () => {
            return this.mouseHold;
        };
        this.type = type !== null && type !== void 0 ? type : Jewel.randomType();
        this.body = new GemBody(x, y, Jewel.width, Jewel.width);
    }
}
Jewel.width = 50;
Jewel.randomType = () => {
    let colorLength = Object.keys(Color).length;
    let randColor = Object.keys(Color)[Math.floor(Math.random() * colorLength)];
    return { color: randColor };
};
var Color;
(function (Color) {
    Color["RED"] = "#FF0000";
    //ORANGE = '#FF7F00',
    Color["YELLOW"] = "#FFFF00";
    Color["GREEN"] = "#00FF00";
    Color["BLUE"] = "#0000FF";
    //INDIGO = '#4B0082',
    //VIOLET = '#9400D3'
})(Color || (Color = {}));
var SpecialProperty;
(function (SpecialProperty) {
})(SpecialProperty || (SpecialProperty = {}));
export { Jewel, Color };
