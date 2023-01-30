import { Bounds } from "../../../component/physics/bounds.js";
import { JewelType } from "../../../component/gameplay/jeweltype.js";
import { Entity } from "../../entity.js";
import { Jewel } from "./jewel.js";
import { JewelGenerator } from "./jewelgenerator.js";
class JewelGrid extends Entity {
    constructor(x, y, numColumns, numRows) {
        super();
        for (let i = 0; i < numColumns; i++) {
            let generator = new JewelGenerator(x + (Jewel.width * i), y - Jewel.width);
            generator.addComponent(new Bounds(x, x + (Jewel.width * numColumns), y - Jewel.width, y + (Jewel.width * numRows), 0));
            this.childEntities.add(generator);
            for (let j = 0; j < numRows; j++) {
                let gem = new Jewel(x + (i * Jewel.width), y + (j * Jewel.width), new JewelType());
                gem.addComponent(new Bounds(x, x + (Jewel.width * numColumns), y - Jewel.width, y + (Jewel.width * numRows), 0));
                this.childEntities.add(gem);
            }
        }
    }
}
export { JewelGrid };
