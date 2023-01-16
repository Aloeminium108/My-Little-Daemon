import { Grid } from "../component/grid.js";
import { UnorderedSystem } from "./system.js";

class Match3System extends UnorderedSystem {
    public componentsRequired = new Set([Grid])

    public update(interval: number): void {
        
    }
    
}

export {Match3System}