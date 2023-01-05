import { Body } from "./body/body.js";
class Entity {
    constructor() {
        this.update = (interval) => {
            this.updateSelf(interval);
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
        this.inside = (x, y) => {
            return this.body.inside(x, y);
        };
        this.boundaryCollision = (xBound, yBound) => {
            this.body.boundaryCollision(xBound, yBound);
        };
        this.getMouseOver = () => {
            return this.mouseOver;
        };
        this.getMouseHold = () => {
            return this.mouseGrab;
        };
    }
}
Entity.detectCollision = (entity1, entity2) => {
    return Body.detectCollision(entity1.body, entity2.body);
};
export { Entity };
