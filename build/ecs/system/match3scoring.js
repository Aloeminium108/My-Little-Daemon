import { SpecialProperty } from "../component/jeweltype.js";
import { Score } from "../component/score.js";
import { UnorderedSystem } from "./system.js";
class Match3ScoringSystem extends UnorderedSystem {
    constructor(jewelBehavior) {
        super();
        this.jewelBehavior = jewelBehavior;
        this.componentsRequired = new Set([Score]);
    }
    update(interval) {
        let score = 0;
        let destroyedGems = this.jewelBehavior.destroyedGems;
        while (destroyedGems.length > 0) {
            let gem = destroyedGems.pop();
            switch (gem === null || gem === void 0 ? void 0 : gem.special) {
                case null:
                    score += 100;
                    break;
                case SpecialProperty.LINECLEAR:
                    score += 1500;
                    break;
                case SpecialProperty.BOMB:
                    score += 3000;
                    break;
                case SpecialProperty.COLORBOMB:
                    score += 6000;
                    break;
                case SpecialProperty.ULTRABOMB:
                    score += 3000;
                    break;
            }
        }
        this.entities.forEach(entity => {
            entity.getComponent(Score).score += score;
        });
    }
}
export { Match3ScoringSystem };
