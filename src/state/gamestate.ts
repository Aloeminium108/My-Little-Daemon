import { State } from "./state.js";
import { Game } from "../game.js";
import { Entity } from "../entity/entity.js";
import { Box } from "../entity/box.js";
import { Pet } from "../entity/pet.js";

class GameState extends State {
    entities: Array<Entity> = []
    heldEntity: Entity | null = null
    width: number
    height: number
    mouse = {
        pressed: false,
        x: 0,
        y: 0
    }

    constructor(game: Game) {
        super(game)
        this.width = game.canvas.width
        this.height = game.canvas.height
        this.init()
    }

    init = () => {
        this.entities.push(new Box(500, 300, 50, 50))
        this.entities.push(new Pet())
    }

    animate = (ctx: CanvasRenderingContext2D) => {

        this.entities.forEach((entity) => {
            entity.update()

            entity.boundaryCollision(this.width, this.height)

            entity.draw(ctx)
        })
        
    }

    mouseDown = (e: MouseEvent) => {
        this.mouse.pressed = true
        for (let entity of this.entities) {
            if (entity.inside(this.mouse.x, this.mouse.y)) {
                entity.hold()
                this.heldEntity = entity
                break
            }
        }
    }
    mouseUp = (e: MouseEvent) => {
        this.mouse.pressed = false
        this.entities.forEach((entity) => {
            entity.release()
        })
        this.heldEntity = null
    }
    mouseMove = (e: MouseEvent) => {
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
        
        if (this.heldEntity != null) {
            this.heldEntity.moveTo(this.mouse.x, this.mouse.y)
        } else {
            for (let entity of this.entities) {
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
        this.entities.forEach((entity) => {
            entity.release()
        })
        this.heldEntity = null
    }
    
}

export { GameState }