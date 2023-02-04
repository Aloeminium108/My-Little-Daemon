import { SpecialProperty } from "../../component/gameplay/jeweltype.js";
import { Scoreboard, ScoreType } from "../../component/graphics/scoreboard.js";
import { UnorderedSystem } from "../system.js";
const COMBO_VALUE = 10;
const COMBO_TIME = 1000;
class Match3ScoringSystem extends UnorderedSystem {
    constructor(jewelBehavior) {
        super();
        this.jewelBehavior = jewelBehavior;
        this.comboCount = 0;
        this.comboTimer = 0;
        this.componentsRequired = new Set([Scoreboard]);
    }
    update(interval) {
        this.comboTimer -= interval;
        if (this.comboTimer <= 0) {
            this.comboTimer = 0;
            this.comboCount = 0;
        }
        let combo = this.comboCount;
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
            this.comboTimer = COMBO_TIME;
            this.comboCount++;
        }
        this.entities.forEach(entity => {
            let display = entity.getComponent(Scoreboard);
            switch (display.scoreType) {
                case ScoreType.SCORE:
                    display.value += score;
                    break;
                case ScoreType.COMBO:
                    display.value = combo;
                    break;
                case ScoreType.MOVES:
                    // if (this.gemGrabSystem.moveMade){
                    //     display.value--
                    // }
                    break;
                case ScoreType.PROGESS:
                    if (score > 0) {
                        display.value = score;
                    }
                    else {
                        display.value = 0;
                    }
                    break;
            }
        });
    }
}
export { Match3ScoringSystem };
