import { Body } from "./body.js"

class GemBody extends Body {



    update(): void {
        throw new Error("Method not implemented.");
    }

    boundaryCollision(xBound: number, yBound: number): void {
        throw new Error("Method not implemented.");
    }

    hold(): void {
        console.log("Held")
    }

    release(dx: number, dy: number): void {
        console.log("Released")
    }
    
}

export { GemBody }