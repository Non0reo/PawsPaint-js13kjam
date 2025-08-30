import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class Ladyline extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-ladyline');
    }
}

export { Ladyline };