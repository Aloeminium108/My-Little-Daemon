import { Consumer } from "../component/consumable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { PetLink } from "../component/petlink.js";
import { Sprite } from "../component/sprite.js";
import { Automaton, EntityState } from "../component/automaton.js";
import { Entity } from "./entity.js";
class PetEntity extends Entity {
    constructor(x, y, petStats) {
        super();
        this.addComponent(new PetLink());
        this.addPhysicsBody(x, y, 0, PetEntity.spriteSource)
            .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)));
            this.addComponent(new Consumer(petStats));
            return Sprite.loadSprite('./assets/pet-happy.png');
        })
            .then(happySprite => {
            let stateSpriteMap = new Map([
                [EntityState.NEUTRAL, this.getComponent(Sprite).sprite],
                [EntityState.HAPPY, happySprite]
            ]);
            this.addComponent(new Automaton(EntityState.NEUTRAL, this.getComponent(Sprite), stateSpriteMap));
        });
    }
}
PetEntity.spriteSource = './assets/pet-neutral.png';
export { PetEntity };
