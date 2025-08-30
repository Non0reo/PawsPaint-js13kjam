import { Sprite } from "../sprite";
import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";
import { RADIUS } from "../../constants";

class Base extends Sprite {
    constructor(pos: Position, element: ElementData, g: Grid, spawnDelay: number) {
        super(pos, element, g);
        setTimeout(() => this.spawnElement(), spawnDelay);
    }

    spawnElement(animate: boolean = true): void {
        this.div.classList.add("base", animate ? 'drop-animation' : 'no-animation');

        const bR = [
            this.chkBorder(-1,-1) ? '0': RADIUS,
            this.chkBorder(1,-1) ? '0': RADIUS,
            this.chkBorder(1,1) ? '0': RADIUS,
            this.chkBorder(-1,1) ? '0': RADIUS,
        ];
        const bRF = bR.join(' ');
        this.div.style.borderRadius = bRF;

        this.g.gridElement?.appendChild(this.div);
    }

    chkNear(dx: number, dy: number): boolean {
        const t = this.g.getTileAt({x: this.pos.x + dx, y: this.pos.y + dy})?.base ?? null;
        return t !== null;
    }

    chkBorder(dx: number, dy: number): boolean {
        return this.chkNear(dx, 0) || this.chkNear(0, dy);
    }
}

export { Base };