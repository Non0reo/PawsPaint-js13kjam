import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";
import { TileObject } from "./core-object";

class Yarn extends TileObject {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
        this.div.classList.add('obj-yarn');
        this.setBillboard(true);
    }
}

export { Yarn };