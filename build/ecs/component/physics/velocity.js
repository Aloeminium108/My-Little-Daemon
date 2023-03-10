import { Component } from "../component.js";
class Velocity extends Component {
    constructor(dx, dy) {
        super();
        this.dx = dx;
        this.dy = dy;
        this.hold = () => {
            this.dx = 0;
            this.dy = 0;
        };
        this.holdX = () => {
            this.dx = 0;
        };
        this.holdY = () => {
            this.dy = 0;
        };
        this.setDX = (dx) => {
            this.dx = dx;
        };
        this.setDY = (dy) => {
            this.dy = dy;
        };
        this.dxInvert = (bounciness) => {
            this.dx *= -bounciness;
        };
        this.dyInvert = (bounciness) => {
            this.dy *= -bounciness;
        };
    }
}
export { Velocity };
