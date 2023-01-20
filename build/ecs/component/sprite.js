import { OrderingComponent } from "./component.js";
class Sprite extends OrderingComponent {
    constructor(index, src) {
        super(index);
        this.src = src;
        this.loadingPromise = new Promise(resolve => resolve(null));
        this.sprite = null;
        this.loadSprite = (src) => {
            if (Sprite.loadedBitmaps.has(src)) {
                return new Promise(resolve => {
                    this.sprite = Sprite.loadedBitmaps.get(src);
                    resolve(null);
                });
            }
            this.loadingPromise = this.loadingPromise.then(() => {
                return Sprite.loadImage(src);
            })
                .then(image => {
                return createImageBitmap(image);
            })
                .then(sprite => {
                this.sprite = sprite;
                Sprite.loadedBitmaps.set(src, sprite);
                return new Promise(resolve => resolve(null));
            });
        };
        this.updateSprite = (newSprite) => {
            this.sprite = newSprite;
        };
        this.loadSprite(src);
    }
}
Sprite.loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
};
Sprite.loadSprite = (src) => {
    if (Sprite.loadedBitmaps.has(src)) {
        return new Promise(resolve => {
            let sprite = Sprite.loadedBitmaps.get(src);
            resolve(sprite);
        });
    }
    return Sprite.loadImage(src)
        .then(image => {
        return createImageBitmap(image);
    })
        .then(sprite => {
        Sprite.loadedBitmaps.set(src, sprite);
        return sprite;
    });
};
Sprite.loadedBitmaps = new Map();
export { Sprite };
