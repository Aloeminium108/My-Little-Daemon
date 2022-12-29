import { Entity } from "./entity.js";
import { Body } from "./body.js";
class Pet extends Entity {
    constructor() {
        super(new Body(300, 300, 200, 300));
        this.image = null;
        this.drawBody = (ctx) => {
            if (this.image != null) {
                return (x, y) => {
                    ctx.drawImage(this.image, x, y);
                };
            }
            else {
                return (x, y) => { };
            }
        };
        let image = new Image();
        image.onload = () => {
            Promise.all([
                createImageBitmap(image)
            ]).then((sprite) => {
                this.image = sprite[0];
            });
        };
        image.src = "../../assets/bird.png";
    }
    update() {
    }
}
export { Pet };
