import { OrderingComponent } from "./component.js"

class Sprite extends OrderingComponent {

    public loadingPromise: Promise<any> = new Promise(resolve => resolve(null))
    public sprite: ImageBitmap | null = null

    constructor(index: number, private src: string) {
        super(index)
        this.loadSprite(src)
    }

    static loadImage = (src: string) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = src
        }) as Promise<HTMLImageElement>
    }

    loadSprite = (src: string) => {
        if (Sprite.loadedBitmaps.has(src)) {
            return  new Promise(resolve => {
                this.sprite = Sprite.loadedBitmaps.get(src)!!
                resolve(null)
            })
        } 

        this.loadingPromise = this.loadingPromise.then(() => {
            return Sprite.loadImage(src)
        })
        .then(image => {
            return createImageBitmap(image)
        })
        .then(sprite => {
            this.sprite = sprite
            Sprite.loadedBitmaps.set(src, sprite)
            return new Promise(resolve => resolve(null))
        })
    }

    static loadSprite = (src: string) => {
        if (Sprite.loadedBitmaps.has(src)) {
            return new Promise<ImageBitmap>(resolve => {
                let sprite = Sprite.loadedBitmaps.get(src)!!
                resolve(sprite)
            })
        }

        return Sprite.loadImage(src)
        .then(image => {
            return createImageBitmap(image)
        })
        .then(sprite => {
            Sprite.loadedBitmaps.set(src, sprite)
            return sprite
        })
    }

    updateSprite = (newSprite: ImageBitmap) => {
        this.sprite = newSprite
    }

    static loadedBitmaps = new Map<string, ImageBitmap>()

}

export {Sprite}