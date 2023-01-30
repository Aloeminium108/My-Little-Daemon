import { Scoreboard } from "../../component/graphics/scoreboard.js";
import { UnorderedSystem } from "../system.js";
class ScoreboardSystem extends UnorderedSystem {
    constructor(displayRules) {
        super();
        this.displayRules = displayRules;
        this.componentsRequired = new Set([Scoreboard]);
    }
    update(interval) {
        this.entities.forEach(entity => {
            let scoreComponent = entity.getComponent(Scoreboard);
            let displayMethod = this.displayRules.get(scoreComponent.scoreType);
            displayMethod === null || displayMethod === void 0 ? void 0 : displayMethod(scoreComponent.value);
        });
    }
}
export { ScoreboardSystem };
