import { Entity } from "./entity.js";
import { PhysicsBody } from "./physicsbody.js";
class Pet extends Entity {
    constructor() {
        super(new PhysicsBody(300, 300, 200, 300));
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
        this.updateSelf = () => {
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
}
export { Pet };
