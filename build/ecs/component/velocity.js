import { Component } from "./component.js";
class Velocity extends Component {
    constructor(dx, dy) {
        super();
        this.dx = dx;
        this.dy = dy;
        this.hold = () => {
            this.dx = 0;
            this.dy = 0;
        };
        this.dxInvert = () => {
            this.dx *= -1;
        };
        this.dyInvert = () => {
            this.dy *= -1;
        };
    }
}
export { Velocity };
