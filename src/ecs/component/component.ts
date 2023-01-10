abstract class Component {}

// Type alias referring to the constructor of a Component
// This is for the purpose of mapping each component of an entity 
// to its own type. This has two benefits. First, this allows 
// any method to know the type of Component it is retrieving from
// the map at compile time. Second, in practice this ends up being
// idiomatic; if we have a concrete subclass of Component named
// "Hitbox", then we can retrieve that component from an entity
// with entity.getComponent(Hitbox)
type ComponentType<T extends Component> = new (...args: any[]) => T

export {Component, ComponentType}