class Entity {
    constructor(body) {
        this.update = () => {
            this.updateSelf();
            this.updateBody();
        };
        this.updateBody = () => {
            this.body.update();
        };
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
        this.detectCollision = (otherEntity) => {
            return this.body.detectCollision(otherEntity.body);
        };
        this.body = body;
    }
}
export { Entity };
