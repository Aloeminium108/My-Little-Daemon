import { GameState } from "./gamestate.js"
import { Game } from "../game.js"
import { Mouse } from "./mouse.js"
import { Pet } from "../Pet/pet.js"
import { ECS } from "../ecs/ecs.js"
import { SpriteSystem } from "../ecs/system/graphics/spritesystem.js"
import { GravitySystem } from "../ecs/system/physics/gravitysystem.js"
import { VelocitySystem } from "../ecs/system/physics/velocitysystem.js"
import { Bounds } from "../ecs/component/physics/bounds.js"
import { BoundarySystem } from "../ecs/system/physics/boundarysystem.js"
import { FrictionSystem } from "../ecs/system/physics/frictionsystem.js"
import { Ball } from "../ecs/entity/toys/ball.js"
import { MouseGrabSystem } from "../ecs/system/controls/mousegrabsystem.js"
import { MouseSystem } from "../ecs/system/controls/mousesystem.js"
import { PetEntity } from "../ecs/entity/pet/petentity.js"
import { CollisionDetection } from "../ecs/system/physics/collisiondetection.js"
import { Apple } from "../ecs/entity/food/apple.js"
import { ConsumableSystem } from "../ecs/system/gameplay/consumablesystem.js"
import { SpatialHashing } from "../ecs/system/physics/spatialhashing.js"
import { PetAI } from "../ecs/system/fsm/petai.js"
import { CollisionResponse } from "../ecs/system/physics/collisionresponse.js"

const RELATIVE_CUSHION_POSITION = 0.85

class HomeState implements GameState {

    ecs = new ECS()

    floorHeight: number = 100
    pet: Pet
    mouse: Mouse
    canvas: HTMLCanvasElement

    constructor(public game: Game, public ctx: CanvasRenderingContext2D) {
        this.game = game
        this.pet = game.pet
        this.mouse = game.mouse
        this.canvas = game.mainCanvas

        this.init()
    }
    
    foodButton = () => {
        let food = new Apple(100, 300)
        food.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height))
        this.ecs.addEntity(food)
    }

    init = () => {
        this.initEntities()
        this.initSystems()
    }

    private initEntities = () => {
        let ball = new Ball(200, 100)
        ball.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height))
        let ball1 = new Ball(400, 100)
        ball1.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height))
        let ball2 = new Ball(600, 100)
        ball2.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height))
        this.ecs.addEntity(ball)
        this.ecs.addEntity(ball1)
        this.ecs.addEntity(ball2)

        let position = this.findCushionPosition(PetEntity.width, PetEntity.height)
        let petEntity = new PetEntity(position.x, position.y, this.pet)
        
        this.ecs.addEntity(petEntity)
    }

    private initSystems = () => {
        let mouseSystem = new MouseSystem (this.mouse, this.canvas)
        this.ecs.addSystem(mouseSystem)
        this.ecs.addSystem(new MouseGrabSystem(mouseSystem))
        this.ecs.addSystem(new GravitySystem())
        this.ecs.addSystem(new VelocitySystem())
        this.ecs.addSystem(new FrictionSystem())
        this.ecs.addSystem(new BoundarySystem())
        this.ecs.addSystem(new SpatialHashing(300))
        this.ecs.addSystem(new CollisionDetection())
        this.ecs.addSystem(new CollisionResponse())
        this.ecs.addSystem(new ConsumableSystem())
        this.ecs.addSystem(new PetAI(mouseSystem))
        this.ecs.addSystem(new SpriteSystem(this.ctx))
    }

    update = (interval: number) => {
        this.ecs.update(interval)
    }

    pause = () => {
        this.canvas.style.backgroundImage = "url(./assets/room/living-room-blurred.png)"
    }
    resume = () => {
        this.canvas.style.backgroundImage = "url(./assets/room/living-room-scaled.png)"
    }
    
    findCushionPosition = (width: number, height: number) => {
        let centerX = this.canvas.width / 2
        let x = Math.floor(centerX - (width / 2))
        let cushionHeight = this.canvas.height * (RELATIVE_CUSHION_POSITION)
        let y = Math.floor(cushionHeight - height)
        return {x: x, y: y}
    }

}

export { HomeState }