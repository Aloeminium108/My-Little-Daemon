import { ECS } from "../ecs/ecs.js";
import { PuzzleGrid } from "../ecs/entity/puzzle/puzzlegrid.js";
import { CollisionDetection } from "../ecs/system/collisiondetection.js";
import { SpriteSystem } from "../ecs/system/spritesystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { GravitySystem } from "../ecs/system/gravitysystem.js";
import { MouseSystem } from "../ecs/system/mousesystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
import { GemGrabSystem } from "../ecs/system/gemgrabsystem.js";
import { Match3System } from "../ecs/system/match3system.js";
import { GemSlotSystem } from "../ecs/system/gemslotsystem.js";
import { JewelCollision } from "../ecs/system/jewelcollision.js";
import { SpatialHashing } from "../ecs/system/spatialhashing.js";
class Match3State {
    constructor(game) {
        this.ecs = new ECS();
        this.timeElapsed = 0;
        this.init = () => {
            this.initEntities();
            this.initSystems();
        };
        this.initEntities = () => {
            let puzzleGrid = new PuzzleGrid(50, 50);
            this.ecs.addEntity(puzzleGrid);
        };
        this.initSystems = () => {
            let mouseSystem = new MouseSystem(this.mouse, this.canvas);
            this.ecs.addSystem(mouseSystem);
            let gemGrabSystem = new GemGrabSystem(mouseSystem);
            this.ecs.addSystem(gemGrabSystem);
            this.ecs.addSystem(new GravitySystem());
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            let spatialHashing = new SpatialHashing(100);
            let collisionDetection = new CollisionDetection(spatialHashing);
            this.ecs.addSystem(collisionDetection);
            this.ecs.addSystem(new JewelCollision(collisionDetection));
            let gemSlotSystem = new GemSlotSystem(collisionDetection);
            this.ecs.addSystem(gemSlotSystem);
            this.ecs.addSystem(new Match3System(gemSlotSystem, gemGrabSystem));
            this.ecs.addSystem(new DrawingSystem(this.ctx));
            this.ecs.addSystem(new SpriteSystem(this.ctx));
        };
        this.pause = () => { };
        this.resume = () => { };
        this.update = (interval) => {
            this.timeElapsed += interval;
            this.ecs.update(interval);
        };
        this.mouseUp = (e) => { };
        this.mouseDown = (e) => { };
        this.mouseMove = (e) => { };
        this.mouseLeave = (e) => { };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        this.init();
    }
}
export { Match3State };
