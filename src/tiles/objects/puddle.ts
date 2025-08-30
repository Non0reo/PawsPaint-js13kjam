import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class Puddle extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-puddle');
    }
}

export { Puddle };