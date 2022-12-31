class Pet {
    constructor() {
        this.hunger = 0;
        this.getHunger = () => {
            return this.hunger;
        };
        this.Feed = (nourishmentValue) => {
            this.hunger += nourishmentValue;
        };
        this.imageSrc = '../../assets/bird.png';
        this.name = 'FunkyBird';
        this.gender = 'None';
        this.age = 'Eternal';
        this.weight = '83 trillion kilotons';
    }
}
export { Pet };
