import { Pet } from "../Pet/pet.js"
import { Entity } from "./entity.js"
import { PhysicsBody } from "./physicsbody.js"

class PetEntity extends Entity {

    private pet: Pet
    protected body: PhysicsBody
    private image: ImageBitmap | null = null
    constructor(pet: Pet) {
        super()
        this.pet = pet
        this.body = new PhysicsBody(300, 300, 200, 300)
        let image = new Image()
        image.onload = () => {
            Promise.all([
                createImageBitmap(image)
            ]).then((sprite) => {
                this.image = sprite[0]
            })
        }
        image.src = this.pet.imageSrc
        
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

    release = (dx: number, dy: number) => {
        this.body.toss(0, 0)
    }
    
}

export { PetEntity }