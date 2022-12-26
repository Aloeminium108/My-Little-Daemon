abstract class State {
    abstract animate(ctx: CanvasRenderingContext2D) : void
    abstract mouseUp(e: MouseEvent): void
    abstract mouseDown(e: MouseEvent): void
    abstract mouseMove(e: MouseEvent): void
    abstract mouseLeave(e: MouseEvent): void
}

export { State }