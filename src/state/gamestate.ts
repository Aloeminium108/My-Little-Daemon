import { State } from "./state.js";
import { Game } from "../game.js";
import { Entity } from "../entity/entity.js";
import { Box } from "../entity/box.js";
import { Pet } from "../entity/pet.js";

class GameState extends State {
    toys: Array<Entity> = []
    pet: Array<Pet> = []
    entities: Array<Array<Entity>> = [this.toys, this.pet]
    heldEntity: Entity | null = null
    width: number
    height: number
    mouse = {
        pressed: false,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0
    }

    constructor(game: Game) {
        super(game)
        this.width = game.canvas.width
        this.height = game.canvas.height
        this.init()
    }

    init = () => {
        this.toys.push(new Box(500, 300, 50, 50))
        this.toys.push(new Box(700, 300, 100, 100))
        this.pet.push(new Pet())
    }

    animate = (ctx: CanvasRenderingContext2D) => {

        this.entities.flat().forEach((entity, index) => {
            for (let i = index+1; i < this.entities.flat().length; i++) {
                if (entity.detectCollision(this.entities.flat()[i])) {
                    console.log("Collision detected")
                }
            }

            entity.update()

            entity.boundaryCollision(this.width, this.height)

            entity.draw(ctx)
        })
        
    }

    mouseDown = (e: MouseEvent) => {
        this.mouse.pressed = true
        for (let entity of this.entities.flat()) {
            if (entity.inside(this.mouse.x, this.mouse.y)) {
                entity.hold()
                this.heldEntity = entity
                break
            }
        }
    }
    mouseUp = (e: MouseEvent) => {
        this.mouse.pressed = false
        this.heldEntity?.release(this.mouse.dx, this.mouse.dy)
        this.heldEntity = null
    }
    mouseMove = (e: MouseEvent) => {
        let newX = e.offsetX
        let newY = e.offsetY

        this.mouse.dx = newX - this.mouse.x
        this.mouse.dy = newY - this.mouse.y

        this.mouse.x = newX
        this.mouse.y = newY
        
        if (this.heldEntity != null) {
            this.heldEntity.moveTo(this.mouse.x, this.mouse.y)
        } else {
            for (let entity of this.entities.flat()) {
                if (entity.inside(this.mouse.x, this.mouse.y)) {
                    this.game.canvas.style.cursor = 'grab'
                    break
                } else {
                    this.game.canvas.style.cursor = 'default'
                }
            }
        }
    }
    mouseLeave = (e: MouseEvent) => {
        this.mouse.pressed = false
        this.heldEntity?.release(0, 0)
        this.heldEntity = null
    }

    resume = () => {}
    
}

export { GameState }