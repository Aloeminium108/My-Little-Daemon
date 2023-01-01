class EntityList {
    constructor(petEntity) {
        this.toys = [];
        this.food = [];
        this.heldEntity = null;
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
        this.getHeldEntity = () => {
            return this.heldEntity;
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
        this.hold = (entity) => {
            entity === null || entity === void 0 ? void 0 : entity.hold();
            this.heldEntity = entity;
        };
        this.release = (dx, dy) => {
            var _a;
            (_a = this.heldEntity) === null || _a === void 0 ? void 0 : _a.release(dx, dy);
            this.heldEntity = null;
        };
        this.petEntity = petEntity;
        this.entityList = [[petEntity], this.toys, this.food];
    }
}
export { EntityList };
