class Pet {
    constructor() {
        this.hunger = 0;
        this.getHunger = () => {
            return this.hunger;
        };
        this.feed = (food) => {
            this.hunger += food.getNourishmentValue();
        };
        this.imageSrc = '../../assets/bird.png';
        this.name = 'FunkyBird';
        this.gender = 'None';
        this.age = 'Eternal';
        this.weight = '83 trillion kilotons';
    }
}
export { Pet };
