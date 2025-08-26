import { Base, Entity, TileObject } from "./tile";
import type { ElementData, GridPattern, Position, Tile } from "./types";
import { RADIUS } from "./constants";
import type { Grid } from "./grid-types";

class GridObject implements Grid {
    public p: number[][];
    public base: Base[] = [];
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

                this.base.push(new Base({x, y}, elInfo[0], this))
                this.objects.push(new TileObject({x, y}, elInfo[1], this))

                if(elInfo[2].isEmpty) continue;
                this.entities.push(new Entity({x, y}, elInfo[2], this));
            }
        }
        
    }

    tile(pos: Position): Tile | null {
        const match = (arr: { pos: Position }[]) =>
            arr.find(e => e.pos.x === pos.x && e.pos.y === pos.y) ?? null;

        const base = match(this.base);
        const obj = match(this.objects);
        const entity = match(this.entities);

        if (!base && !obj && !entity) return null;

        return {
            pos,
            base,
            obj,
            entity,
            isTile: true
        } as Tile;
    }

    loadGrid() {
        if(this.gridElement === null) return;
        this.gridElement.innerHTML = '';

        let counter = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const t = this.tile({x, y});
                if(t === null) continue;

                setTimeout(() => {
                    t.base?.spawnTileBase();
                    setTimeout(() => {
                        t.obj?.spawnTileObject();
                        t.entity?.spawnEntity();
                    }, 500);
                }, 100 * counter);

                counter++;
            }
        }
    }

    dispose() {
        this.gridElement?.remove();
    }
}


    
/* let gridObject = new GridObject([
    ['1.0.1U', 1.1, 1, 1, 1.3],
    [0, 1.4, 1, 0, 1, 1],
    [0, 1, 0, 1, 1.2]
]); */

let gridObject = new GridObject([
    ['1.0.1U', 1.1, '1.0.1U', 1, 1.3],
    [0, 1, 1.4, 0, 1, '1.0.1U'],
    [0, '1.0.1U', 0, '1.0.1U', 1.2]
], document.querySelector('#game') ?? document.body);

/* let gridObject = new GridObject([
    ['1.0.1U', 1.1, '1.0.1U', 1, 1.3],
    [0, 1.4, 1, 0, 1, '1.0.1U'],
    [0, '1.0.1U', 0, '1.0.1U', 1.2],
    [0, '1.0.1U', 0, '1.0.1U', 1.2],
    [0, '1.0.1U', 0, '1.0.1U', 1.2, 1, 1, 1, 1],
    [0, '1.0.1U', 0, '1.0.1U', 1.2]
], document.querySelector('#game') ?? document.body); */

setTimeout(() => {
    gridObject.loadGrid();
}, 1000);


let gameKeys = {
    up: ['w', 'z', 'ArrowUp'],
    down: ['s', 'ArrowDown'],
    left: ['a', 'q', 'ArrowLeft'],
    right: ['d', 'ArrowRight'],
}

//Events
window.addEventListener('keydown', (e) => {
    console.log(e.key);

    //get direction from key
    let dir: string | null = null;
    Object.entries(gameKeys).forEach(([key, value]) => {
        if(value.includes(e.key)) dir = key;
    });
    if(dir === null) return;
    console.log(dir);

    for (const entities of gridObject.entities) {
        if(dir === 'up') entities.moveTo({x: entities.pos.x, y: entities.pos.y - 1});
        if(dir === 'down') entities.moveTo({x: entities.pos.x, y: entities.pos.y + 1});
        if(dir === 'left') entities.moveTo({x: entities.pos.x - 1, y: entities.pos.y});
        if(dir === 'right') entities.moveTo({x: entities.pos.x + 1, y: entities.pos.y});
        
    }
});


function update() {
    requestAnimationFrame(update);

    for (const entities of gridObject.entities) {
        entities.update();
    }
        
}
requestAnimationFrame(update);



export { GridObject, RADIUS };