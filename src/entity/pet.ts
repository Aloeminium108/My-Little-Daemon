import { Entity } from "./entity.js"
import { PhysicsBody } from "./physicsbody.js"

class Pet extends Entity {

    image: ImageBitmap | null = null
    constructor() {
        super(new PhysicsBody(300, 300, 200, 300))
        let image = new Image()
        image.onload = () => {
            Promise.all([
                createImageBitmap(image)
            ]).then((sprite) => {
                this.image = sprite[0]
            })
        }
        image.src = "../../assets/bird.png"
        
    }

    drawBody = (ctx: CanvasRenderingContext2D) => {
        if (this.image != null) {
            return (x: number, y: number) => {
                ctx.drawImage(this.image!!, x, y)
            }
        } else {
            return (x: number, y: number) => {}
        }
    }

    updateSelf = () => {
    }
    
}

export { Pet }