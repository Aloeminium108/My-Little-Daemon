abstract class GameEvent {}

type EventClass<T extends GameEvent> = new (...args: any[]) => T

export { GameEvent, EventClass}