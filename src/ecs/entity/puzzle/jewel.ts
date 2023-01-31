import { MouseInteractable } from "../../component/controls/mouseinteractable"
import { Automaton, EntityState } from "../../component/fsm/automaton"
import { Color, JewelType, SpecialProperty } from "../../component/gameplay/jeweltype"
import { Sprite } from "../../component/graphics/sprite"
import { Entity } from "../entity"



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

    static width = 80

    static getImageSrc = (jewelType: JewelType) => {
        switch (jewelType.special as SpecialProperty | null) {

            case SpecialProperty.COLORBOMB:
                return './assets/gems/jewel-color-bomb.png'

            case SpecialProperty.BOMB:
                switch (jewelType.color as Color | null) {
                    case Color.RED:
                        return './assets/gems/jewel-red-bomb.png'
                    case Color.YELLOW:
                        return './assets/gems/jewel-yellow-bomb.png'
                    case Color.GREEN:
                        return './assets/gems/jewel-green-bomb.png'
                    case Color.BLUE:
                        return './assets/gems/jewel-blue-bomb.png'
                    case Color.PURPLE:
                        return './assets/gems/jewel-purple-bomb.png'
                    case Color.ORANGE:
                        return './assets/gems/jewel-orange-bomb.png'
                    default:
                        return './assets/gems/jewel-red-2.png'
                }
            
            case SpecialProperty.H_LINECLEAR:
                switch (jewelType.color as Color | null) {
                    case Color.RED:
                        return './assets/gems/horizontal-line-clear-red.png'
                    case Color.YELLOW:
                        return './assets/gems/horizontal-line-clear-yellow.png'
                    case Color.GREEN:
                        return './assets/gems/horizontal-line-clear-green.png'
                    case Color.BLUE:
                        return './assets/gems/horizontal-line-clear-blue.png'
                    case Color.PURPLE:
                        return './assets/gems/horizontal-line-clear-purple.png'
                    case Color.ORANGE:
                        return './assets/gems/horizontal-line-clear-orange.png'
                    default:
                        return './assets/gems/jewel-red-2.png'
                }

            case SpecialProperty.V_LINECLEAR:
                switch (jewelType.color as Color | null) {
                    case Color.RED:
                        return './assets/gems/vertical-line-clear-red.png'
                    case Color.YELLOW:
                        return './assets/gems/vertical-line-clear-yellow.png'
                    case Color.GREEN:
                        return './assets/gems/vertical-line-clear-green.png'
                    case Color.BLUE:
                        return './assets/gems/vertical-line-clear-blue.png'
                    case Color.PURPLE:
                        return './assets/gems/vertical-line-clear-purple.png'
                    case Color.ORANGE:
                        return './assets/gems/vertical-line-clear-orange.png'
                    default:
                        return './assets/gems/jewel-red-2.png'
                }

            default:
                switch (jewelType.color as Color | null) {
                    case Color.RED:
                        return './assets/gems/jewel-red-2.png'
                    case Color.YELLOW:
                        return './assets/gems/jewel-yellow-2.png'
                    case Color.GREEN:
                        return './assets/gems/jewel-green-2.png'
                    case Color.BLUE:
                        return './assets/gems/jewel-blue-2.png'
                    case Color.PURPLE:
                        return './assets/gems/jewel-purple-2.png'
                    case Color.ORANGE:
                        return './assets/gems/jewel-orange-3.png'
                    default:
                        return './assets/gems/jewel-red-2.png'
                }
        }
    }

}


export { Jewel }