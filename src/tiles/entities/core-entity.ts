import { Sprite } from "../sprite";
import type { SpriteParams } from "../../types";


class Entity extends Sprite {
    constructor(opts: SpriteParams) {
        super(opts);
        setTimeout(() => this.spawnElement(), opts.spawnDelay);
    }

    spawnElement(): void {
        this.div.classList.add("entity");
        this.g.gEl?.appendChild(this.div);
    }
}

export { Entity };
