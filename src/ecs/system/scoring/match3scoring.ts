import { SpecialProperty } from "../../component/jeweltype.js";
import { Scoreboard, ScoreType } from "../../component/scoreboard.js";
import { JewelBehavior } from "../fsm/jewelbehavior.js";
import { UnorderedSystem } from "../system.js";

const COMBO_VALUE = 10
const COMBO_TIME = 1000

class Match3ScoringSystem extends UnorderedSystem {

    public comboCount = 0

    private comboTimer = 0

    public componentsRequired = new Set([Scoreboard])

    constructor(private jewelBehavior: JewelBehavior) {
        super()
    }

    public update(interval: number): void {

        this.comboTimer -= interval
        if (this.comboTimer <= 0) {
            this.comboTimer = 0
            this.comboCount = 0
        }

        let combo = this.comboCount
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

            this.comboTimer = COMBO_TIME
            this.comboCount++

        }

        this.entities.forEach(entity => {
            let display = entity.getComponent(Scoreboard)

            switch (display.scoreType as ScoreType) {
                case ScoreType.SCORE:
                    display.value += score
                    break
                case ScoreType.COMBO:
                    display.value = combo
                    break
            }
        })
    }

}

export {Match3ScoringSystem}