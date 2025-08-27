import { Sprite } from "../../sprite";
import type { ElementData, Position } from "../../types";
import type { Grid } from "../../grid-types";

class Entity extends Sprite {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
    }

    spawnElement(animate: boolean = true): void {
        if (this.element.isEmpty) return;
        this.div.classList.add("entity", animate ? 'drop-animation' : 'no-animation');
        this.g.gridElement?.appendChild(this.div);
    }

    actionWhenMoving(): void {
        // Default action when moving
    }
}

export { Entity };
