import { ECS } from "../ecs/ecs.js";
import { PuzzleGrid } from "../ecs/entity/puzzle/puzzlegrid.js";
import { CollisionDetection } from "../ecs/system/collisiondetection.js";
import { SpriteSystem } from "../ecs/system/spritesystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { GravitySystem } from "../ecs/system/gravitysystem.js";
import { MouseGrabSystem } from "../ecs/system/mousegrabsystem.js";
import { MouseSystem } from "../ecs/system/moussystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
class Match3State {
    constructor(game) {
        this.ecs = new ECS();
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
            this.ecs.addSystem(new MouseGrabSystem(mouseSystem));
            this.ecs.addSystem(new GravitySystem());
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            let collisionDetection = new CollisionDetection();
            this.ecs.addSystem(collisionDetection);
            this.ecs.addSystem(new DrawingSystem(this.ctx));
            this.ecs.addSystem(new SpriteSystem(this.ctx));
        };
        this.pause = () => { };
        this.resume = () => { };
        this.update = (interval) => {
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
