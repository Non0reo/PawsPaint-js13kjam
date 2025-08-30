import type { Grid } from "../game/grid-types";
import type { Sprite } from "../tiles/sprite";
import { Base } from "../tiles/base/core-base";
import { Entity } from "../tiles/entities/core-entity";
import { Obj } from "../tiles/objects/core-object";
import { invokeBaseFromType, invokeObjectFromType, invokeEntityFromType } from "../tiles/tile";
import type { ElementData, GridPattern, Position, Tile } from "../types";
import { elementDataToPattern, patternToElementData } from "../utils";

class GridObject implements Grid {
    public p: GridPattern;
    public bases: Base[] = [];
    public objects: Obj[] = [];
    public entities: Entity[] = [];
    public gridElement: HTMLElement;
    public animate: boolean = true;
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

    constructor(p: GridPattern, parentElement: HTMLElement, loadNow: boolean = true, animate: boolean = true) {
        this.p = p;
        this.p.forEach(e => {
            const added = Array(this.w - e.length).fill(0);
            e.push(...added);
        });

        this.gridElement = parentElement.appendChild(document.createElement('div'));
        this.gridElement.classList.add('grid');
        this.gridElement.style.gridTemplate = `repeat(${this.h}, 1rem) / repeat(${this.w}, 1rem)`;

        this.animate = animate;

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                /* const dataSliced = `${this.p[y][x]}`.split('.');
                while (dataSliced.length < 3) dataSliced.push('0');

                let elData: ElementData[] = [];
                dataSliced.forEach(element => {
                    elData.push({
                        raw: element || null,
                        type: parseInt(element) || 0,
                        data: element.replace(/[^a-zA-Z]/g, '') || null,
                        isEmpty: element === '0' || element === '' ? true : false,
                    });
                }); */

                this._extractedData.push(patternToElementData(this.p[y][x]));
            }
        }
        
        if(loadNow) this.loadGrid();
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
            //const element = sprite.element;

            //this.p[pos.y][pos.x] = elementDataToPattern([element], this.p[pos.y][pos.x]);
            this.p = this.buildPattern();

            // Update the grid element's style if needed
            if (this.gridElement) {
                this.gridElement.style.gridTemplate = `repeat(${this.h}, 1rem) / repeat(${this.w}, 1rem)`;
            }

        }
    }

    buildPattern(): GridPattern {
        let newPattern: GridPattern = [];
        for (let y = 0; y < this.h; y++) {
            let row: (string | number)[] = [];
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
        

    loadGrid() {
        if(this.gridElement === null) return;
        this.bases, this.objects, this.entities = [];
        this.gridElement.innerHTML = ''; // Clear previous elements if any

        let counter = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const element = this._extractedData[counter];

                let tileS: Pick<Tile, 'base' | 'obj' | 'entity'> = {
                    base: null,
                    obj: null,
                    entity: null
                }
                    
                tileS.base = invokeBaseFromType({x, y}, element[0], this, this.animate ? 100 * counter : 0);
                tileS.obj = invokeObjectFromType({x, y}, element[1], this, this.animate ? 100 * counter + 500 : 0);
                tileS.entity = invokeEntityFromType({x, y}, element[2], this, this.animate ? 100 * counter + 500 : 0);

                tileS.base ? this.bases.push(tileS.base) : null;
                tileS.obj ? this.objects.push(tileS.obj) : null;
                tileS.entity ? this.entities.push(tileS.entity) : null;

                counter++;
            }
        }
    }

    dispose() {
        this.gridElement?.remove();
    }
}

export { GridObject };