import { Time } from "../time.js";
class PetStats {
    constructor(hunger) {
        this.maxHunger = 1000;
        this.timeElapsed = 0;
        this.updateInterval = Time.MINUTE;
        this.consume = (consumable) => {
            this.hunger += consumable.hunger;
            if (this.hunger > this.maxHunger)
                this.hunger = this.maxHunger;
        };
        this.update = (interval) => {
            this.timeElapsed += interval;
            if (this.timeElapsed < this.updateInterval) {
                return;
            }
            if (this.hunger > 0) {
                this.hunger--;
            }
            this.timeElapsed -= this.updateInterval;
        };
        this.hunger = hunger;
    }
    getHunger() {
        return this.hunger;
    }
}
export { PetStats };
