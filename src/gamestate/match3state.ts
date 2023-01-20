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
import { GameState } from "./gamestate.js"
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
import { GemGrabSystem } from "../ecs/system/gemgrabsystem.js";
import { SpatialHashing } from "../ecs/system/spatialhashing.js";
import { BoundarySystem } from "../ecs/system/boundarysystem.js";
import { JewelBehavior } from "../ecs/system/fsm/jewelbehavior.js";
import { Jewel } from "../ecs/entity/puzzle/jewel.js";
import { JewelType } from "../ecs/component/jeweltype.js";
import { Bounds } from "../ecs/component/bounds.js";

class Match3State implements GameState {
    game: Game;
    pet: Pet;

    ecs = new ECS()

    mouse: Mouse
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    timeElapsed: number = 0

    numRows = 8
    numColumns = 8

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
        for (let i = 0; i < this.numColumns; i++) {
            for (let j = -this.numRows; j < this.numRows; j++) {
                let gem = new Jewel(i * 40, j * 40, new JewelType())
                gem.addComponent(new Bounds(0, 360, 0, 320))
                this.ecs.addEntity(gem)
            }
        }
    }

    initSystems = () => {
        let mouseSystem = new MouseSystem (this.mouse, this.canvas)
        this.ecs.addSystem(mouseSystem)
        let gemGrabSystem = new GemGrabSystem(mouseSystem)
        this.ecs.addSystem(gemGrabSystem)
        this.ecs.addSystem(new GravitySystem())
        this.ecs.addSystem(new VelocitySystem())
        this.ecs.addSystem(new FrictionSystem())
        this.ecs.addSystem(new BoundarySystem())
        let spatialHashing = new SpatialHashing(100)
        this.ecs.addSystem(spatialHashing)
        let collisionDetection = new CollisionDetection(spatialHashing)
        this.ecs.addSystem(collisionDetection)
        this.ecs.addSystem(new JewelBehavior(collisionDetection))
        this.ecs.addSystem(new DrawingSystem(this.ctx))
        this.ecs.addSystem(new SpriteSystem(this.ctx))
    }

    pause = () => {}
    resume = () =>  {}

    update = (interval: number) =>  {
        this.timeElapsed += interval
        this.ecs.update(interval)
    }

    mouseUp = (e: MouseEvent) =>  {}
    mouseDown = (e: MouseEvent) =>  {}
    mouseMove = (e: MouseEvent) =>  {}
    mouseLeave = (e: MouseEvent) =>  {}
    
}

export { Match3State }