import { Game } from "./game.js"

const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement
const secondaryCanvas = document.getElementById('secondary-canvas') as HTMLCanvasElement
const canvasContainer = document.getElementById('secondary-canvas-container') as HTMLDivElement

// const resizeCanvas = () => {
//     canvas!!.height = window.innerHeight
//     canvas!!.width = window.innerWidth * 0.8
// }

if (mainCanvas != undefined && secondaryCanvas != undefined) {
    mainCanvas.height = window.innerHeight
    mainCanvas.width = window.innerWidth * 0.8

    const game = new Game(mainCanvas, secondaryCanvas, canvasContainer)
    game.animate(0)



    // window.addEventListener('resize', (e) => {
    //     resizeCanvas()
    // })
}



