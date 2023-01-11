import { Entity } from "./entity.js";
class PetEntity extends Entity {
    constructor(ecs = null) {
        super(ecs);
        this.image = null;
        let image = new Image();
        image.onload = () => {
            createImageBitmap(image)
                .then((sprite) => {
                this.image = sprite;
            });
        };
        image.src = '../../assets/bird.png';
    }
}
export { PetEntity };
