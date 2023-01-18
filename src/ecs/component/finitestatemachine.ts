import { Component } from "./component.js";

class FiniteStateMachine extends Component {

    public stateSet: Map<StateType<State>, State> = new Map()
    public currentState: State

    constructor(...states: State[]) {
        super()
        this.currentState = states[0]
        states.forEach(this.addState)
    }

    addState = <T extends State>(state: State) => {
        this.stateSet.set(state.constructor as StateType<T>, state) 
    }
    
}


abstract class State {

    public abstract connectedStates: Set<StateType<State>>

}

type StateType<T extends State> = new (...args: any[]) => T

export {FiniteStateMachine, State, StateType}