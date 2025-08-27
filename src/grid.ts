import type { Grid } from "./grid-types";
import type { Sprite } from "./sprite";
import type { Base } from "./tiles/base/core-base";
import type { Entity } from "./tiles/entities/core-entity";
import type { TileObject } from "./tiles/objects/core-object";
import { invokeBaseFromType, invokeObjectFromType, invokeEntityFromType } from "./tiles/tile";
import type { ElementData, GridPattern, Position, Tile } from "./types";

class GridObject implements Grid {
    public p: GridPattern;
    public bases: Base[] = [];
    public objects: TileObject[] = [];
    public entities: Entity[] = [];
    public gridElement: HTMLElement;

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

                const tileS = {
                    base: invokeBaseFromType({x, y}, elInfo[0], this),
                    object: invokeObjectFromType({x, y}, elInfo[1], this),
                    entity: invokeEntityFromType({x, y}, elInfo[2], this)
                }

                tileS.base ? this.bases.push(tileS.base) : null;
                tileS.object ? this.objects.push(tileS.object) : null;
                tileS.entity ? this.entities.push(tileS.entity) : null;
            }
        }
        
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
            tile: [base, obj, entity],
            isTile,
            isWalkable: isTile && ((base && base.canWalkOver) || (obj && obj.canWalkOver) || (entity && entity.canWalkOver)) as boolean,
        } as Tile;
    }

    loadGrid(animate: boolean = true) {
        if(this.gridElement === null) return;
        this.gridElement.innerHTML = ''; // Clear previous elements if any

        let counter = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const t = this.getTileAt({x, y});
                if(t === null) continue;

                animate 
                    ? setTimeout(() => {
                        t.base?.spawnElement();
                        setTimeout(() => {
                            t.obj?.spawnElement();
                            t.entity?.spawnElement();
                        }, 500);
                    }, 100 * counter)

                    : (() => {
                        t.tile.forEach(e => {
                            e?.spawnElement(false);
                        })
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