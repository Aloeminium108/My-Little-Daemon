import { Bounds } from "../../component/bounds.js";
import { Hitbox } from "../../component/hitbox.js";
import { JewelType } from "../../component/jeweltype.js";
import { Automaton, EntityState } from "../../component/automaton.js";
import { Velocity } from "../../component/velocity.js";
import { FiniteStateMachine } from "./finitestatemachine.js";
class JewelBehavior extends FiniteStateMachine {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([Automaton, JewelType]);
        // Sets gems that are connected along the X and Y axis
        this.connectedGemsX = new Map();
        this.connectedGemsY = new Map();
        this.destroyedGems = new Array();
        this.behaviorMap = new Map([
            [EntityState.FALLING, (entity) => {
                    let fsm = entity.getComponent(Automaton);
                    let bounds = entity.getComponent(Bounds);
                    if (bounds.onGround) {
                        entity.getComponent(Velocity).dy = 0;
                        fsm.changeState(EntityState.UNMATCHED);
                        bounds.onGround = false;
                        return;
                    }
                    entity.getComponent(Velocity).dy += 0.7;
                }],
            [EntityState.MATCHED, (entity) => {
                    var _a;
                    let age = entity.getComponent(Automaton).age;
                    if (age >= 120) {
                        this.destroyedGems.push(entity.getComponent(JewelType));
                        (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.removeEntity(entity);
                    }
                    let jewelType = entity.getComponent(JewelType);
                    let hitbox = entity.getComponent(Hitbox);
                    let sensedDown = this.senseDown(hitbox);
                    let sensedRight = this.senseRight(hitbox);
                    this.connectDown(entity, jewelType, sensedDown);
                    this.connectRight(entity, jewelType, sensedRight);
                }],
            [EntityState.UNMATCHED, (entity) => {
                    let fsm = entity.getComponent(Automaton);
                    let hitbox = entity.getComponent(Hitbox);
                    let sensedDown = this.senseDown(hitbox);
                    // Only check gems underneath if this gem isn't on the ground
                    if (!entity.getComponent(Bounds).onGround) {
                        // If there are no gems underneath, or if the first gem
                        // detected is in a FALLING state, change state to FALLING
                        if (sensedDown.length === 0 ||
                            sensedDown[0].getComponent(Automaton).currentState === EntityState.FALLING) {
                            fsm.changeState(EntityState.FALLING);
                            return;
                        }
                    }
                    let jewelType = entity.getComponent(JewelType);
                    if (!jewelType.active)
                        return;
                    let sensedRight = this.senseRight(hitbox);
                    this.connectDown(entity, jewelType, sensedDown);
                    this.connectRight(entity, jewelType, sensedRight);
                }],
            [EntityState.SWAPPING, (entity) => {
                }],
        ]);
        this.preAutomation = (interval) => {
            this.connectedGemsX.clear();
            this.connectedGemsY.clear();
        };
        this.postAutomation = (interval) => {
            let matches = new Set;
            this.connectedGemsX.forEach((gem2, gem1) => {
                let gem3 = this.connectedGemsX.get(gem2);
                if (gem3 !== undefined) {
                    matches.add(new Set([gem1, gem2, gem3]));
                }
            });
            this.connectedGemsY.forEach((gem2, gem1) => {
                let gem3 = this.connectedGemsY.get(gem2);
                if (gem3 !== undefined) {
                    matches.add(new Set([gem1, gem2, gem3]));
                }
            });
            matches = this.consolidateMatches(matches);
            matches.forEach(match => {
                match.forEach(gem => {
                    let fsm = gem.getComponent(Automaton);
                    fsm.changeState(EntityState.MATCHED);
                });
            });
            this.entities.forEach(entity => {
                entity.getComponent(JewelType).active = true;
            });
        };
        this.consolidateMatches = (matches) => {
            let map = new Map();
            let matchSet = new Set();
            matches.forEach(match => {
                let overlappingMatches = new Set([match]);
                match.forEach(gem => {
                    if (map.has(gem)) {
                        overlappingMatches.add(map.get(gem));
                    }
                });
                let combinedMatch = new Set();
                overlappingMatches.forEach(match => {
                    matchSet.delete(match);
                    match.forEach(gem => {
                        combinedMatch.add(gem);
                    });
                });
                combinedMatch.forEach(gem => {
                    map.set(gem, combinedMatch);
                });
                matchSet.add(combinedMatch);
            });
            return matchSet;
        };
        this.senseDown = (hitbox) => {
            let center = hitbox.center;
            let rayDown = {
                x: center.x,
                y: center.y + (hitbox.height)
            };
            return this.collisionDetection.senseAtPoint(rayDown.x, rayDown.y);
        };
        this.senseRight = (hitbox) => {
            let center = hitbox.center;
            let rayRight = {
                x: center.x + (hitbox.width),
                y: center.y
            };
            return this.collisionDetection.senseAtPoint(rayRight.x, rayRight.y);
        };
    }
    connectDown(entity, jewelType, sensedDown) {
        if (sensedDown.length > 0 &&
            availableForMatching(sensedDown[0]) &&
            sensedDown[0].getComponent(JewelType).color === jewelType.color) {
            this.connectedGemsY.set(entity, sensedDown[0]);
        }
    }
    connectRight(entity, jewelType, sensedRight) {
        if (sensedRight.length > 0 &&
            availableForMatching(sensedRight[0]) &&
            sensedRight[0].getComponent(JewelType).color === jewelType.color) {
            this.connectedGemsX.set(entity, sensedRight[0]);
        }
    }
}
function availableForMatching(entity) {
    if (entity === undefined)
        return false;
    let state = entity.getComponent(Automaton).currentState;
    return state === EntityState.MATCHED ||
        state === EntityState.UNMATCHED;
}
export { JewelBehavior };
