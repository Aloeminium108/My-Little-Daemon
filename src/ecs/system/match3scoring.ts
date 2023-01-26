import { SpecialProperty } from "../component/jeweltype.js";
import { Score, ScoreType } from "../component/score.js";
import { JewelBehavior } from "./fsm/jewelbehavior.js";
import { UnorderedSystem } from "./system.js";

const COMBO_VALUE = 10

class Match3ScoringSystem extends UnorderedSystem {
    public componentsRequired = new Set([Score])

    constructor(private jewelBehavior: JewelBehavior) {
        super()
    }

    public update(interval: number): void {
        let combo = this.jewelBehavior.comboCount
        let moves = this.jewelBehavior.moveCount
        let score = 0
        let destroyedGems = this.jewelBehavior.destroyedGems
        while (destroyedGems.length > 0) {
            let gem = destroyedGems.pop()
            score += combo * COMBO_VALUE
            switch (gem?.special as SpecialProperty | null) {
                case null:
                    score += 100
                    break
                case SpecialProperty.H_LINECLEAR:
                case SpecialProperty.V_LINECLEAR:
                    score += 1500
                    break
                case SpecialProperty.BOMB:
                    score += 3000
                    break
                case SpecialProperty.COLORBOMB:
                    score += 6000
                    break
                case SpecialProperty.ULTRABOMB:
                    score += 3000
                    break
            }
        }

        this.entities.forEach(entity => {
            let display = entity.getComponent(Score)

            switch (display.scoreType as ScoreType) {
                case ScoreType.SCORE:
                    display.score += score
                    break
                case ScoreType.COMBO:
                    display.score = combo
                    break
                case ScoreType.MOVES:
                    display.score = moves
                    break 
            }
        })
    }

}

export {Match3ScoringSystem}