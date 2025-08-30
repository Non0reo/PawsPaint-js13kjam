import { Sprite } from "../sprite";
import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";

class Obj extends Sprite {
    constructor(pos: Position, element: ElementData, g: Grid, spawnDelay: number) {
        super(pos, element, g);
        setTimeout(() => this.spawnElement(), spawnDelay);
    }

    spawnElement(animate: boolean = true): void {
        this.div.classList.add("obj", animate ? 'drop-animation' : 'no-animation');
        this.g.gridElement?.appendChild(this.div);
    }
}

export { Obj };