import { ECS } from "../ecs/ecs.js";
import { CollisionDetection } from "../ecs/system/collisiondetection.js";
import { SpriteSystem } from "../ecs/system/spritesystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { MouseSystem } from "../ecs/system/mousesystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
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
import { CollisionResponse } from "../ecs/system/collisionresponse.js";
import { JewelGrid } from "../ecs/entity/puzzle/jewelgrid.js";
class Match3State {
    constructor(game, ctx, canvasContainer) {
        this.game = game;
        this.ctx = ctx;
        this.canvasContainer = canvasContainer;
        this.ecs = new ECS();
        this.timeElapsed = 0;
        this.init = () => {
            this.initEntities();
            this.initSystems();
        };
        this.initEntities = () => {
            let jewelGrid = new JewelGrid(0, 0, 8, 8);
            this.ecs.addEntity(jewelGrid);
        };
        this.initSystems = () => {
            let mouseSystem = new MouseSystem(this.mouse, this.canvas);
            this.ecs.addSystem(mouseSystem);
            let gemGrabSystem = new GemGrabSystem(mouseSystem);
            this.ecs.addSystem(gemGrabSystem);
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            this.ecs.addSystem(new BoundarySystem());
            let spatialHashing = new SpatialHashing(160, new Set([Hitbox, JewelType, Automaton]));
            this.ecs.addSystem(spatialHashing);
            let collisionDetection = new CollisionDetection(spatialHashing);
            this.ecs.addSystem(collisionDetection);
            this.ecs.addSystem(new CollisionResponse(collisionDetection));
            this.ecs.addSystem(new GeneratorSystem(collisionDetection));
            let jewelBehavior = new JewelBehavior(collisionDetection, gemGrabSystem);
            this.ecs.addSystem(jewelBehavior);
            this.ecs.addSystem(new Match3ScoringSystem(jewelBehavior));
            this.ecs.addSystem(new SpriteSystem(this.ctx));
            this.ecs.addSystem(new DrawingSystem(this.ctx));
        };
        this.pause = () => {
            this.canvasContainer.style.visibility = 'hidden';
        };
        this.resume = () => {
            this.canvas.height = 640;
            this.canvas.width = 640;
            this.canvasContainer.style.visibility = 'visible';
        };
        this.update = (interval) => {
            this.timeElapsed += interval;
            this.ecs.update(interval);
        };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.canvas = game.secondaryCanvas;
        this.init();
    }
}
export { Match3State };
