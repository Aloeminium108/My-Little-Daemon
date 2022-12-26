import { GameState } from "./state/gamestate.js";
import { IntroState } from "./state/introstate.js";
const canvas = document.querySelector('canvas');
var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
if (canvas != undefined) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth * 0.8;
}
const gameState = new GameState(canvas);
const introState = new IntroState();
var currentState = introState;
function changeState() {
    currentState = gameState;
}
introState.addStateChange(changeState);
function animate() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentState.animate(ctx);
    window.requestAnimationFrame(animate);
}
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousedown', function (e) {
    currentState.mouseDown(e);
});
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mouseup', function (e) {
    currentState.mouseUp(e);
});
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousemove', function (e) {
    currentState.mouseMove(e);
});
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mouseleave', function (e) {
    currentState.mouseLeave(e);
});
animate();
