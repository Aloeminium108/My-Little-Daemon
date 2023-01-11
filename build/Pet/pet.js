import { PetStats } from "./petstats.js";
class Pet {
    constructor() {
        this.stats = new PetStats(1000);
        this.getHunger = () => {
            return this.stats.getHunger();
        };
        // feed = (food: Food) => {
        //     this.stats.feed(food)
        // }
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
