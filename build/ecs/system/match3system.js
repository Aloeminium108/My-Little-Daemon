import { Grid } from "../component/grid.js";
import { UnorderedSystem } from "./system.js";
class Match3System extends UnorderedSystem {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Grid]);
    }
    update(interval) {
    }
}
export { Match3System };
