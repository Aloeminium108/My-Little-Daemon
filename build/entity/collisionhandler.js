import { Body } from "./body/body.js";
class CollisionHandler {
    constructor(entityList, xBound, yBound) {
        this.handleEntityCollisions = () => {
            // Entity on boundary collision
            this.entityList.fullList().forEach((entity) => {
                entity.getBody().boundaryCollision(this.xBound, this.yBound);
            });
            // PetEntity on toy collision
            this.entityList.getToys().forEach((toy) => {
                if (Body.detectCollision(this.entityList.getPet().getBody(), toy.getBody())) {
                    console.log("Pet got bonked by toy");
                }
            });
            // PetEntity on food collision
            this.entityList.getFood().forEach((food, index) => {
                if (Body.detectCollision(this.entityList.getPet().getBody(), food.getBody())) {
                    console.log("Pet stepped in food");
                    this.entityList.getPet().feed(food);
                    this.entityList.removeFood(index);
                }
            });
            // Everything else collisions
            let simples = this.entityList.getSimpleEntities();
            simples.forEach((simple, index) => {
                for (let i = index + 1; i < simples.length; i++) {
                    if (Body.detectCollision(simple.getBody(), simples[i].getBody())) {
                        console.log("Collision detected");
                    }
                }
            });
        };
        this.detectMouseCollisions = (mouse) => {
            for (let entity of this.entityList.fullList().reverse()) {
                if (entity.getBody().inside(mouse.x, mouse.y)) {
                    return entity;
                }
            }
            return null;
        };
        this.entityList = entityList;
        this.xBound = xBound;
        this.yBound = yBound;
    }
}
export { CollisionHandler };
