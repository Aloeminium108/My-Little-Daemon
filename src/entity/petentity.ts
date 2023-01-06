import { Pet } from "../Pet/pet.js"
import { Entity } from "./entity.js"
import { PhysicsBody } from "./body/physicsbody.js"
import { Food } from "./food.js"
import { Body } from "./body/body.js"

class PetEntity implements Entity {

    private pet: Pet
    protected body: PhysicsBody
    private image: ImageBitmap | null = null

    private mouseOver: string = 'pointer'
    private mouseHold: string = 'grab'

    constructor(pet: Pet) {
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

    getBody(): Body {
        return this.body
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.image === null) return
        ctx.drawImage(this.image!!, this.body.getX(), this.body.getY())
    }

    getMouseOver(): string {
        return this.mouseOver
    }

    getMouseHold(): string {
        return this.mouseHold
    }

    feed = (food: Food) => {
        this.pet.feed(food)
    }
    
}

export { PetEntity }