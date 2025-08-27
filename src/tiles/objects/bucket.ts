import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";
import { TileObject } from "./core-object";

class Bucket extends TileObject {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
        this.div.classList.add('obj-bucket');
        this.setBillboard(true);
    }
}

export { Bucket };