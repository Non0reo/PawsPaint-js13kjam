import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class Puddle extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-puddle');
        this.animateSpread();
    }

    animateSpread(): void {
        this.setAnimation('spread-animation');
        setTimeout(() => this.removeElement(), 1000);
    }
}

export { Puddle };