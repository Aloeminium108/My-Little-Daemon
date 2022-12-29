import { Entity } from "./entity.js"
import { Body } from "./body.js"

class Pet extends Entity {

    image: ImageBitmap | null = null
    constructor() {
        super(new Body(300, 300, 100, 100))
        let image = new Image()
        image.onload = () => {
            Promise.all([
                createImageBitmap(image, 2000, 1500, 100, 100)
            ]).then((sprite) => {
                this.image = sprite[0]
            })
        }
        image.src = "../../assets/void_mouth.png"
        
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        if (this.image != null) ctx.drawImage(this.image, this.body.getX(), this.body.getY())
    }

    update(): void {
    }
    
}

export { Pet }