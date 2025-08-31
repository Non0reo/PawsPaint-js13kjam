import { Sprite } from "../sprite";
import type { SpriteParams } from "../../types";
import { RADIUS } from "../../constants";

class Base extends Sprite {
    constructor(opts: SpriteParams) {
        super(opts);
        setTimeout(() => this.spawnElement(), opts.spawnDelay);
    }

    spawnElement(): void {
        this.div.classList.add("base");

        const bR = [
            this.chkBorder(-1,-1) ? '0': RADIUS,
            this.chkBorder(1,-1) ? '0': RADIUS,
            this.chkBorder(1,1) ? '0': RADIUS,
            this.chkBorder(-1,1) ? '0': RADIUS,
        ];
        const bRF = bR.join(' ');
        this.div.style.borderRadius = bRF;

        this.g.gEl?.appendChild(this.div);
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