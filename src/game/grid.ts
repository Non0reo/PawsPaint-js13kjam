import type { Grid } from "./grid-types";
import type { Sprite } from "../tiles/sprite";
import { Base } from "../tiles/base/core-base";
import { Entity } from "../tiles/entities/core-entity";
import { TileObject } from "../tiles/objects/core-object";
import { invokeBaseFromType, invokeObjectFromType, invokeEntityFromType } from "../tiles/tile";
import type { ElementData, GridPattern, Position, Tile } from "../types";

class GridObject implements Grid {
    public p: GridPattern;
    public bases: Base[] = [];
    public objects: TileObject[] = [];
    public entities: Entity[] = [];
    public gridElement: HTMLElement;
    public animate: boolean = true;

    get objectsAll(): Sprite[] {
        return [...this.bases, ...this.objects, ...this.entities];
    }

    get w() {
        return Math.max(...this.p.map(a=>a.length));
    }

    get h() {
        return this.p.length;
    }

    constructor(p: GridPattern, parentElement: HTMLElement) {
        this.p = p;
        this.p.forEach(e => {
            const added = Array(this.w - e.length).fill(0);
            e.push(...added);
        });

        this.gridElement = parentElement.appendChild(document.createElement('div'));
        this.gridElement.classList.add('grid');
        this.gridElement.style.gridTemplate = `repeat(${this.h}, 1rem) / repeat(${this.w}, 1rem)`;

        let counter = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const dataSliced = `${this.p[y][x]}`.split('.');
                while (dataSliced.length < 3) dataSliced.push('0');

                let elInfo: ElementData[] = [];
                dataSliced.forEach(element => {
                    elInfo.push({
                        all: element || null,
                        type: parseInt(element) || 0,
                        data: element.replace(/[^a-zA-Z]/g, '') || null,
                        isEmpty: element === '0' || element === '' ? true : false,
                    });
                });

                /* const tileS = {
                    base: invokeBaseFromType({x, y}, elInfo[0], this),
                    object: invokeObjectFromType({x, y}, elInfo[1], this),
                    entity: invokeEntityFromType({x, y}, elInfo[2], this)
                }

                tileS.base ? this.bases.push(tileS.base) : null;
                tileS.object ? this.objects.push(tileS.object) : null;
                tileS.entity ? this.entities.push(tileS.entity) : null; */
                let tileS: Pick<Tile, 'base' | 'obj' | 'entity'> = {
                    base: null,
                    obj: null,
                    entity: null
                }

                this.animate 
                    ? setTimeout(() => {
                        tileS.base = invokeBaseFromType({x, y}, elInfo[0], this);
                        setTimeout(() => {
                            tileS.obj = invokeObjectFromType({x, y}, elInfo[0], this);
                            tileS.entity = invokeEntityFromType({x, y}, elInfo[0], this);
                        }, 500);
                    }, 100 * counter)

                    : (() => {
                        tileS.base = invokeBaseFromType({x, y}, elInfo[0], this),
                        tileS.obj = invokeObjectFromType({x, y}, elInfo[1], this),
                        tileS.entity = invokeEntityFromType({x, y}, elInfo[2], this)
                    })();

                tileS.base ? this.bases.push(tileS.base) : null;
                tileS.obj ? this.objects.push(tileS.obj) : null;
                tileS.entity ? this.entities.push(tileS.entity) : null;

                counter++;
            }
        }
        console.log(this)
    }

    getTileAt(pos: Position): Tile {
        const match = (arr: Sprite[]) =>
            arr.find(e => e.pos.x === pos.x && e.pos.y === pos.y) ?? null;

        const base = match(this.bases) as Base | null;
        const obj = match(this.objects) as TileObject | null;
        const entity = match(this.entities) as Entity | null;

        let isTile = (base || obj || entity) ? true : false;

        return {
            pos,
            base,
            obj,
            entity,
            tileArray: [base, obj, entity],
            isTile,
            isWalkable: isTile && ((base && base.canWalkOver) || (obj && obj.canWalkOver) || (entity && entity.canWalkOver)) as boolean,
        } as Tile;
    }

    setTileAt(pos: Position, sprite: Sprite): void {
        const removeFromArray = (arr: Sprite[]) => {
            const index = arr.findIndex(e => e.pos.x === pos.x && e.pos.y === pos.y);
            if (index !== -1) arr.splice(index, 1);
        }

        if (sprite instanceof Base) {
            removeFromArray(this.bases);
            this.bases.push(sprite);
        }

        if (sprite instanceof TileObject) {
            removeFromArray(this.objects);
            this.objects.push(sprite);
        }

        if (sprite instanceof Entity) {
            removeFromArray(this.entities);
            this.entities.push(sprite);
        }
    }
        

    loadGrid() {
        if(this.gridElement === null) return;
        this.gridElement.innerHTML = ''; // Clear previous elements if any

        let counter = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const t = this.getTileAt({x, y});
                if(t === null) continue;

                /* animate 
                    ? setTimeout(() => {
                        t.base?.spawnElement();
                        setTimeout(() => {
                            t.obj?.spawnElement();
                            t.entity?.spawnElement();
                        }, 500);
                    }, 100 * counter)

                    : (() => {
                        t.tileArray.forEach(e => {
                            e?.spawnElement(false);
                        })
                    })();

                counter++; */

                let tileS: Pick<Tile, 'base' | 'obj' | 'entity'> = {
                    base: null,
                    obj: null,
                    entity: null
                }

                this.animate 
                    ? setTimeout(() => {
                        tileS.base = invokeBaseFromType({x, y}, elInfo[0], this);
                        setTimeout(() => {
                            tileS.obj = invokeObjectFromType({x, y}, elInfo[0], this);
                            tileS.entity = invokeEntityFromType({x, y}, elInfo[0], this);
                        }, 500);
                    }, 100 * counter)

                    : (() => {
                        tileS.base = invokeBaseFromType({x, y}, elInfo[0], this),
                        tileS.obj = invokeObjectFromType({x, y}, elInfo[1], this),
                        tileS.entity = invokeEntityFromType({x, y}, elInfo[2], this)
                    })();

                counter++;
            }
        }
    }

    dispose() {
        this.gridElement?.remove();
    }
}

export { GridObject };