import { Sprite } from "./sprite";
import { RADIUS } from "./constants";
import type { ElementData, Position } from "./types";
import type { Grid } from "./grid-types";

class Base extends Sprite {
    constructor(pos: Position, tileBase: ElementData, g: Grid) {
        super(pos, tileBase, g);
    }

    spawnTileBase() {
        if(this.element.isEmpty) return;
        this.div.classList.add('base');

        const bR = [
            this.chkBorder(-1,-1) ? '0': RADIUS,
            this.chkBorder(1,-1) ? '0': RADIUS,
            this.chkBorder(1,1) ? '0': RADIUS,
            this.chkBorder(-1,1) ? '0': RADIUS,
        ];
        const bRF = bR.join(' ')
        
        this.div.classList.add('walkable');
        this.div.style.borderRadius = bRF;

        this.g.gridElement?.appendChild(this.div);
    }

    chkNear(dx: number, dy: number): boolean {
        const t = this.g.tile({x: this.pos.x + dx, y: this.pos.y + dy})?.base ?? null;
        if(t === null) return false;
        return !t.element.isEmpty;
    }

    chkBorder(dx: number, dy: number): boolean {
        return this.chkNear(dx, 0) || this.chkNear(0, dy);
    }
}


class TileObject extends Sprite {
    constructor(pos: Position, tileObj: ElementData, g: Grid) {
        super(pos, tileObj, g);
    }

    spawnTileObject() {
        if(this.element.isEmpty) return;
        this.div.classList.add('obj');

        switch (this.element.type) {
            case 1:
                this.div.classList.add('obj-paint');
                break;

            case 2:
                this.div.classList.add('obj-yarn');
                this.setBillboard(true);
                break;
                
            case 3:
                this.div.classList.add('obj-soap');
                break;

            case 4:
                this.div.classList.add('obj-bucket');
                this.setBillboard(true);
                break;
            
            case 5:
                this.div.classList.add('obj-puddle');
                break;

            case 6:
                this.div.classList.add('obj-ladyline');
                break;
        
            default:
                break;
        }
        
        this.g.gridElement?.appendChild(this.div);
    }
}

class Entity extends Sprite {

    //constructor(pos: position, type: EntityType, id: number) {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
    }

    spawnEntity() {
        if(this.element.isEmpty) return;
        this.div.classList.add('entity');

        switch (this.element.type) {
            case 1:
                this.div.classList.add('entity-cat');
                this.setBillboard(true);
                break;

            case 2:
                this.div.classList.add('entity-mouse');
                break;
                
            case 3:
                this.div.classList.add('entity-lady');
                this.setBillboard(true);
                break;
        }

        this.g.gridElement?.appendChild(this.div);

        /* setTimeout(() => {
            console.log("dance");
            this.div.style.animation = 'joy-dance 1s ease infinite';
        }, 2000); */
    }

    /* moveTo(newPos: Position) {
        //if tile not walkable, return
        this.g.tile(newPos)?.base?.element.isEmpty && console.log("not walkable");
        //if out of bounds, return
        if(newPos.x < 0 || newPos.y < 0 || newPos.x >= this.g.w || newPos.y >= this.g.h) return;


        this.pos = newPos;
        this.div.style.gridArea = `${this.pos.y + 1} / ${this.pos.x + 1}`;
        this.div.style.setProperty("--x", `${this.pos.x}`);
        this.div.style.setProperty("--y", `-${this.pos.y}`);
    } */
}

export { Base, TileObject, Entity };