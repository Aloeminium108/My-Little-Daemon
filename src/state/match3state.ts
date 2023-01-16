import { ECS } from "../ecs/ecs.js";
import { PuzzleGrid } from "../ecs/entity/puzzle/puzzlegrid.js";
import { CollisionDetection } from "../ecs/system/collisiondetection.js";
import { SpriteSystem } from "../ecs/system/spritesystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { GravitySystem } from "../ecs/system/gravitysystem.js";
import { MouseGrabSystem } from "../ecs/system/mousegrabsystem.js";
import { MouseSystem } from "../ecs/system/mousesystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { Mouse } from "./mouse.js";
import { State } from "./state.js"
import { DrawingSystem } from "../ecs/system/drawingsystem.js";

class Match3State implements State {
    game: Game;
    pet: Pet;

    ecs = new ECS()

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

    init = () => {
        this.initEntities()
        this.initSystems()
    }

    initEntities = () => {
        let puzzleGrid = new PuzzleGrid(50, 50)
        this.ecs.addEntity(puzzleGrid)
    }

    initSystems = () => {
        let mouseSystem = new MouseSystem (this.mouse, this.canvas)
        this.ecs.addSystem(mouseSystem)
        this.ecs.addSystem(new MouseGrabSystem(mouseSystem))
        this.ecs.addSystem(new GravitySystem())
        this.ecs.addSystem(new VelocitySystem())
        this.ecs.addSystem(new FrictionSystem())
        let collisionDetection = new CollisionDetection()
        this.ecs.addSystem(collisionDetection)
        this.ecs.addSystem(new DrawingSystem(this.ctx))
        this.ecs.addSystem(new SpriteSystem(this.ctx))
    }

    pause = () => {}
    resume = () =>  {}

    update = (interval: number) =>  {
        this.ecs.update(interval)
    }

    mouseUp = (e: MouseEvent) =>  {}
    mouseDown = (e: MouseEvent) =>  {}
    mouseMove = (e: MouseEvent) =>  {}
    mouseLeave = (e: MouseEvent) =>  {}
    
}

export { Match3State }