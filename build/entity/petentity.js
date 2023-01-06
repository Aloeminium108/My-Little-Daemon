import { PhysicsBody } from "./body/physicsbody.js";
class PetEntity {
    constructor(pet) {
        this.image = null;
        this.mouseOver = 'pointer';
        this.mouseHold = 'grab';
        this.feed = (food) => {
            this.pet.feed(food);
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
    getBody() {
        return this.body;
    }
    draw(ctx) {
        if (this.image === null)
            return;
        ctx.drawImage(this.image, this.body.getX(), this.body.getY());
    }
    getMouseOver() {
        return this.mouseOver;
    }
    getMouseHold() {
        return this.mouseHold;
    }
}
export { PetEntity };
