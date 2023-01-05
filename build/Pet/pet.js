import { PetStats } from "./petstats.js";
class Pet {
    constructor() {
        this.hunger = 0;
        this.stats = new PetStats(100);
        this.getHunger = () => {
            return this.stats.getHunger();
        };
        this.feed = (food) => {
            this.stats.feed(food);
        };
        this.update = (interval) => {
            this.stats.update(interval);
        };
        this.imageSrc = '../../assets/bird.png';
        this.name = 'FunkyBird';
        this.gender = 'None';
        this.age = 'Eternal';
        this.weight = '83 trillion kilotons';
    }
}
export { Pet };
