class State {
    constructor(game) {
        this.game = game;
        this.pet = game.pet;
    }
}
var StateTransition;
(function (StateTransition) {
    StateTransition[StateTransition["MENU"] = 0] = "MENU";
    StateTransition[StateTransition["GAME"] = 1] = "GAME";
})(StateTransition || (StateTransition = {}));
export { State, StateTransition };
