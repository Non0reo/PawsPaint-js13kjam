import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";
import { Entity } from "./core-entity";

class Lady extends Entity {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
        this.div.classList.add('entity-lady');
        this.setBillboard(true);
    }

    actionWhenMoving(): void {
        // Cat specific action when moving
        console.log("Lady is moving to", this.pos);
    }

    hasChanegedPosition(): void {
        console.log("Lady moved to", this.pos);
    }
}

export { Lady };