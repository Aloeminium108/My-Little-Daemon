import { Automaton } from "../../component/fsm/automaton.js";
import { UnorderedSystem } from "../system.js";
class FiniteStateMachine extends UnorderedSystem {
    constructor() {
        super(...arguments);
        this.update = (interval) => {
            this.preAutomation(interval);
            // Execute the appropriate behavior for each automaton
            // based on its current state
            this.entities.forEach(entity => {
                var _a;
                let fsm = entity.getComponent(Automaton);
                fsm.update(interval);
                (_a = this.behaviorMap.get(fsm.currentState)) === null || _a === void 0 ? void 0 : _a(entity);
            });
            this.postAutomation(interval);
        };
        // If a finite state machine needs logic to execute
        // before or after executing the behavior for any
        // of its automata, these methods may be overridden
        this.preAutomation = (interval) => { };
        this.postAutomation = (interval) => { };
    }
}
export { FiniteStateMachine };
