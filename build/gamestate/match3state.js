import { ECS } from "../ecs/ecs.js";
import { CollisionDetection } from "../ecs/system/collisiondetection.js";
import { SpriteSystem } from "../ecs/system/spritesystem.js";
import { FrictionSystem } from "../ecs/system/frictionsystem.js";
import { MouseSystem } from "../ecs/system/mousesystem.js";
import { VelocitySystem } from "../ecs/system/velocitysystem.js";
import { GemGrabSystem } from "../ecs/system/gemgrabsystem.js";
import { SpatialHashing } from "../ecs/system/spatialhashing.js";
import { BoundarySystem } from "../ecs/system/boundarysystem.js";
import { JewelBehavior } from "../ecs/system/fsm/jewelbehavior.js";
import { JewelType } from "../ecs/component/jeweltype.js";
import { Hitbox } from "../ecs/component/hitbox.js";
import { Automaton } from "../ecs/component/automaton.js";
import { GeneratorSystem } from "../ecs/system/generatorsystem.js";
import { Match3ScoringSystem } from "../ecs/system/scoring/match3scoring.js";
import { DrawingSystem } from "../ecs/system/drawingsystem.js";
import { CollisionResponse } from "../ecs/system/collisionresponse.js";
import { JewelGrid } from "../ecs/entity/puzzle/jewelgrid.js";
import { ScoreKeeper } from "../ecs/entity/scoreboard.js";
import { ScoreType } from "../ecs/component/scoreboard.js";
import { ScoreboardSystem } from "../ecs/system/scoring/scoreboardsystem.js";
class Match3State {
    constructor(game, ctx, canvasContainer) {
        this.game = game;
        this.ctx = ctx;
        this.canvasContainer = canvasContainer;
        this.ecs = new ECS();
        this.timeElapsed = 0;
        this.scoreboard = document.createElement('div');
        this.scoreDisplay = null;
        this.comboCounter = null;
        this.movesCounter = null;
        this.init = () => {
            this.initScoreboard();
            this.initEntities();
            this.initSystems();
        };
        this.initScoreboard = () => {
            this.scoreboard.innerHTML =
                `<div class="stat-list scorepanel">
            <div class="stat-label scorepanel">
                <h2>SCORE:</h2>
            </div>
            <div class="stat-container stat-info-container scorepanel">
                <p class="scorepanel" id="score-display">0</p>
            </div>
            <div class="stat-label scorepanel">
                <h2>COMBO:</h2>
            </div>
            <div class="stat-container stat-info-container scorepanel">
                <p class="scorepanel" id="combo-counter">0</p>
            </div>
            <div class="stat-label scorepanel">
                <h2>MOVES:</h2>
            </div>
            <div class="stat-container stat-info-container scorepanel">
                <p class="scorepanel" id="moves-counter">0</p>
            </div>
        </div>`;
        };
        this.initEntities = () => {
            let jewelGrid = new JewelGrid(0, 0, 8, 8);
            this.ecs.addEntity(jewelGrid);
            let scoreKeeper = new ScoreKeeper(ScoreType.SCORE);
            let comboKeeper = new ScoreKeeper(ScoreType.COMBO);
            let movesKeeper = new ScoreKeeper(ScoreType.MOVES);
            let progressKeeper = new ScoreKeeper(ScoreType.PROGESS);
            this.ecs.addEntity(scoreKeeper);
            this.ecs.addEntity(comboKeeper);
            this.ecs.addEntity(movesKeeper);
            this.ecs.addEntity(progressKeeper);
        };
        this.initSystems = () => {
            let mouseSystem = new MouseSystem(this.mouse, this.canvas);
            this.ecs.addSystem(mouseSystem);
            let gemGrabSystem = new GemGrabSystem(mouseSystem);
            this.ecs.addSystem(gemGrabSystem);
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            this.ecs.addSystem(new BoundarySystem());
            let spatialHashing = new SpatialHashing(160, new Set([Hitbox, JewelType, Automaton]));
            this.ecs.addSystem(spatialHashing);
            let collisionDetection = new CollisionDetection(spatialHashing);
            this.ecs.addSystem(collisionDetection);
            this.ecs.addSystem(new CollisionResponse(collisionDetection));
            this.ecs.addSystem(new GeneratorSystem(collisionDetection));
            let jewelBehavior = new JewelBehavior(collisionDetection, gemGrabSystem);
            this.ecs.addSystem(jewelBehavior);
            this.ecs.addSystem(new Match3ScoringSystem(jewelBehavior));
            this.ecs.addSystem(new SpriteSystem(this.ctx));
            this.ecs.addSystem(new DrawingSystem(this.ctx));
            this.ecs.addSystem(new ScoreboardSystem(new Map([
                [ScoreType.COMBO, (value) => {
                        if (this.comboCounter !== null)
                            this.comboCounter.textContent = value.toString();
                    }],
                [ScoreType.SCORE, (value) => {
                        if (this.scoreDisplay !== null)
                            this.scoreDisplay.textContent = value.toString();
                    }],
                [ScoreType.MOVES, (value) => {
                        if (this.movesCounter !== null)
                            this.movesCounter.textContent = value.toString();
                    }],
                [ScoreType.PROGESS, (value) => { }],
            ])));
        };
        this.pause = () => {
            this.canvasContainer.style.visibility = 'hidden';
        };
        this.resume = () => {
            var _a;
            this.canvas.height = 640;
            this.canvas.width = 640;
            (_a = document.getElementById('scoreboard')) === null || _a === void 0 ? void 0 : _a.appendChild(this.scoreboard);
            this.scoreDisplay = document.getElementById('score-display');
            this.comboCounter = document.getElementById('combo-counter');
            this.movesCounter = document.getElementById('moves-counter');
            this.canvasContainer.style.visibility = 'visible';
        };
        this.update = (interval) => {
            this.timeElapsed += interval;
            this.ecs.update(interval);
        };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.canvas = game.secondaryCanvas;
        this.init();
    }
}
export { Match3State };
