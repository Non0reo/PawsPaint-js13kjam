import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class Soap extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-soap');
    }
}

export { Soap };