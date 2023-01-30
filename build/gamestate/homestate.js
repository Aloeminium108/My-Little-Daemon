import { ECS } from "../ecs/ecs.js";
import { SpriteSystem } from "../ecs/system/spritesystem.js";
import { GravitySystem } from "../ecs/system/gravitysystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { Bounds } from "../ecs/component/bounds.js";
import { BoundarySystem } from "../ecs/system/boundarysystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { Ball } from "../ecs/entity/ball.js";
import { MouseGrabSystem } from "../ecs/system/mousegrabsystem.js";
import { MouseSystem } from "../ecs/system/mousesystem.js";
import { PetEntity } from "../ecs/entity/petentity.js";
import { CollisionDetection } from "../ecs/system/collisiondetection.js";
import { Apple } from "../ecs/entity/food.js";
import { ConsumableSystem } from "../ecs/system/consumablesystem.js";
import { SpatialHashing } from "../ecs/system/spatialhashing.js";
import { PetAI } from "../ecs/system/fsm/petai.js";
import { CollisionResponse } from "../ecs/system/collisionresponse.js";
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
            let petEntity = new PetEntity(position.x, position.y, this.pet.stats);
            this.ecs.addEntity(petEntity);
        };
        this.initSystems = () => {
            let mouseSystem = new MouseSystem(this.mouse, this.canvas);
            this.ecs.addSystem(mouseSystem);
            this.ecs.addSystem(new MouseGrabSystem(mouseSystem));
            this.ecs.addSystem(new GravitySystem());
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            this.ecs.addSystem(new BoundarySystem());
            let spatialHashing = new SpatialHashing(300);
            this.ecs.addSystem(spatialHashing);
            let collisionDetection = new CollisionDetection(spatialHashing);
            this.ecs.addSystem(collisionDetection);
            this.ecs.addSystem(new CollisionResponse(collisionDetection));
            this.ecs.addSystem(new ConsumableSystem(collisionDetection));
            this.ecs.addSystem(new PetAI(mouseSystem));
            this.ecs.addSystem(new SpriteSystem(this.ctx));
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
        this.mouse = game.mouse;
        this.canvas = game.mainCanvas;
        this.init();
    }
}
export { HomeState };
