import { MouseComponent2 } from "../component/controls/mousecomponent2.js";
import { Hitbox } from "../component/physics/hitbox.js";
import { Position } from "../component/physics/position.js";
import { Entity } from "./entity.js";
class MouseEntity2 extends Entity {
    constructor() {
        super();
        let position = new Position(0, 0);
        let hitbox = new Hitbox(position, 0, 0);
        this.addComponent(position);
        this.addComponent(hitbox);
        this.addComponent(new MouseComponent2());
    }
}
export { MouseEntity2 as MouseEntity2 };
