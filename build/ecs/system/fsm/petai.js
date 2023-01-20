import { PetLink } from "../../component/pet.js";
import { Automaton, State } from "../../component/state.js";
import { FiniteStateMachine } from "./finitestatemachine.js";
class PetAI extends FiniteStateMachine {
    constructor(mouseSystem) {
        super();
        this.mouseSystem = mouseSystem;
        this.componentsRequired = new Set([Automaton, PetLink]);
        this.behaviorMap = new Map([
            [State.NEUTRAL, (entity) => {
                    if (entity === this.mouseSystem.heldEntity)
                        entity.getComponent(Automaton).changeState(State.HAPPY);
                }],
            [State.HAPPY, (entity) => {
                    if (entity !== this.mouseSystem.heldEntity)
                        entity.getComponent(Automaton).changeState(State.NEUTRAL);
                }]
        ]);
    }
}
export { PetAI };
