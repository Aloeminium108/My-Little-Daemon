import { CollisionDetection } from "../../ecs/system/physics/collisiondetection.js";
import { SpriteSystem } from "../../ecs/system/graphics/spritesystem.js";
import { FrictionSystem } from "../../ecs/system/physics/frictionsystem.js";
import { MouseSystem } from "../../ecs/system/controls/mousesystem.js";
import { VelocitySystem } from "../../ecs/system/physics/velocitysystem.js";
import { GemGrabSystem } from "../../ecs/system/controls/gemgrabsystem.js";
import { SpatialHashing } from "../../ecs/system/physics/spatialhashing.js";
import { BoundarySystem } from "../../ecs/system/physics/boundarysystem.js";
import { JewelBehavior } from "../../ecs/system/fsm/jewelbehavior.js";
import { JewelType } from "../../ecs/component/gameplay/jeweltype.js";
import { Hitbox } from "../../ecs/component/physics/hitbox.js";
import { Automaton } from "../../ecs/component/fsm/automaton.js";
import { GeneratorSystem } from "../../ecs/system/gameplay/generatorsystem.js";
import { Match3ScoringSystem } from "../../ecs/system/scoring/match3scoring.js";
import { DrawingSystem } from "../../ecs/system/graphics/drawingsystem.js";
import { CollisionResponse } from "../../ecs/system/physics/collisionresponse.js";
import { JewelGrid } from "../../ecs/entity/minigame/puzzle/jewelgrid.js";
import { ScoreKeeper } from "../../ecs/entity/minigame/scorekeeper.js";
import { Scoreboard, ScoreType } from "../../ecs/component/graphics/scoreboard.js";
import { ScoreboardSystem } from "../../ecs/system/scoring/scoreboardsystem.js";
import { Minigame } from "./minigame.js";
class Match3State extends Minigame {
    constructor(game, ctx, canvasContainer) {
        super(game, ctx, canvasContainer);
        this.game = game;
        this.ctx = ctx;
        this.canvasContainer = canvasContainer;
        this.name = 'Match-3';
        this.iconsrc = './assets/icons/match-3-icon.png';
        this.leftScoreboardInner = `<div class="stat-container vertical-stat-bar">
        <div id="progress-bar" class="vertical-bar-fill"></div>
    </div>`;
        this.rightScoreboardInner = `<div class="stat-list scorepanel">
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
        <div class="stat-container reaction-container">
            <img id="pet-reaction" src="" alt="">
        </div>
    </div>`;
        this.canvasWidth = 640;
        this.canvasHeight = 640;
        this.scoreDisplay = null;
        this.comboCounter = null;
        this.movesCounter = null;
        this.progressBar = null;
        this.petReaction = null;
        this.moves = 10;
        this.level = 1;
        this.score = 0;
        this.progress = 0;
        this.scoreKeeper = new ScoreKeeper(ScoreType.SCORE);
        this.comboKeeper = new ScoreKeeper(ScoreType.COMBO);
        this.movesKeeper = new ScoreKeeper(ScoreType.MOVES, this.moves);
        this.progressKeeper = new ScoreKeeper(ScoreType.PROGESS);
        this.initEntities = () => {
            let jewelGrid = new JewelGrid(0, 0, 8, 8);
            this.ecs.addEntity(jewelGrid);
            this.ecs.addEntity(this.scoreKeeper);
            this.ecs.addEntity(this.comboKeeper);
            this.ecs.addEntity(this.movesKeeper);
            this.ecs.addEntity(this.progressKeeper);
        };
        this.initSystems = () => {
            let spatialHashing = new SpatialHashing(160, new Set([Hitbox, JewelType, Automaton]));
            let collisionDetection = new CollisionDetection(spatialHashing);
            this.mouseSystem = new MouseSystem(this.mouse, this.canvas);
            this.ecs.addSystem(this.mouseSystem);
            this.gemGrabSystem = new GemGrabSystem(this.mouseSystem, collisionDetection);
            this.ecs.addSystem(this.gemGrabSystem);
            this.ecs.addSystem(new VelocitySystem());
            this.ecs.addSystem(new FrictionSystem());
            this.ecs.addSystem(new BoundarySystem());
            this.ecs.addSystem(spatialHashing);
            this.ecs.addSystem(collisionDetection);
            this.ecs.addSystem(new CollisionResponse(collisionDetection));
            this.ecs.addSystem(new GeneratorSystem(collisionDetection));
            this.jewelBehavior = new JewelBehavior(collisionDetection, this.gemGrabSystem);
            this.ecs.addSystem(this.jewelBehavior);
            this.ecs.addSystem(new Match3ScoringSystem(this.jewelBehavior, this.gemGrabSystem));
            this.ecs.addSystem(new SpriteSystem(this.ctx));
            this.ecs.addSystem(new DrawingSystem(this.ctx));
            this.ecs.addSystem(new ScoreboardSystem(new Map([
                [ScoreType.COMBO, (value) => {
                        if (this.comboCounter !== null)
                            this.comboCounter.textContent = value.toString();
                    }],
                [ScoreType.SCORE, (value) => {
                        this.score = value;
                        if (this.scoreDisplay !== null)
                            this.scoreDisplay.textContent = value.toString();
                    }],
                [ScoreType.MOVES, (value) => {
                        this.moves = value;
                        if (this.movesCounter !== null)
                            this.movesCounter.textContent = value.toString();
                    }],
                [ScoreType.PROGESS, (value) => {
                        this.progress += value;
                        if (this.progressBar !== null)
                            this.progressBar.style.height = `${this.getProgress()}%`;
                    }],
            ])));
        };
        this.resetGame = () => {
            var _a;
            (_a = this.jewelBehavior) === null || _a === void 0 ? void 0 : _a.entities.forEach(entity => {
                this.ecs.removeEntity(entity);
            });
            this.moves = 10;
            this.level = 1;
            this.score = 0;
            this.progress = 0;
            this.scoreKeeper.getComponent(Scoreboard).value = 0;
            this.comboKeeper.getComponent(Scoreboard).value = 0;
            this.movesKeeper.getComponent(Scoreboard).value = 10;
            this.progressKeeper.getComponent(Scoreboard).value = 0;
            this.ecs.addSystem(this.mouseSystem);
        };
        this.stopGame = () => {
            this.ecs.removeSystem(this.mouseSystem);
        };
        this.getProgress = () => {
            if (this.progress >= calculateGoal(this.level))
                return 100;
            let percentage = 100 * this.progress / calculateGoal(this.level);
            return percentage;
        };
        this.reconnectScoreboard = () => {
            this.scoreDisplay = document.getElementById('score-display');
            this.comboCounter = document.getElementById('combo-counter');
            this.movesCounter = document.getElementById('moves-counter');
            this.petReaction = document.getElementById('pet-reaction');
            this.progressBar = document.getElementById('progress-bar');
            this.petReaction.src = this.pet.imageSrc;
        };
        this.loseCondition = () => {
            if (this.moves > 0)
                return false;
            if (this.getProgress() >= 100) {
                this.progress = 0;
                this.level++;
                this.moves = 10;
                this.movesKeeper.getComponent(Scoreboard).value = 10;
                return false;
            }
            else {
                return true;
            }
        };
        this.winCondition = () => {
            return false;
        };
        this.init();
    }
}
function calculateGoal(level) {
    return 5000 * level * Math.log(level + 1);
}
export { Match3State };
