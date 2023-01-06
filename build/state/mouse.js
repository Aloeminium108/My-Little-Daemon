class Mouse {
    constructor(canvas) {
        this.pressed = false;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.move = (e) => {
            let newX = e.offsetX;
            let newY = e.offsetY;
            this.dx = newX - this.x;
            this.dy = newY - this.y;
            this.x = newX;
            this.y = newY;
        };
        this.mouseOverEntity = (entity) => {
            var _a, _b;
            this.canvas.style.cursor = (_b = (_a = entity === null || entity === void 0 ? void 0 : entity.getMouseOver) === null || _a === void 0 ? void 0 : _a.call(entity)) !== null && _b !== void 0 ? _b : 'default';
        };
        this.mouseHoldEntity = (entity) => {
            var _a, _b;
            this.canvas.style.cursor = (_b = (_a = entity.getMouseHold) === null || _a === void 0 ? void 0 : _a.call(entity)) !== null && _b !== void 0 ? _b : 'default';
        };
        this.canvas = canvas;
    }
}
export { Mouse };
