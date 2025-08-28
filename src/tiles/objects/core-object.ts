import type { Grid } from "../../game/grid-types";
import { Sprite } from "../sprite";
import type { ElementData, Position } from "../../types";

class TileObject extends Sprite {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
        this.spawnElement();
    }

    spawnElement(animate: boolean = true): void {
        if (this.element.isEmpty) return;
        this.div.classList.add("obj", animate ? 'drop-animation' : 'no-animation');
        this.g.gridElement?.appendChild(this.div);
    }
}

export { TileObject };