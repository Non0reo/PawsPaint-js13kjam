import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";
import { Obj } from "./core-object";

class Soap extends Obj {
    constructor(pos: Position, element: ElementData, g: Grid, spawnDelay: number) {
        super(pos, element, g, spawnDelay);
        this.div.classList.add('obj-soap');
    }
}

export { Soap };