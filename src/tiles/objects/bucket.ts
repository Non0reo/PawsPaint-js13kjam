import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class Bucket extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-bucket');
        this.setBillboard(true);
        this.canWalkOver = false;
    }
}

export { Bucket };