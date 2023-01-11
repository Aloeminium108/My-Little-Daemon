import { ECS } from "../ecs/ecs.js";
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
import { GravitySystem } from "../ecs/system/gravitysystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { Bounds } from "../ecs/component/bounds.js";
import { BoundarySystem } from "../ecs/system/boundarysystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { Ball } from "../ecs/entity/ball.js";
import { MouseGrabSystem } from "../ecs/system/mousegrabsystem.js";
class GameState {
    constructor(game) {
        this.ecs = new ECS();
        this.floorHeight = 100;
        this.foodButton = () => {
            // this.entityList.addFood(new Food(900, 300, 20))
        };
        this.init = () => {
            let ball = new Ball(200, 100);
            ball.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height));
            this.ecs.addEntity(ball);
            this.ecs.addSystem(new MouseGrabSystem(this.mouse, this.canvas));
            this.ecs.addSystem(new GravitySystem());
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new BoundarySystem());
            this.ecs.addSystem(new FrictionSystem());
            this.ecs.addSystem(new DrawingSystem(this.ctx));
        };
        this.update = (interval) => {
            this.ecs.update(interval);
        };
        this.pause = () => { };
        this.resume = () => { };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        this.init();
    }
}
export { GameState };
