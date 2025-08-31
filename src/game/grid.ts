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

class Grid implements GridType {
    game: Game;
    p: GridPattern = [];
    bases: Base[] = [];
    objects: Obj[] = [];
    entities: Entity[] = [];
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
            //isWalkable: isTile && ((base && base.canWalkOver) && (obj && obj.canWalkOver) && (entity && entity.canWalkOver)) as boolean,
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

    setPattern(newPattern: GridPattern, loadNow: boolean = false): void {
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
        if(loadNow) this.loadGrid();
    }
        

    loadGrid() {
        if(this.gEl === null) return;
        this.bases, this.objects, this.entities = [];
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

                tileS.base = invokeSpriteFromType({pos: {x, y}, el: extEl[0], g: this, spawnDelay: this.animate ? 100 * counter : 0}, Base) as Base | null;
                tileS.obj = invokeSpriteFromType({pos: {x, y}, el: extEl[1], g: this, spawnDelay: this.animate ? 100 * counter + 500 : 0}, Obj) as Obj | null;
                tileS.entity = invokeSpriteFromType({pos: {x, y}, el: extEl[2], g: this, spawnDelay: this.animate ? 100 * counter + 500 : 0}, Entity) as Entity | null;

                tileS.base ? this.bases.push(tileS.base) : null;
                tileS.obj ? this.objects.push(tileS.obj) : null;
                tileS.entity ? this.entities.push(tileS.entity) : null;

                counter++;
            }
        }
    }

    keyEvent(_e: KeyboardEvent, _dir: Direction) {
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