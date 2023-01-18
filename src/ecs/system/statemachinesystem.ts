import { ComponentType, Component } from "../component/component.js";
import { FiniteStateMachine } from "../component/finitestatemachine";
import { UnorderedSystem } from "./system.js";

class StateMachineSystem extends UnorderedSystem {
    public componentsRequired = new Set([FiniteStateMachine])

    public update(interval: number): void {
        this.entities.forEach(entity => {
            let fsm = entity.getComponent(FiniteStateMachine)
        })
    }
    
}

export {StateMachineSystem}