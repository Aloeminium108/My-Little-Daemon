import { State } from "./state.js"
import { Game } from "../game.js"
import { Mouse } from "./mouse.js"
import { Pet } from "../Pet/pet.js"
import { ECS } from "../ecs/ecs.js"
import { SpriteSystem } from "../ecs/system/spritesystem.js"
import { GravitySystem } from "../ecs/system/gravitysystem.js"
import { VelocitySystem } from "../ecs/system/velocitysystem.js"
import { Bounds } from "../ecs/component/bounds.js"
import { BoundarySystem } from "../ecs/system/boundarysystem.js"
import { FrictionSystem } from "../ecs/system/frictionsystem.js"
import { Ball } from "../ecs/entity/ball.js"
import { MouseGrabSystem } from "../ecs/system/mousegrabsystem.js"
import { MouseSystem } from "../ecs/system/mousesystem.js"
import { PetEntity } from "../ecs/entity/petentity.js"
import { CollisionDetection } from "../ecs/system/collisiondetection.js"
import { Apple } from "../ecs/entity/food.js"
import { ConsumableSystem } from "../ecs/system/consumablesystem.js"

class GameState implements State {

    ecs = new ECS()

    floorHeight: number = 100
    game: Game
    pet: Pet
    mouse: Mouse
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement

    constructor(game: Game) {
        this.game = game
        this.pet = game.pet
        this.mouse = game.mouse
        this.ctx = game.ctx
        this.canvas = game.canvas

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

        let petEntity = new PetEntity(800, 100, this.pet.stats)
        petEntity.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height))
        this.ecs.addEntity(petEntity)
    }

    private initSystems = () => {
        let mouseSystem = new MouseSystem (this.mouse, this.canvas)
        this.ecs.addSystem(mouseSystem)
        this.ecs.addSystem(new MouseGrabSystem(mouseSystem))
        this.ecs.addSystem(new GravitySystem())
        this.ecs.addSystem(new VelocitySystem())
        this.ecs.addSystem(new BoundarySystem())
        this.ecs.addSystem(new FrictionSystem())
        let collisionDetection = new CollisionDetection()
        this.ecs.addSystem(collisionDetection)
        this.ecs.addSystem(new ConsumableSystem(collisionDetection))
        this.ecs.addSystem(new SpriteSystem(this.ctx))
    }

    update = (interval: number) => {
        this.ecs.update(interval)
    }

    pause = () => {}
    resume = () => {}
    
}

export { GameState }