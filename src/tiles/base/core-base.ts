import { RADIUS } from "../../constants";
import type { Grid } from "../../grid-types";
import { Sprite } from "../../sprite";
import type { ElementData, Position } from "../../types";

class Base extends Sprite {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
    }

    spawnElement(animate: boolean = true): void {
        if (this.element.isEmpty) return;
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
        if(t === null) return false;
        return !t.element.isEmpty;
    }

    chkBorder(dx: number, dy: number): boolean {
        return this.chkNear(dx, 0) || this.chkNear(0, dy);
    }
}

export { Base };