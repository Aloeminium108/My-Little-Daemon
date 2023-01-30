import { Generator } from "../../../component/gameplay/generator.js";
import { Hitbox } from "../../../component/physics/hitbox.js";
import { Position } from "../../../component/physics/position.js";
import { Entity } from "../../entity.js";
import { Jewel } from "./jewel.js";
class JewelGenerator extends Entity {
    constructor(x, y) {
        super();
        let position = new Position(x, y);
        this.addComponent(position);
        this.addComponent(new Hitbox(position, Jewel.width, Jewel.width));
        this.addComponent(new Generator());
    }
}
export { JewelGenerator };
