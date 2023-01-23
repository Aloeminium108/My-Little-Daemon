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
import { Jewel } from "../ecs/entity/puzzle/jewel.js";
import { JewelType } from "../ecs/component/jeweltype.js";
import { Bounds } from "../ecs/component/bounds.js";
import { Hitbox } from "../ecs/component/hitbox.js";
import { Automaton } from "../ecs/component/automaton.js";
import { JewelCollision } from "../ecs/system/jewelcollision.js";
import { JewelGenerator } from "../ecs/entity/puzzle/jewelgenerator.js";
import { GeneratorSystem } from "../ecs/system/generatorsystem.js";
import { Match3ScoringSystem } from "../ecs/system/match3scoring.js";
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
import { Scoreboard } from "../ecs/entity/puzzle/scoreboard.js";
import { CollisionResponse } from "../ecs/system/collisionresponse.js";

class Match3State implements GameState {
    game: Game;
    pet: Pet;

    ecs = new ECS()

    mouse: Mouse
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    timeElapsed: number = 0

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

        this.createGemGrid(100, 0, 10, 10)

        let scoreboard = new Scoreboard(800, 300)
        this.ecs.addEntity(scoreboard)

    }

    initSystems = () => {
        let mouseSystem = new MouseSystem (this.mouse, this.canvas)
        this.ecs.addSystem(mouseSystem)
        let gemGrabSystem = new GemGrabSystem(mouseSystem)
        this.ecs.addSystem(gemGrabSystem)
        this.ecs.addSystem(new VelocitySystem())
        this.ecs.addSystem(new FrictionSystem())
        this.ecs.addSystem(new BoundarySystem())
        let spatialHashing = new SpatialHashing(100, new Set([Hitbox, JewelType, Automaton]))
        this.ecs.addSystem(spatialHashing)
        let collisionDetection = new CollisionDetection(spatialHashing)
        this.ecs.addSystem(collisionDetection)
        this.ecs.addSystem(new CollisionResponse(collisionDetection))
        this.ecs.addSystem(new GeneratorSystem(collisionDetection))
        let jewelBehavior = new JewelBehavior(collisionDetection, gemGrabSystem)
        this.ecs.addSystem(jewelBehavior)
        this.ecs.addSystem(new Match3ScoringSystem(jewelBehavior))
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

    private createGemGrid = (x: number, y: number, numRows: number, numColumns: number) => {
        for (let i = 0; i < numColumns; i++) {
            let generator = new JewelGenerator(x + (i * Jewel.width), y - Jewel.width)
            generator.addComponent(new Bounds(x, x + (Jewel.width * numColumns), y - Jewel.width, y + (Jewel.width * numRows), 0))
            this.ecs.addEntity(generator)
            for (let j = 0; j < numRows; j++) {
                let gem = new Jewel(x + (i * Jewel.width), y + (j * Jewel.width), new JewelType())
                gem.addComponent(new Bounds(x, x + (Jewel.width * numColumns), y - Jewel.width, y + (Jewel.width * numRows), 0))
                this.ecs.addEntity(gem)
            }
        }
    }
    
}

export { Match3State }