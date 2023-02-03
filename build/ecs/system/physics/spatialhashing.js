import { Hitbox } from "../../component/physics/hitbox.js";
import { HashEvent } from "../eventsystem/events/hashevent.js";
import { UnorderedSystem } from "../system.js";
class SpatialHashing extends UnorderedSystem {
    constructor(cellSize, filter = null) {
        super();
        this.cellSize = cellSize;
        this.componentsRequired = new Set([Hitbox]);
        this.hashPoint = (x, y) => {
            let cellX = Math.floor(x / this.cellSize);
            let cellY = Math.floor(y / this.cellSize);
            return cellX.toString() + ',' + cellY.toString();
        };
        this.hashHitbox = (hitbox) => {
            let minX = Math.floor(hitbox.x / this.cellSize);
            let minY = Math.floor(hitbox.y / this.cellSize);
            let maxX = Math.floor((hitbox.x + hitbox.width) / this.cellSize);
            let maxY = Math.floor((hitbox.y + hitbox.height) / this.cellSize);
            let cells = new Set;
            for (let i = minX; i <= maxX; i++) {
                for (let j = minY; j <= maxY; j++) {
                    let hash = i.toString() + ',' + j.toString();
                    cells.add(hash);
                }
            }
            return cells;
        };
        filter === null || filter === void 0 ? void 0 : filter.forEach(requiredComponent => {
            this.componentsRequired.add(requiredComponent);
        });
    }
    update(interval) {
        var _a;
        let proximityMap = new Map();
        this.entities.forEach(entity => {
            var _a;
            let hitbox = entity.getComponent(Hitbox);
            // TODO: replace this with a call to hashHitbox
            let minX = Math.floor(hitbox.x / this.cellSize);
            let minY = Math.floor(hitbox.y / this.cellSize);
            let maxX = Math.floor((hitbox.x + hitbox.width) / this.cellSize);
            let maxY = Math.floor((hitbox.y + hitbox.height) / this.cellSize);
            for (let i = minX; i <= maxX; i++) {
                for (let j = minY; j <= maxY; j++) {
                    let hash = i.toString() + ',' + j.toString();
                    if (proximityMap.has(hash)) {
                        (_a = proximityMap.get(hash)) === null || _a === void 0 ? void 0 : _a.push(entity);
                    }
                    else {
                        proximityMap.set(hash, [entity]);
                    }
                }
            }
        });
        (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.pushEvent(new HashEvent(proximityMap));
    }
}
export { SpatialHashing };
