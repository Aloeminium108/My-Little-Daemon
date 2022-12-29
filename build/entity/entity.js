class Entity {
    constructor(body) {
        this.draw = (ctx) => {
            this.body.draw(this.drawBody(ctx));
        };
        this.moveTo = (newX, newY) => {
            this.body.moveTo(newX, newY);
        };
        this.hold = () => {
            this.body.hold();
        };
        this.release = () => {
            this.body.release();
        };
        this.inside = (x, y) => {
            return this.body.inside(x, y);
        };
        this.boundaryCollision = (xBound, yBound) => {
            this.body.boundaryCollision(xBound, yBound);
        };
        this.body = body;
    }
}
export { Entity };
