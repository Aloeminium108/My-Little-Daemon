import { Color } from "../../component/jeweltype.js";
import { Position } from "../../component/position.js";
import { Sprite } from "../../component/sprite.js";
import { Entity } from "../entity.js";
class Jewel extends Entity {
    constructor(x, y, jewelType) {
        super();
        this.addComponent(jewelType);
        let image = new Image();
        image.onload = () => {
            createImageBitmap(image).then(sprite => {
                //this.addPhysicsBody(x, y, 5, sprite)
                this.addComponent(new Position(x, y));
                this.addComponent(new Sprite(5, sprite));
            });
        };
        image.src = Jewel.getImage(jewelType);
    }
}
Jewel.getImage = (type) => {
    var _a;
    let color = (_a = type.color) !== null && _a !== void 0 ? _a : Color.RED;
    console.log(color);
    switch (color) {
        case Color.RED:
            return '../../assets/jewel-red.png';
        case Color.YELLOW:
            return '../../assets/jewel-yellow.png';
        case Color.GREEN:
            return '../../assets/jewel-green.png';
        case Color.BLUE:
            return '../../assets/jewel-blue.png';
        default:
            return '../../assets/jewel-blue.png';
    }
};
export { Jewel };
