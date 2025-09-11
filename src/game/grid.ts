import type { Direction, ElementData, GridPattern, Position, Tile } from "../types";
import type { GridType } from "../game/grid-types";
import type { Sprite } from "../tiles/sprite";

import { Base } from "../tiles/base/core-base";
import { Obj } from "../tiles/objects/core-object";
import { Entity } from "../tiles/entities/core-entity";

import { Cat } from "../tiles/entities/cat";
import { Paint } from "../tiles/objects/paint";

import { invokeSpriteFromType } from "../tiles/tile";
import { elementDataToPattern, patternToElementData } from "../utils";
import type { Game } from "../game";
import type { Level } from "./levels";

class Grid implements GridType {
    game: Game;
    p: GridPattern = [];
    bases: Base[] = [];
    objects: Obj[] = [];
    entities: Entity[] = [];
    //sprites: Sprite[] = [];
    prevL: Level[] = [];
    gEl: HTMLElement;
    animate: boolean = true;
    private _extractedData: ElementData[][] = [];

    get objectsAll(): Sprite[] {
        return [...this.bases, ...this.objects, ...this.entities];
    }

    get w() {
        return Math.max(...this.p.map(a=>a.length));
    }

    get h() {
        return this.p.length;
    }

    constructor(p: GridPattern, parentElement: HTMLElement, game: Game, loadNow: boolean = true, animate: boolean = true) {
        this.game = game;
        this.gEl = parentElement.appendChild(document.createElement('div'));
        this.gEl.classList.add('grid');

        this.animate = animate;

        this.setPattern(p, loadNow);
    }

    getTileAt(pos: Position): Tile {
        const match = (arr: Sprite[]) =>
            arr.find(e => e.pos.x === pos.x && e.pos.y === pos.y) ?? null;

        const base = match(this.bases) as Base | null;
        const obj = match(this.objects) as Obj | null;
        const entity = match(this.entities) as Entity | null;

        const isTile = (base || obj || entity) ? true : false;
        const elementsWalkable = [base, obj, entity].filter(e => e !== null) as Sprite[];
        const isWalkable = elementsWalkable.length === 0 ? true : elementsWalkable.every(e => e.canWalkOver);

        return {
            pos,
            base,
            obj,
            entity,
            tileArray: [base, obj, entity],
            isTile,
            isWalkable: isTile && isWalkable as boolean,
        } as Tile;
    }

    setTileAt(pos: Position, sprite: Sprite): void {
        const removeFromArray = (arr: Sprite[]) => {
            const index = arr.findIndex(e => e.id === sprite.id);
            if (index !== -1) arr.splice(index, 1);
        }

        if (sprite instanceof Base) {
            removeFromArray(this.bases);
            this.bases.push(sprite);
        }

        if (sprite instanceof Obj) {
            removeFromArray(this.objects);
            this.objects.push(sprite);
        }

        if (sprite instanceof Entity) {
            removeFromArray(this.entities);
            this.entities.push(sprite);
        }

        // change the pattern data
        const index = pos.y * this.w + pos.x;
        if (index >= 0 && index < this._extractedData.length) {
            this.p = this.getPattern();
        }
    }

    getPattern(): GridPattern {
        let newPattern: GridPattern = [];
        for (let y = 0; y < this.h; y++) {
            let row: (string | number | ElementData[])[] = [];
            for (let x = 0; x < this.w; x++) {
                const tile = this.getTileAt({x, y});
                let elements: ElementData[] = [];
                if (tile.base) elements.push(tile.base.element);
                if (tile.obj) elements.push(tile.obj.element);
                if (tile.entity) elements.push(tile.entity.element);

                row.push(elementDataToPattern(elements));
            }
            newPattern.push(row);
        }
        return newPattern;
    }

