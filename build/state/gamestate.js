import { ECS } from "../ecs/ecs.js";
import { Entity } from "../ecs/entity/entity.js";
import { Sprite } from "../ecs/component/sprite.js";
import { Position } from "../ecs/component/position.js";
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
import { MouseGrabSystem } from "../ecs/system/mousegrabsystem.js";
import { Hitbox } from "../ecs/component/hitbox.js";
import { GravitySystem } from "../ecs/system/gravitysystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { Gravity } from "../ecs/component/gravity.js";
import { Velocity } from "../ecs/component/velocity.js";
import { Bounds } from "../ecs/component/bounds.js";
import { BoundarySystem } from "../ecs/system/boundarysystem.js";
import { Friction } from "../ecs/component/friction.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { MouseGrabbable } from "../ecs/component/mousegrabbable.js";
class GameState {
    constructor(game) {
        this.ecs = new ECS();
        this.floorHeight = 100;
        this.foodButton = () => {
            // this.entityList.addFood(new Food(900, 300, 20))
        };
        this.init = () => {
            let box = new Entity();
            let position = new Position(50, 50);
            let sprite = new Sprite(0, ctx => {
                ctx.fillRect(Math.round(box.getComponent(Position).x), Math.round(box.getComponent(Position).y), 50, 50);
            });
            box.addComponent(position);
            box.addComponent(new Hitbox(position, 50, 50));
            box.addComponent(sprite);
            box.addComponent(new MouseGrabbable(sprite));
            box.addComponent(new Gravity());
            box.addComponent(new Friction());
            box.addComponent(new Velocity(0, 0));
            box.addComponent(new Bounds(0, this.game.canvas.width, 0, this.game.canvas.height));
            this.ecs.addEntity(box);
            this.ecs.addSystem(new DrawingSystem());
            this.ecs.addSystem(new MouseGrabSystem(this.mouse, this.game.canvas));
            this.ecs.addSystem(new GravitySystem());
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new BoundarySystem());
            this.ecs.addSystem(new FrictionSystem());
        };
        this.update = (interval) => {
            this.ecs.update(interval);
        };
        this.animate = (ctx) => {
            this.ecs.animate(ctx);
        };
        this.pause = () => { };
        this.resume = () => { };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.init();
    }
}
export { GameState };
