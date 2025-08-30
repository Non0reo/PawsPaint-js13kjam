import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class Paint extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-paint');
    }
}

export { Paint };