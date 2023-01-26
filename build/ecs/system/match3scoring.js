import { SpecialProperty } from "../component/jeweltype.js";
import { Score, ScoreType } from "../component/score.js";
import { UnorderedSystem } from "./system.js";
const COMBO_VALUE = 10;
class Match3ScoringSystem extends UnorderedSystem {
    constructor(jewelBehavior) {
        super();
        this.jewelBehavior = jewelBehavior;
        this.componentsRequired = new Set([Score]);
    }
    update(interval) {
        let combo = this.jewelBehavior.comboCount;
        let moves = this.jewelBehavior.moveCount;
        let score = 0;
        let destroyedGems = this.jewelBehavior.destroyedGems;
        while (destroyedGems.length > 0) {
            let gem = destroyedGems.pop();
            score += combo * COMBO_VALUE;
            switch (gem === null || gem === void 0 ? void 0 : gem.special) {
                case null:
                    score += 100;
                    break;
                case SpecialProperty.H_LINECLEAR:
                case SpecialProperty.V_LINECLEAR:
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
            let display = entity.getComponent(Score);
            switch (display.scoreType) {
                case ScoreType.SCORE:
                    display.score += score;
                    break;
                case ScoreType.COMBO:
                    display.score = combo;
                    break;
                case ScoreType.MOVES:
                    display.score = moves;
                    break;
            }
        });
    }
}
export { Match3ScoringSystem };