    setPattern(newPattern: GridPattern, animate: boolean = this.animate, loadNow: boolean = true): void {
        //this.dispose();
        this.p = newPattern;
        this.p.forEach(e => {
            const added = Array(this.w - e.length).fill(0);
            e.push(...added);
        });
        this._extractedData = [];
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                this._extractedData.push(patternToElementData(this.p[y][x]));
            }
        }
        if(loadNow) this.loadGrid(animate);
    }

    savePattern(): void {
        if(!this.game.currentLevel) return;
        this.game.currentLevel = {
            ...this.game.currentLevel!,
            pattern: this.getPattern(),
            moveCount: this.game.moveCount
        };
        this.prevL.push(this.game.currentLevel);
    }

    _goBackToLevel(l?: Level): void {
        if(!l) return;
        this.setPattern(l.pattern, false);
        this.game.moveCount = l.moveCount;
        if(l.maxMoves && l.maxMoves - l.moveCount > 0) this.game.status = 'inLevel';
        this.game._setMovesRemaning();
        console.log(l, this.game);
    }

    rewindLevel(): void {
        if(this.prevL.length === 0) return;
        this._goBackToLevel(this.prevL.pop())
    }

    resetLevel(): void {
        if(this.prevL.length === 0) return;
        this._goBackToLevel(this.prevL[0]);
        this.prevL = [];
    }

    loadGrid(animate: boolean): void {
        if(this.gEl === null) return;
        this.bases = [];
        this.objects = [];
        this.entities = [];
        this.gEl.innerHTML = ''; // Clear previous elements if any
        this.gEl.style.gridTemplate = `repeat(${this.h}, 1rem) / repeat(${this.w}, 1rem)`;

        let counter = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const extEl = this._extractedData[counter];

                let tileS: Pick<Tile, 'base' | 'obj' | 'entity'> = {
                    base: null,
                    obj: null,
                    entity: null
                }

                const spawnDelay = animate ? 100 * counter + (animate ? 500 : 0) : 0;
                const animationName = animate ? 'drop-animation' : 'no-animations';

                tileS.base = invokeSpriteFromType({pos: {x, y}, el: extEl[0], g: this, spawnDelay, animationName}, Base) as Base | null;
                tileS.obj = invokeSpriteFromType({pos: {x, y}, el: extEl[1], g: this, spawnDelay, animationName}, Obj) as Obj | null;
                tileS.entity = invokeSpriteFromType({pos: {x, y}, el: extEl[2], g: this, spawnDelay, animationName}, Entity) as Entity | null;

                tileS.base ? this.bases.push(tileS.base) : null;
                tileS.obj ? this.objects.push(tileS.obj) : null;
                tileS.entity ? this.entities.push(tileS.entity) : null;

                //this.sprites.push(...[tileS.base, tileS.obj, tileS.entity].filter(e => e !== null) as Sprite[]);

                counter++;
            }
        }
    }

    keyEvent(_e: KeyboardEvent, _dir: Direction) {
        this.savePattern();

        if(_e.key === 'k') {
            console.log(this.p)
        }

        for (const entity of this.entities) {
            if(entity instanceof Cat) {
                switch (_dir) {
                    case 'U': entity.moveCat({x: 0, y: -1}); break;
                    case 'D': entity.moveCat({x: 0, y: 1}); break;
                    case 'L': entity.moveCat({x: -1, y: 0}); break;
                    case 'R': entity.moveCat({x: 1, y: 0}); break;
                }
            }
        }

        // this.game.moveCount++;
        // this.game.uiEl.querySelector('.moves-remaning')!.textContent = this.game.maxMoves ? String(this.game.maxMoves - this.game.moveCount) : '∞';
        // if(this.game.maxMoves && this.game.maxMoves - this.game.moveCount === 0) this.game.changeStatus('levelFailed');
        if(this.allTilesPainted()) this.game.changeStatus('levelComplete');
    }

    mouseEvent(_e: MouseEvent) {
        const mousePos: Position = {
            x: _e.type === 'mousemove' ? (_e.clientX / _e.view!.innerWidth) - 0.5 : 0,
            y: _e.type === 'mousemove' ? (_e.clientY / _e.view!.innerHeight) - 0.5 : 0
        }

        this.gEl.style.setProperty('--rotX', (mousePos.y * 20) + 'deg');
        this.gEl.style.setProperty('--rotZ', (mousePos.x * 20) + 'deg');
    }

    clickEvent(_e: MouseEvent) {
        if(this.game.status === 'levelComplete') {
            this.game.loadNextLevel();
        }
    }

    allTilesPainted(): boolean {
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const tile = this.getTileAt({x, y});
                if (!tile.isTile) continue;
                if ((tile.isWalkable || tile.entity?.element.type === 1) && !(tile.obj instanceof Paint)) return false;
            }
        }
        return true;
    }

    dispose() {
        this.gEl?.remove();
    }
}

export { Grid };