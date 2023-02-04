class Mouse {
    constructor() {
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
            console.log(this.x, this.y);
        };
    }
}
export { Mouse };
