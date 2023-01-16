import { Gravity } from "../../component/gravity.js";
import { Hitbox } from "../../component/hitbox.js";
import { Color, JewelType } from "../../component/jeweltype.js";
import { MouseInteractable } from "../../component/mouseinteractable.js";
import { Position } from "../../component/position.js";
import { Sprite } from "../../component/sprite.js";
import { Entity } from "../entity.js";


class Jewel extends Entity {

    constructor(x: number, y: number, jewelType: JewelType) {
        super()
        this.addComponent(jewelType)
        this.addPhysicsBody(x, y, 5, Jewel.getImageSrc(jewelType))
        .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
            this.deleteComponent(Gravity)
        })
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