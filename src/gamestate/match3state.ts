import { ECS } from "../ecs/ecs.js";
import { CollisionDetection } from "../ecs/system/collisiondetection.js";
import { SpriteSystem } from "../ecs/system/spritesystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { MouseSystem } from "../ecs/system/mousesystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { Mouse } from "./mouse.js";
import { GameState } from "./gamestate.js"
import { GemGrabSystem } from "../ecs/system/gemgrabsystem.js";
import { SpatialHashing } from "../ecs/system/spatialhashing.js";
import { BoundarySystem } from "../ecs/system/boundarysystem.js";
import { JewelBehavior } from "../ecs/system/fsm/jewelbehavior.js";
import { JewelType } from "../ecs/component/jeweltype.js";
import { Hitbox } from "../ecs/component/hitbox.js";
import { Automaton } from "../ecs/component/automaton.js";
import { GeneratorSystem } from "../ecs/system/generatorsystem.js";
import { Match3ScoringSystem } from "../ecs/system/match3scoring.js";
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
import { Scoreboard } from "../ecs/entity/puzzle/scoreboard.js";
import { CollisionResponse } from "../ecs/system/collisionresponse.js";
import { JewelGrid } from "../ecs/entity/puzzle/jewelgrid.js";
import { Jewel } from "../ecs/entity/puzzle/jewel.js";

class Match3State implements GameState {
    pet: Pet;

    ecs = new ECS()

    mouse: Mouse
    canvas: HTMLCanvasElement
    timeElapsed: number = 0

    constructor(
        public game: Game, 
        public ctx: CanvasRenderingContext2D, 
        public canvasContainer: HTMLDivElement) {
        this.game = game
        this.pet = game.pet
        this.mouse = game.mouse
        this.canvas = game.secondaryCanvas

        this.init()
    }

    init = () => {
        this.initEntities()
        this.initSystems()
    }

    initEntities = () => {

        let jewelGrid = new JewelGrid(0, 0, 8, 8)
        this.ecs.addEntity(jewelGrid)

    }

    initSystems = () => {
        let mouseSystem = new MouseSystem (this.mouse, this.canvas)
        this.ecs.addSystem(mouseSystem)
        let gemGrabSystem = new GemGrabSystem(mouseSystem)
        this.ecs.addSystem(gemGrabSystem)
        this.ecs.addSystem(new VelocitySystem())
        this.ecs.addSystem(new FrictionSystem())
        this.ecs.addSystem(new BoundarySystem())
        let spatialHashing = new SpatialHashing(160, new Set([Hitbox, JewelType, Automaton]))
        this.ecs.addSystem(spatialHashing)
        let collisionDetection = new CollisionDetection(spatialHashing)
        this.ecs.addSystem(collisionDetection)
        this.ecs.addSystem(new CollisionResponse(collisionDetection))
        this.ecs.addSystem(new GeneratorSystem(collisionDetection))
        let jewelBehavior = new JewelBehavior(collisionDetection, gemGrabSystem)
        this.ecs.addSystem(jewelBehavior)
        this.ecs.addSystem(new Match3ScoringSystem(jewelBehavior))
        this.ecs.addSystem(new SpriteSystem(this.ctx))
        this.ecs.addSystem(new DrawingSystem(this.ctx))
    }

    pause = () => {
        this.canvasContainer.style.visibility = 'hidden'
    }

    resume = () =>  {
        this.canvas.height = 640
        this.canvas.width = 640
        this.canvasContainer.style.visibility = 'visible'
    }

    update = (interval: number) =>  {
        this.timeElapsed += interval
        this.ecs.update(interval)
    }

    // createCenteredGemGrid = (numColumns: number, numRows: number) => {
    //     let centerX = this.canvas.width/2
    //     let centerY = this.canvas.height/2

    //     let halfWidth = ((numColumns + 6) / 2) * Jewel.width
    //     let halfHeight = ((numRows + 2) / 2) * Jewel.width

    //     let x = Math.floor(centerX - halfWidth)
    //     let y = Math.floor(centerY - halfHeight)

    //     let jewelGrid = new JewelGrid(x, y, numColumns, numRows)
    //     this.ecs.addEntity(jewelGrid)
    // }
    
}

export { Match3State }