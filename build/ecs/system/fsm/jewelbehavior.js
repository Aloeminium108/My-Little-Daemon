import { Bounds } from "../../component/bounds.js";
import { Hitbox } from "../../component/hitbox.js";
import { JewelType, SpecialProperty } from "../../component/jeweltype.js";
import { Automaton, EntityState } from "../../component/automaton.js";
import { Velocity } from "../../component/velocity.js";
import { FiniteStateMachine } from "./finitestatemachine.js";
import { Position } from "../../component/position.js";
import { Jewel } from "../../entity/puzzle/jewel.js";
import { CollisionBody } from "../../component/collisionbody.js";
const EPSILON = 0.001;
class JewelBehavior extends FiniteStateMachine {
    constructor(collisionDetection, gemGrabSystem) {
        super();
        this.collisionDetection = collisionDetection;
        this.gemGrabSystem = gemGrabSystem;
        this.componentsRequired = new Set([Automaton, JewelType, CollisionBody]);
        // Sets gems that are connected along the X and Y axis
        this.connectedGemsX = new Map();
        this.connectedGemsY = new Map();
        this.destroyedGems = new Array();
        this.behaviorMap = new Map([
            [EntityState.FALLING, (entity) => {
                    let fsm = entity.getComponent(Automaton);
                    let body = entity.getComponent(CollisionBody);
                    if (body.onGround) {
                        body.dy = 0;
                        fsm.changeState(EntityState.UNMATCHED);
                        body.immovable = true;
                        body.onGround = false;
                        return;
                    }
                    entity.getComponent(Velocity).dy += 1.5;
                }],
            [EntityState.MATCHED, (entity) => {
                    var _a, _b;
                    let age = entity.getComponent(Automaton).age;
                    let jewelType = entity.getComponent(JewelType);
                    if (age >= 120) {
                        this.destroyedGems.push(jewelType);
                        if (jewelType.special !== null) {
                            this.gemsplosion(entity, jewelType.special);
                        }
                        if (jewelType.conversion !== null) {
                            if (jewelType.conversion === SpecialProperty.COLORBOMB)
                                jewelType.color = null;
                            let bounds = entity.getComponent(Bounds);
                            let position = entity.getComponent(Position);
                            let replacementJewel = new Jewel(position.x, position.y, new JewelType(jewelType.color, jewelType.conversion));
                            replacementJewel.addComponent(bounds);
                            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.addEntity(replacementJewel);
                        }
                        (_b = this.ecs) === null || _b === void 0 ? void 0 : _b.removeEntity(entity);
                    }
                    if (!jewelType.active || jewelType.color === null)
                        return;
                    let hitbox = entity.getComponent(Hitbox);
                    let sensedDown = this.senseDown(hitbox);
                    let sensedRight = this.senseRight(hitbox);
                    this.connectDown(entity, jewelType, sensedDown);
                    this.connectRight(entity, jewelType, sensedRight);
                }],
            [EntityState.UNMATCHED, (entity) => {
                    let fsm = entity.getComponent(Automaton);
                    let hitbox = entity.getComponent(Hitbox);
                    let body = entity.getComponent(CollisionBody);
                    let sensedDown = this.senseDown(hitbox);
                    // Only check gems underneath if this gem isn't on the ground
                    if (!body.onGround) {
                        // If there are no gems underneath, or if the first gem
                        // detected is in a FALLING state, change state to FALLING
                        if (sensedDown.length === 0 ||
                            sensedDown[0].getComponent(Automaton).currentState === EntityState.FALLING) {
                            fsm.changeState(EntityState.FALLING);
                            body.immovable = false;
                            return;
                        }
                    }
                    let jewelType = entity.getComponent(JewelType);
                    if (!jewelType.active || jewelType.color === null)
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
            let colorBombs = this.gemGrabSystem.swapped.filter(entity => {
                return entity.getComponent(JewelType).special === SpecialProperty.COLORBOMB;
            });
            let nonColorBombs = this.gemGrabSystem.swapped.filter(entity => {
                return entity.getComponent(JewelType).special !== SpecialProperty.COLORBOMB;
            });
            if (colorBombs.length === 2) {
                this.entities.forEach(entity => {
                    let jeweltype = entity.getComponent(JewelType);
                    if (jeweltype.active) {
                        let fsm = entity.getComponent(Automaton);
                        fsm.changeState(EntityState.MATCHED);
                    }
                });
                this.destroyedGems.push(new JewelType(null, SpecialProperty.ULTRABOMB));
            }
            else if (colorBombs.length === 1 && nonColorBombs.length === 1) {
                let color = nonColorBombs[0].getComponent(JewelType).color;
                this.entities.forEach(entity => {
                    let jeweltype = entity.getComponent(JewelType);
                    if (jeweltype.active && jeweltype.color === color) {
                        let fsm = entity.getComponent(Automaton);
                        fsm.changeState(EntityState.MATCHED);
                    }
                });
            }
            while (colorBombs.length > 0) {
                let colorbomb = colorBombs.pop();
                colorbomb === null || colorbomb === void 0 ? void 0 : colorbomb.getComponent(Automaton).changeState(EntityState.MATCHED);
            }
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
                let specialMatch = this.checkMatchType(match);
                if (specialMatch === null)
                    return;
                let matchArray = Array.from(match);
                matchArray.sort((a, b) => {
                    let aPos = a.getComponent(Position);
                    let bPos = b.getComponent(Position);
                    return (aPos.x - bPos.x) + (aPos.y - bPos.y);
                });
                matchArray[Math.floor(matchArray.length / 2)].getComponent(JewelType).conversion = specialMatch;
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
        this.checkMatchType = (match) => {
            if (match.size === 3)
                return null;
            if (match.size === 4) {
                let arrayForm = Array.from(match);
                if (Math.abs(arrayForm[0].getComponent(Position).x - arrayForm[1].getComponent(Position).x) < EPSILON) {
                    return SpecialProperty.H_LINECLEAR;
                }
                else {
                    return SpecialProperty.V_LINECLEAR;
                }
            }
            let counter = 0;
            match.forEach(gem => {
                if (this.connectedGemsX.has(gem) &&
                    match.has(this.connectedGemsX.get(gem)))
                    counter++;
            });
            if (counter >= 4 || match.size - counter >= 4)
                return SpecialProperty.COLORBOMB;
            return SpecialProperty.BOMB;
        };
        this.gemsplosion = (entity, special) => {
            let center = entity.getComponent(Hitbox).center;
            let position;
            let width, height;
            let bounds;
            switch (special) {
                case SpecialProperty.BOMB:
                    position = new Position(center.x - Jewel.width, center.y - Jewel.width);
                    width = Jewel.width * 2;
                    height = Jewel.width * 2;
                    break;
                case SpecialProperty.H_LINECLEAR:
                    bounds = entity.getComponent(Bounds);
                    position = new Position(bounds.xLowerBound, center.y);
                    width = bounds.xUpperBound - bounds.xLowerBound;
                    height = 0;
                    break;
                case SpecialProperty.V_LINECLEAR:
                    bounds = entity.getComponent(Bounds);
                    position = new Position(center.x, bounds.yLowerBound);
                    width = 0;
                    height = bounds.yUpperBound - bounds.yLowerBound;
                    break;
                default:
                    position = entity.getComponent(Position);
                    width = 0;
                    height = 0;
            }
            let hitbox = new Hitbox(position, width, height);
            let blastedGems = this.collisionDetection.senseWithHitbox(hitbox);
            blastedGems.forEach(blastedGem => {
                blastedGem.getComponent(Automaton).changeState(EntityState.MATCHED);
            });
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
