import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class Yarn extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-yarn');
        this.setBillboard(true);
    }
}

export { Yarn };