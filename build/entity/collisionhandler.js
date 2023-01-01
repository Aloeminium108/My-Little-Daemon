import { Entity } from "./entity.js";
class CollisionHandler {
    constructor(entityList, xBound, yBound) {
        this.handleEntityCollisions = () => {
            // Entity on boundary collision
            this.entityList.fullList().forEach((entity) => {
                entity.boundaryCollision(this.xBound, this.yBound);
            });
            // PetEntity on toy collision
            this.entityList.getToys().forEach((toy) => {
                if (Entity.detectCollision(this.entityList.getPet(), toy)) {
                    console.log("Pet got bonked by toy");
                }
            });
            // PetEntity on food collision
            this.entityList.getFood().forEach((food, index) => {
                if (Entity.detectCollision(this.entityList.getPet(), food)) {
                    console.log("Pet stepped in food");
                    this.entityList.getPet().feed(food);
                    this.entityList.removeFood(index);
                }
            });
            // Everything else collisions
            let simples = this.entityList.getSimpleEntities();
            simples.forEach((simple, index) => {
                for (let i = index + 1; i < simples.length; i++) {
                    if (Entity.detectCollision(simple, simples[i])) {
                        console.log("Collision detected");
                    }
                }
            });
        };
        this.entityList = entityList;
        this.xBound = xBound;
        this.yBound = yBound;
    }
}
export { CollisionHandler };
