import { Color, JewelType, SpecialProperty } from "../../component/jeweltype.js";
import { MouseInteractable } from "../../component/mouseinteractable.js";
import { Sprite } from "../../component/sprite.js";
import { Automaton, EntityState } from "../../component/automaton.js";
import { Entity } from "../entity.js";


class Jewel extends Entity {

    constructor(x: number, y: number, jewelType: JewelType) {
        super()
        this.addComponent(jewelType)
        this.addZeroGPhysicsBody(x, y, 5, Jewel.getImageSrc(jewelType))
        .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
            this.addComponent(new Automaton(EntityState.FALLING))
        })
    }

    static width = 40

    static getImageSrc = (jewelType: JewelType) => {
        switch (jewelType.special as SpecialProperty | null) {
            case SpecialProperty.BOMB:
                switch (jewelType.color as Color | null) {
                    case Color.RED:
                        return './assets/jewel-red-bomb.png'
                    case Color.YELLOW:
                        return './assets/jewel-yellow-bomb.png'
                    case Color.GREEN:
                        return './assets/jewel-green-bomb.png'
                    case Color.BLUE:
                        return './assets/jewel-blue-bomb.png'
                    case Color.PURPLE:
                        return './assets/jewel-purple-bomb.png'
                    default:
                        return './assets/jewel-black.png'
                }

            default:
                switch (jewelType.color as Color | null) {
                    case Color.RED:
                        return './assets/jewel-red.png'
                    case Color.YELLOW:
                        return './assets/jewel-yellow.png'
                    case Color.GREEN:
                        return './assets/jewel-green.png'
                    case Color.BLUE:
                        return './assets/jewel-blue.png'
                    case Color.PURPLE:
                        return './assets/jewel-purple.png'
                    default:
                        return './assets/jewel-black.png'
                }
        }
    }

}


export { Jewel }