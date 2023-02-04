import { ECS } from "../ecs/ecs.js";
import { SpriteSystem } from "../ecs/system/graphics/spritesystem.js";
import { GravitySystem } from "../ecs/system/physics/gravitysystem.js";
import { VelocitySystem } from "../ecs/system/physics/velocitysystem.js";
import { Bounds } from "../ecs/component/physics/bounds.js";
import { BoundarySystem } from "../ecs/system/physics/boundarysystem.js";
import { FrictionSystem } from "../ecs/system/physics/frictionsystem.js";
import { Ball } from "../ecs/entity/toys/ball.js";
import { MouseGrabSystem } from "../ecs/system/controls/mousegrabsystem.js";
import { MouseOverSystem } from "../ecs/system/controls/mouseoversystem.js";
import { PetEntity } from "../ecs/entity/pet/petentity.js";
import { CollisionDetection } from "../ecs/system/physics/collisiondetection.js";
import { Apple } from "../ecs/entity/food/apple.js";
import { ConsumableSystem } from "../ecs/system/gameplay/consumablesystem.js";
import { SpatialHashing } from "../ecs/system/physics/spatialhashing.js";
import { PetAI } from "../ecs/system/fsm/petai.js";
import { CollisionResponse } from "../ecs/system/physics/collisionresponse.js";
import { MouseSystem } from "../ecs/system/controls/mousesystem.js";
import { MouseSynthesisSystem } from "../ecs/system/controls/mousesynthesissystem.js";
import { MouseEntity } from "../ecs/entity/mouseEntity.js";
const RELATIVE_CUSHION_POSITION = 0.85;
class HomeState {
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.ecs = new ECS();
        this.floorHeight = 100;
        this.foodButton = () => {
            let food = new Apple(100, 300);
            food.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height));
            this.ecs.addEntity(food);
        };
        this.init = () => {
            this.initEntities();
            this.initSystems();
        };
        this.initEntities = () => {
            let mouseEntity = new MouseEntity();
            this.ecs.addEntity(mouseEntity);
            let ball = new Ball(200, 100);
            ball.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height));
            let ball1 = new Ball(400, 100);
            ball1.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height));
            let ball2 = new Ball(600, 100);
            ball2.addComponent(new Bounds(0, this.canvas.width, 0, this.canvas.height));
            this.ecs.addEntity(ball);
            this.ecs.addEntity(ball1);
            this.ecs.addEntity(ball2);
            let position = this.findCushionPosition(PetEntity.width, PetEntity.height);
            let petEntity = new PetEntity(position.x, position.y, this.pet);
            this.ecs.addEntity(petEntity);
        };
        this.initSystems = () => {
            this.ecs.addSystem(new MouseGrabSystem());
            this.ecs.addSystem(new GravitySystem());
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            this.ecs.addSystem(new BoundarySystem());
            this.ecs.addSystem(new SpatialHashing(300));
            this.ecs.addSystem(new CollisionDetection());
            this.ecs.addSystem(new CollisionResponse());
            this.ecs.addSystem(new ConsumableSystem());
            this.ecs.addSystem(new PetAI());
            this.ecs.addSystem(new SpriteSystem(this.ctx));
            this.ecs.addSystem(new MouseSystem());
            this.ecs.addSystem(new MouseOverSystem());
            this.ecs.addSystem(new MouseSynthesisSystem(this.canvas));
        };
        this.update = (interval) => {
            this.ecs.update(interval);
        };
        this.pause = () => {
            this.canvas.style.backgroundImage = "url(./assets/room/living-room-blurred.png)";
        };
        this.resume = () => {
            this.canvas.style.backgroundImage = "url(./assets/room/living-room-scaled.png)";
        };
        this.findCushionPosition = (width, height) => {
            let centerX = this.canvas.width / 2;
            let x = Math.floor(centerX - (width / 2));
            let cushionHeight = this.canvas.height * (RELATIVE_CUSHION_POSITION);
            let y = Math.floor(cushionHeight - height);
            return { x: x, y: y };
        };
        this.game = game;
        this.pet = game.pet;
        this.canvas = game.mainCanvas;
        this.init();
    }
}
export { HomeState };
