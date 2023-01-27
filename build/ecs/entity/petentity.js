import { Consumer } from "../component/consumable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { PetLink } from "../component/petlink.js";
import { Sprite } from "../component/sprite.js";
import { Automaton, EntityState } from "../component/automaton.js";
import { Entity } from "./entity.js";
import { Hitbox } from "../component/hitbox.js";
import { Position } from "../component/position.js";
class PetEntity extends Entity {
    constructor(x, y, petStats) {
        super();
        this.addComponent(new PetLink());
        let position = new Position(x, y);
        this.addComponent(position);
        let sprite = new Sprite(0, PetEntity.spriteSource);
        this.addComponent(sprite);
        sprite.loadingPromise = sprite.loadingPromise
            .then(() => {
            this.addComponent(new Hitbox(position, sprite.sprite.width, sprite.sprite.height));
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
PetEntity.width = 400;
PetEntity.height = 300;
export { PetEntity };
