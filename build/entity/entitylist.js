class EntityList {
    constructor(petEntity) {
        this.toys = [];
        this.food = [];
        this.fullList = () => {
            return this.entityList.flat();
        };
        this.getPet = () => {
            return this.petEntity;
        };
        this.getToys = () => {
            return this.toys;
        };
        this.getFood = () => {
            return this.food;
        };
        this.getSimpleEntities = () => {
            return [this.toys, this.food].flat();
        };
        this.addToy = (toy) => {
            this.toys.push(toy);
        };
        this.addFood = (food) => {
            this.food.push(food);
        };
        this.removeToy = (index) => {
            if (index > -1 && index < this.toys.length) {
                this.toys.splice(index, 1);
            }
        };
        this.removeFood = (index) => {
            if (index > -1 && index < this.food.length) {
                this.food.splice(index, 1);
            }
        };
        this.petEntity = petEntity;
        this.entityList = [[petEntity], this.toys, this.food];
    }
}
export { EntityList };
