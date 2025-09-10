import type { Direction, GameStatus, LevelsData } from "./types";
import { Grid } from "./game/grid";
import { Levels } from "./game/levels";
import { Cat } from "./tiles/entities/cat";

import mainLevels from './levels/main.json' assert { type: 'json' };
import { everyIn } from "./utils";


class Game {
    status: GameStatus = 'init';
    el: HTMLElement;
    grid: Grid | null = null;
    levels: Levels[] = [];
    currentLevelIndex: number = 0;
    currentLevelsID: string = 'main';
    moveCount: number = 0;
    maxMoves: number | null = null;

    levelEl: HTMLElement = document.querySelector('.level')!;
    uiEl: HTMLElement = document.querySelector('.ui')!;

    constructor(el: HTMLElement | null = document.getElementById('game')) {
        // Game initialization code
        if(!el) throw new Error("Game element not found");
        this.el = el;
        this.uiEl.querySelector('.follow-mouse')!.setAttribute('hidden', '');
        this.initGame();
    }

    initGame() {
        this.grid = new Grid([], this.levelEl, this, false, true, );
        this.loadLevels(mainLevels);
        console.log(mainLevels);

        let gameKeys = {
            U: ['w', 'z', 'ArrowUp'],
            D: ['s', 'ArrowDown'],
            L: ['a', 'q', 'ArrowLeft'],
            R: ['d', 'ArrowRight'],
        }

        //Events
        window.addEventListener('keydown', (e) => {
            let dir: string | null = null;
            Object.entries(gameKeys).forEach(([key, value]) => {
                if(value.includes(e.key)) dir = key;
            });
            if(dir === null) return;

           if(this.status === 'inLevel') this.grid!.keyEvent(e, dir as Direction);
        });

        window.addEventListener('mousemove', (e) => {
            this.grid!.mouseEvent(e);
            this._putDivToMouse(e);
        });

        window.addEventListener('mouseout', (e) => {
            this.grid!.mouseEvent(e);
        });

        window.addEventListener('click', (e) => {
            this.grid!.clickEvent(e);
        });

        /* this.uiEl.querySelector('.undo')!.addEventListener('click', () => {
            this.grid?.rewindPattern();
        });

        this.uiEl.querySelector('.home')!.addEventListener('click', () => {
            this.changeStatus('levelSelection');
        });

        this.uiEl.querySelector('.reset')!.addEventListener('click', () => {
        }); */

        console.log(this.uiEl.querySelector('.undo'));

        (this.uiEl.querySelector('.undo') as HTMLElement).onclick = () => {
            this.grid?.rewindPattern();
        };

        (this.uiEl.querySelector('.home') as HTMLElement).onclick = () => {
            this.changeStatus('levelSelection');
        };

        (this.uiEl.querySelector('.reset') as HTMLElement).onclick = () =>  {
            this.grid?.resetPattern();
        };
    }

    loadLevels(jsonData: LevelsData) {
        this.levels.push(new Levels(jsonData));
    }

    loadLevel(levelsID: string, levelIndex: number) {
        this.currentLevelIndex = levelIndex;
        this.currentLevelsID = levelsID;
        this.moveCount = 0;
        const level = this.levels.find(lv => lv.id  === levelsID)?.levelsData[levelIndex];
        if(!level) {
            console.error("Level not found");
            return;
        }
        this.maxMoves = level.maxMoves ?? null;
        this.grid?.setPattern(level.pattern, true);
        this.uiEl.querySelector('.level-name')!.textContent = level.name;
        this.uiEl.querySelector('.level-description')!.textContent = level.description;
        (this.uiEl.querySelector('.moves-remaning-div') as HTMLElement)!.hidden = this.maxMoves ? false : true;
        this._setMovesRemaning();
        this.changeStatus('inLevel');
    }

    loadNextLevel() {
        this.currentLevelIndex++;
        this.loadLevel(this.currentLevelsID, this.currentLevelIndex);
        this.changeStatus('inLevel');
        this.grid!.prevP = [];
    }

    changeStatus(newStatus: GameStatus) {
        this.status = newStatus;
        this.uiEl.querySelector('.follow-mouse')!.setAttribute('hidden', '');
        switch (newStatus) {
            case 'init':
                // Init code
                break;

            case 'intro':
                // Intro code
                break;

            case 'levelSelection':
                // Level selection code
                break;

            case 'inLevel':
                this.uiEl.setAttribute('visible', 'true');
                break;
            
            case 'levelComplete':
                this.uiEl.setAttribute('visible', 'false');
                this.uiEl.querySelector('.follow-mouse')!.removeAttribute('hidden');
                everyIn(Cat, this.grid!.entities, (e) => e.setAnimation('joy-animation'));
                break;
                
            case 'levelFailed':
                everyIn(Cat, this.grid!.entities, (e) => e.setAnimation('sad-animation'));
        }
    }

    _putDivToMouse(e: MouseEvent) {
        const div = this.uiEl.querySelector('.follow-mouse') as HTMLDivElement;
        div.style.left = e.clientX + 'px';
        div.style.top = e.clientY + 'px';
    }

    _setMovesRemaning() {
        this.uiEl.querySelector('.moves-remaning')!.textContent = this.maxMoves ? String(this.maxMoves - this.moveCount) : '∞';
    }
}

export { Game };