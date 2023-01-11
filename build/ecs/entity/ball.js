import { Entity } from "./entity.js";
class Ball extends Entity {
    constructor(x, y) {
        super();
        this.sprite = null;
        let image = new Image();
        image.onload = () => {
            Promise.all([createImageBitmap(image)]).then((sprites) => {
                this.sprite = sprites[0];
                this.addPhysicsBody(x, y, this.sprite);
                //this.addComponent(new MouseGrabbable(this.getComponent(Sprite)))
            });
        };
        image.src = '../../assets/ball.png';
    }
    static make(x, y) {
    }
}
export { Ball };
