import { Game } from "./game.js";
const mainCanvas = document.getElementById('main-canvas');
const secondaryCanvas = document.getElementById('secondary-canvas');
const canvasContainer = document.getElementById('secondary-canvas-container');
// const resizeCanvas = () => {
//     canvas!!.height = window.innerHeight
//     canvas!!.width = window.innerWidth * 0.8
// }
if (mainCanvas != undefined && secondaryCanvas != undefined) {
    mainCanvas.height = window.innerHeight;
    mainCanvas.width = window.innerWidth * 0.8;
    const game = new Game(mainCanvas, secondaryCanvas, canvasContainer);
    game.animate(0);
    // window.addEventListener('resize', (e) => {
    //     resizeCanvas()
    // })
}
