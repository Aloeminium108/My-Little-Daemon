import { Time } from "../time.js";
class PetStats {
    constructor(hunger) {
        this.maxHunger = 1000;
        this.timeElapsed = 0;
        this.updateInterval = Time.MINUTE;
        this.hunger = hunger;
    }
    feed(food) {
        this.hunger += food.getNourishmentValue();
        if (this.hunger > this.maxHunger) {
            this.hunger = this.maxHunger;
        }
    }
    update(interval) {
        this.timeElapsed += interval;
        if (this.timeElapsed < this.updateInterval) {
            return;
        }
        if (this.hunger > 0) {
            this.hunger--;
        }
        this.timeElapsed -= this.updateInterval;
    }
    getHunger() {
        return this.hunger;
    }
}
export { PetStats };
