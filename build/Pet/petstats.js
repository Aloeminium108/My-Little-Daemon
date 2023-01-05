class PetStats {
    constructor(hunger) {
        this.maxHunger = 100;
        this.timeElapsed = 0;
        this.updateInterval = 1000;
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
        console.log("Time elapsed:", this.timeElapsed);
        if (this.timeElapsed >= this.updateInterval) {
            console.log("Update!");
            this.hunger--;
            this.timeElapsed -= this.updateInterval;
        }
    }
    getHunger() {
        return this.hunger;
    }
}
export { PetStats };
