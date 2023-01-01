import { Entity } from "./entity.js";
import { PhysicsBody } from "./physicsbody.js";
class PetEntity extends Entity {
    constructor(pet) {
        super();
        this.image = null;
        this.mouseOver = 'pointer';
        this.mouseGrab = 'grab';
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
        this.release = (dx, dy) => {
            this.body.toss(0, 0);
        };
        this.pet = pet;
        this.body = new PhysicsBody(300, 300, 200, 300);
        let image = new Image();
        image.onload = () => {
            Promise.all([
                createImageBitmap(image)
            ]).then((sprite) => {
                this.image = sprite[0];
            });
        };
        image.src = this.pet.imageSrc;
    }
}
export { PetEntity };
