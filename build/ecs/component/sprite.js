import { OrderingComponent } from "./component.js";
class Sprite extends OrderingComponent {
    constructor(index, src) {
        super(index);
        this.src = src;
        this.loadingPromise = new Promise(resolve => resolve(null));
        this.sprite = null;
        this.loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = src;
            });
        };
        this.updateSprite = (src) => {
            this.loadingPromise = this.loadingPromise.then(() => {
                return this.loadImage(src);
            })
                .then(image => {
                return createImageBitmap(image);
            })
                .then(sprite => {
                this.sprite = sprite;
                return new Promise(resolve => resolve(null));
            });
        };
        this.updateSprite(src);
    }
}
Sprite.loadedBitmaps = new Map();
export { Sprite };
