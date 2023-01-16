import { Color, JewelType } from "../../component/jeweltype.js";
import { Position } from "../../component/position.js";
import { Sprite } from "../../component/sprite.js";
import { Entity } from "../entity.js";


class Jewel extends Entity {

    constructor(x: number, y: number, jewelType: JewelType) {
        super()
        this.addComponent(jewelType)
        this.addComponent(new Position(x, y))
        this.addComponent(new Sprite(5, Jewel.getImageSrc(jewelType)))

    }

    static getImageSrc = (jewelType: JewelType) => {
        switch (jewelType.color as Color | null) {
            case Color.RED:
                return '../../assets/jewel-red.png'
            case Color.YELLOW:
                return '../../assets/jewel-yellow.png'
            case Color.GREEN:
                return '../../assets/jewel-green.png'
            case Color.BLUE:
                return '../../assets/jewel-blue.png'
            default:
                return '../../assets/jewel-black.png'
        }
    }

}


export { Jewel }