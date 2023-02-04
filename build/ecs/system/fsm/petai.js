import { PetLink } from "../../component/gameplay/petlink.js";
import { Automaton } from "../../component/fsm/automaton.js";
import { FiniteStateMachine } from "./finitestatemachine.js";
class PetAI extends FiniteStateMachine {
    constructor() {
        super();
        this.componentsRequired = new Set([Automaton, PetLink]);
        this.behaviorMap = new Map();
    }
}
export { PetAI };
