import type { Grid } from "../../grid-types";
import type { ElementData, Position } from "../../types";
import { TileObject } from "./core-object";

class Ladyline extends TileObject {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
        this.div.classList.add('obj-ladyline');
    }
}

export { Ladyline };