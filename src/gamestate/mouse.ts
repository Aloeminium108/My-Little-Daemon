class Mouse {
    pressed: boolean = false
    x: number = 0
    y: number = 0
    dx: number = 0
    dy: number = 0

    move = (e: MouseEvent) => {
        let newX = e.offsetX
        let newY = e.offsetY

        this.dx = newX - this.x
        this.dy = newY - this.y

        this.x = newX
        this.y = newY
    }

}

export { Mouse }