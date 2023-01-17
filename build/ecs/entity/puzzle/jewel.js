import { Color } from "../../component/jeweltype.js";
import { MouseInteractable } from "../../component/mouseinteractable.js";
import { Sprite } from "../../component/sprite.js";
import { Entity } from "../entity.js";
class Jewel extends Entity {
    constructor(x, y, jewelType) {
        super();
        this.addComponent(jewelType);
        this.addZeroGPhysicsBody(x, y, 5, Jewel.getImageSrc(jewelType))
            .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)));
        });
    }
}
Jewel.getImageSrc = (jewelType) => {
    switch (jewelType.color) {
        case Color.RED:
            return '../../assets/jewel-red.png';
        case Color.YELLOW:
            return '../../assets/jewel-yellow.png';
        case Color.GREEN:
            return '../../assets/jewel-green.png';
        case Color.BLUE:
            return '../../assets/jewel-blue.png';
        default:
            return '../../assets/jewel-black.png';
    }
};
export { Jewel };