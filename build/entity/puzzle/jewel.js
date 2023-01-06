class Jewel {
    constructor(type = null) {
        this.mouseOver = 'grab';
        this.mouseGrab = 'grabbing';
        this.drawBody = (ctx) => {
            return (x, y) => {
                ctx.fillStyle = this.type.color;
                ctx.fillRect(x, y, Jewel.width, Jewel.width);
            };
        };
        this.type = type !== null && type !== void 0 ? type : Jewel.randomType();
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
