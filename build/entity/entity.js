class Entity {
    constructor(body) {
        this.moveTo = (newX, newY) => {
            this.body.moveTo(newX, newY);
        };
        this.hold = () => {
            this.body.hold();
        };
        this.release = () => {
            this.body.release();
        };
        this.update = () => {
            this.body.update();
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
