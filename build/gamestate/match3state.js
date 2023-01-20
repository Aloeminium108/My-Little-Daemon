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
import { Jewel } from "../ecs/entity/puzzle/jewel.js";
import { JewelType } from "../ecs/component/jeweltype.js";
import { Bounds } from "../ecs/component/bounds.js";
import { Hitbox } from "../ecs/component/hitbox.js";
import { Automaton } from "../ecs/component/state.js";
import { JewelCollision } from "../ecs/system/jewelcollision.js";
import { JewelGenerator } from "../ecs/entity/puzzle/jewelgenerator.js";
import { GeneratorSystem } from "../ecs/system/generatorsystem.js";
class Match3State {
    constructor(game) {
        this.ecs = new ECS();
        this.timeElapsed = 0;
        this.numRows = 8;
        this.numColumns = 8;
        this.init = () => {
            this.initEntities();
            this.initSystems();
        };
        this.initEntities = () => {
            for (let i = 0; i < this.numColumns; i++) {
                let generator = new JewelGenerator(i * Jewel.width, -Jewel.width);
                generator.addComponent(new Bounds(0, Jewel.width * this.numColumns, 0, Jewel.width * this.numRows));
                this.ecs.addEntity(generator);
                for (let j = 0; j < this.numRows; j++) {
                    let gem = new Jewel(i * Jewel.width, j * Jewel.width, new JewelType());
                    gem.addComponent(new Bounds(0, Jewel.width * this.numColumns, 0, Jewel.width * this.numRows));
                    this.ecs.addEntity(gem);
                }
            }
        };
        this.initSystems = () => {
            let mouseSystem = new MouseSystem(this.mouse, this.canvas);
            this.ecs.addSystem(mouseSystem);
            let gemGrabSystem = new GemGrabSystem(mouseSystem);
            this.ecs.addSystem(gemGrabSystem);
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            this.ecs.addSystem(new BoundarySystem());
            let spatialHashing = new SpatialHashing(100, new Set([Hitbox, JewelType, Automaton]));
            this.ecs.addSystem(spatialHashing);
            let collisionDetection = new CollisionDetection(spatialHashing);
            this.ecs.addSystem(collisionDetection);
            this.ecs.addSystem(new JewelCollision(collisionDetection));
            this.ecs.addSystem(new JewelBehavior(collisionDetection));
            this.ecs.addSystem(new GeneratorSystem(collisionDetection));
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
