import { PetLink } from "../../component/gameplay/petlink.js";
import { Automaton, EntityState } from "../../component/fsm/automaton.js";
import { FiniteStateMachine } from "./finitestatemachine.js";
class PetAI extends FiniteStateMachine {
    constructor(mouseSystem) {
        super();
        this.mouseSystem = mouseSystem;
        this.componentsRequired = new Set([Automaton, PetLink]);
        this.behaviorMap = new Map([
            [EntityState.NEUTRAL, (entity) => {
                    if (entity === this.mouseSystem.heldEntity)
                        entity.getComponent(Automaton).changeState(EntityState.HAPPY);
                }],
            [EntityState.HAPPY, (entity) => {
                    if (entity !== this.mouseSystem.heldEntity)
                        entity.getComponent(Automaton).changeState(EntityState.NEUTRAL);
                }]
        ]);
    }
}
export { PetAI };
