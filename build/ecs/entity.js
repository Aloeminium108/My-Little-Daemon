class Entity {
    constructor(ecs = null) {
        this.ecs = ecs;
        this.componentSet = new Map();
        this.addComponent = (component) => {
            var _a;
            this.componentSet.set(component.constructor, component);
            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.checkEntityForSystems(this);
        };
        this.getComponent = (componentClass) => {
            return this.componentSet.get(componentClass);
        };
        this.getPossibleComponent = (componentClass) => {
            return this.componentSet.get(componentClass);
        };
        this.deleteComponent = (componentClass) => {
            var _a;
            this.componentSet.delete(componentClass);
            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.checkEntityForSystems(this);
        };
        this.hasAll = (componentClasses) => {
            componentClasses.forEach(neededComponent => {
                if (!this.componentSet.has(neededComponent)) {
                    return false;
                }
            });
            return true;
        };
    }
    addToECS(ecs) {
        this.ecs = ecs;
    }
}
export { Entity };
