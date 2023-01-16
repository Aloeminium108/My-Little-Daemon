import { Color, JewelType } from "../../component/jeweltype.js";
import { Position } from "../../component/position.js";
import { Sprite } from "../../component/sprite.js";
import { Entity } from "../entity.js";
class Jewel extends Entity {
    constructor(x, y, jewelType) {
        super();
        this.updateImage = () => {
            this.imageLoading = this.imageLoading.then(() => {
                return this.loadImage(Jewel.getImageSrc(this.getComponent(JewelType)));
            })
                .then(image => {
                return createImageBitmap(image);
            })
                .then(sprite => {
                this.getComponent(Sprite).sprite = sprite;
                return new Promise(resolve => resolve(null));
            });
        };
        this.loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = src;
            });
        };
        this.addComponent(jewelType);
        this.imageLoading = this.loadImage(Jewel.getImageSrc(jewelType))
            .then(image => {
            return createImageBitmap(image);
        })
            .then(sprite => {
            this.addComponent(new Position(x, y));
            this.addComponent(new Sprite(5, sprite));
            return new Promise(resolve => resolve(null));
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
