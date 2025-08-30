import { Sprite } from "../sprite";
import type { SpriteParams } from "../../types";

class Obj extends Sprite {
        constructor(opts: SpriteParams) {
        super(opts);
        setTimeout(() => this.spawnElement(), opts.spawnDelay);
    }

    spawnElement(): void {
        this.div.classList.add("obj");
        this.g.gridElement?.appendChild(this.div);
    }
}

export { Obj };