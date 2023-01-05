import { State } from "./state.js"
import { Game } from "../game.js"
import { Box } from "../entity/toy/box.js"
import { PetEntity } from "../entity/petentity.js"
import { Food } from "../entity/food.js"
import { EntityList } from "../entity/entitylist.js"
import { CollisionHandler } from "../entity/collisionhandler.js"
import { Mouse } from "./mouse.js"

class GameState extends State {

    entityList: EntityList

    collisionHandler: CollisionHandler
    mouse: Mouse

    floorHeight: number = 100

    constructor(game: Game) {
        super(game)

        this.entityList = new EntityList(new PetEntity(this.pet))

        this.collisionHandler = new CollisionHandler(this.entityList, game.canvas.width, game.canvas.height - this.floorHeight)
        this.mouse = new Mouse(game.canvas)

        this.init()
    }

    init = () => {
        this.entityList.addToy(new Box(500, 300, 50, 50))
        this.entityList.addToy(new Box(700, 300, 100, 100))
        this.entityList.addFood(new Food(900, 300, 20))
    }

    animate = (ctx: CanvasRenderingContext2D, interval: number) => {

        this.entityList.fullList().forEach((entity) => {
            entity.update(interval)
        })

        this.collisionHandler.handleEntityCollisions()

        this.entityList.fullList().forEach((entity) => {
            entity.draw(ctx)
        })
        
    }

    mouseDown = (e: MouseEvent) => {
        this.mouse.pressed = true
        this.entityList.hold(this.collisionHandler.detectMouseCollisions(this.mouse))
    }

    mouseUp = (e: MouseEvent) => {
        this.mouse.pressed = false
        this.entityList.release(this.mouse.dx, this.mouse.dy)
    }

    mouseMove = (e: MouseEvent) => {
        this.mouse.move(e)
        
        let heldEntity = this.entityList.getHeldEntity()
        if (heldEntity != null) {
            heldEntity.moveTo(this.mouse.x, this.mouse.y)
            this.game.canvas.style.cursor = heldEntity.getMouseHold()
        } else {

            this.mouse.mouseOverEntity(this.collisionHandler.detectMouseCollisions(this.mouse))

        }
    }

    mouseLeave = (e: MouseEvent) => {
        this.mouse.pressed = false
        this.entityList.release(0, 0)
    }

    pause = () => {}
    resume = () => {}
    
}

export { GameState }