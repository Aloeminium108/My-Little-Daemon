import { OrderingComponent } from "./component.js"

class Sprite extends OrderingComponent {

    public loadingPromise: Promise<any> = new Promise(resolve => resolve(null))
    public sprite: ImageBitmap | null = null

    constructor(index: number, private src: string) {
        super(index)
        this.updateSprite(src)
    }

    loadImage = (src: string) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = src
        }) as Promise<HTMLImageElement>
    }

    updateSprite = (src: string) => {
        this.loadingPromise = this.loadingPromise.then(() => {
            return this.loadImage(src)
        })
        .then(image => {
            return createImageBitmap(image)
        })
        .then(sprite => {
            this.sprite = sprite
            return new Promise(resolve => resolve(null))
        })
    }

    static loadedBitmaps = new Map<string, ImageBitmap>()

}

export {Sprite}