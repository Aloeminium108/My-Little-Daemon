import { Scoreboard, ScoreType } from "../../component/graphics/scoreboard.js";
import { UnorderedSystem } from "../system.js";

class ScoreboardSystem extends UnorderedSystem {
    public componentsRequired = new Set([Scoreboard])

    constructor(private displayRules: Map<ScoreType, (value: number) => void>) {
        super()
    }

    public update(interval: number): void {
        this.entities.forEach(entity => {
            let scoreComponent = entity.getComponent(Scoreboard)
            let displayMethod = this.displayRules.get(scoreComponent.scoreType)
            displayMethod?.(scoreComponent.value)
        })
    }
    
}

export {ScoreboardSystem}