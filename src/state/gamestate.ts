import { State } from "./state.js"
import { Game } from "../game.js"
import { Entity } from "../entity/entity.js"
import { Box } from "../entity/toy/box.js"
import { PetEntity } from "../entity/petentity.js"
import { Food } from "../entity/food.js"
import { EntityList } from "../entity/entitylist.js"
import { CollisionHandler } from "../entity/collisionhandler.js"

class GameState extends State {
    toys: Array<Entity> = []
    food: Array<Food> = []
    petEntity: PetEntity
    entities: Array<Array<Entity>>

    entityList: EntityList

    collisionHandler: CollisionHandler

    heldEntity: Entity | null = null
    width: number
    height: number
    floorHeight: number = 100

    mouse = {
        pressed: false,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0
    }

    constructor(game: Game) {
        super(game)
        this.petEntity = new PetEntity(this.pet)

        this.entityList = new EntityList(this.petEntity)

        this.width = game.canvas.width
        this.height = game.canvas.height

        this.collisionHandler = new CollisionHandler(this.entityList, this.width, this.height - this.floorHeight)

        this.entities = [[this.petEntity], this.toys, this.food]

        this.init()
    }

    init = () => {
        this.entityList.addToy(new Box(500, 300, 50, 50))
        this.entityList.addToy(new Box(700, 300, 100, 100))
        this.entityList.addFood(new Food(900, 300, 20))
    }

    animate = (ctx: CanvasRenderingContext2D) => {

        this.entityList.fullList().forEach((entity) => {
            entity.update()
        })

        this.collisionHandler.handleEntityCollisions()

        this.entityList.fullList().forEach((entity) => {
            entity.draw(ctx)
        })
        
    }

    mouseDown = (e: MouseEvent) => {
        this.mouse.pressed = true
        for (let entity of this.entityList.fullList().reverse()) {
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
            this.game.canvas.style.cursor = this.heldEntity.getMouseHold()
        } else {
            for (let entity of this.entityList.fullList().reverse()) {
                if (entity.inside(this.mouse.x, this.mouse.y)) {
                    this.game.canvas.style.cursor = entity.getMouseOver()
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

    pause = () => {}
    resume = () => {}
    
}

export { GameState }