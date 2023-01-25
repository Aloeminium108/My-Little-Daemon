import { Color, SpecialProperty } from "../../component/jeweltype.js";
import { MouseInteractable } from "../../component/mouseinteractable.js";
import { Sprite } from "../../component/sprite.js";
import { Automaton, EntityState } from "../../component/automaton.js";
import { Entity } from "../entity.js";
class Jewel extends Entity {
    constructor(x, y, jewelType) {
        super();
        this.addComponent(jewelType);
        this.addZeroGPhysicsBody(x, y, 5, Jewel.getImageSrc(jewelType))
            .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)));
            this.addComponent(new Automaton(EntityState.FALLING));
        });
    }
}
Jewel.width = 100;
Jewel.getImageSrc = (jewelType) => {
    switch (jewelType.special) {
        case SpecialProperty.COLORBOMB:
            return './assets/gems/jewel-color-bomb.png';
        case SpecialProperty.BOMB:
            switch (jewelType.color) {
                case Color.RED:
                    return './assets/gems/jewel-red-bomb.png';
                case Color.YELLOW:
                    return './assets/gems/jewel-yellow-bomb.png';
                case Color.GREEN:
                    return './assets/gems/jewel-green-bomb.png';
                case Color.BLUE:
                    return './assets/gems/jewel-blue-bomb.png';
                case Color.PURPLE:
                    return './assets/gems/jewel-purple-bomb.png';
                case Color.ORANGE:
                    return './assets/gems/jewel-orange-bomb.png';
                default:
                    return './assets/gems/jewel-red-2.png';
            }
        case SpecialProperty.H_LINECLEAR:
            switch (jewelType.color) {
                case Color.RED:
                    return './assets/gems/horizontal-line-clear-red.png';
                case Color.YELLOW:
                    return './assets/gems/horizontal-line-clear-yellow.png';
                case Color.GREEN:
                    return './assets/gems/horizontal-line-clear-green.png';
                case Color.BLUE:
                    return './assets/gems/horizontal-line-clear-blue.png';
                case Color.PURPLE:
                    return './assets/gems/horizontal-line-clear-purple.png';
                case Color.ORANGE:
                    return './assets/gems/horizontal-line-clear-orange.png';
                default:
                    return './assets/gems/jewel-red-2.png';
            }
        case SpecialProperty.V_LINECLEAR:
            switch (jewelType.color) {
                case Color.RED:
                    return './assets/gems/vertical-line-clear-red.png';
                case Color.YELLOW:
                    return './assets/gems/vertical-line-clear-yellow.png';
                case Color.GREEN:
                    return './assets/gems/vertical-line-clear-green.png';
                case Color.BLUE:
                    return './assets/gems/vertical-line-clear-blue.png';
                case Color.PURPLE:
                    return './assets/gems/vertical-line-clear-purple.png';
                case Color.ORANGE:
                    return './assets/gems/vertical-line-clear-orange.png';
                default:
                    return './assets/gems/jewel-red-2.png';
            }
        default:
            switch (jewelType.color) {
                case Color.RED:
                    return './assets/gems/jewel-red-2.png';
                case Color.YELLOW:
                    return './assets/gems/jewel-yellow-2.png';
                case Color.GREEN:
                    return './assets/gems/jewel-green-2.png';
                case Color.BLUE:
                    return './assets/gems/jewel-blue-2.png';
                case Color.PURPLE:
                    return './assets/gems/jewel-purple-2.png';
                case Color.ORANGE:
                    return './assets/gems/jewel-orange-3.png';
                default:
                    return './assets/gems/jewel-red-2.png';
            }
    }
};
export { Jewel };
