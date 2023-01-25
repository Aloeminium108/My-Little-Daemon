import { SpecialProperty } from "../component/jeweltype.js";
import { Score } from "../component/score.js";
import { JewelBehavior } from "./fsm/jewelbehavior.js";
import { UnorderedSystem } from "./system.js";

class Match3ScoringSystem extends UnorderedSystem {
    public componentsRequired = new Set([Score])

    constructor(private jewelBehavior: JewelBehavior) {
        super()
    }

    public update(interval: number): void {
        let score = 0
        let destroyedGems = this.jewelBehavior.destroyedGems
        while (destroyedGems.length > 0) {
            let gem = destroyedGems.pop()
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
            entity.getComponent(Score).score += score
        })
    }

}

export {Match3ScoringSystem}