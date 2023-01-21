import { Game } from "./game.js";
const canvas = document.querySelector('canvas');
// const resizeCanvas = () => {
//     canvas!!.height = window.innerHeight
//     canvas!!.width = window.innerWidth * 0.8
// }
if (canvas != undefined) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth * 0.8;
    const game = new Game(canvas);
    game.animate(0);
    // window.addEventListener('resize', (e) => {
    //     resizeCanvas()
    // })
}
