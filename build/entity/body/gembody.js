import { Body } from "./body.js";
class GemBody extends Body {
    update() {
        throw new Error("Method not implemented.");
    }
    boundaryCollision(xBound, yBound) {
        throw new Error("Method not implemented.");
    }
    hold() {
        console.log("Held");
    }
    release(dx, dy) {
        console.log("Released");
    }
}
export { GemBody };
