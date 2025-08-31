import type { Direction, GameStatus, LevelsData } from "./types";
import { Grid } from "./game/grid";
import { Levels } from "./game/levels";

import mainLevels from './levels/main.json' assert { type: 'json' };

class Game {
    status: GameStatus = 'init';
    el: HTMLElement;
    grid: Grid | null = null;
    levels: Levels[] = [];

    levelEl: HTMLElement = document.querySelector('.level')!;
    uiEl: HTMLElement = document.querySelector('.ui')!;

    constructor(el: HTMLElement | null = document.getElementById('game')) {
        // Game initialization code
        if(!el) throw new Error("Game element not found");
        this.el = el;
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

           this.grid!.keyEvent(e, dir as Direction);
        });

        window.addEventListener('mousemove', (e) => {
            this.grid!.mouseEvent(e);
        });

        window.addEventListener('mouseout', (e) => {
            this.grid!.mouseEvent(e);
        });
    }

    loadLevels(jsonData: LevelsData) {
        this.levels.push(new Levels(jsonData));
    }

    loadLevel(levelsID: string, levelIndex: number) {
        const level = this.levels.find(lv => lv.id  === levelsID)?.levelsData[levelIndex];
        if(!level) {
            console.error("Level not found");
            return;
        }
        this.grid?.setPattern(level.pattern, true);
        this.changeStatus('inLevel');
    }


    changeStatus(newStatus: GameStatus) {
        this.status = newStatus;
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
                break;
        }
    }
}

export { Game };