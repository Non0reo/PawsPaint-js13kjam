import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";
import { Obj } from "./core-object";

class Yarn extends Obj {
    constructor(pos: Position, element: ElementData, g: Grid, spawnDelay: number) {
        super(pos, element, g, spawnDelay);
        this.div.classList.add('obj-yarn');
        this.setBillboard(true);
    }
}

export { Yarn };