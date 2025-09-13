import { Sprite } from "../sprite";
import type { SpriteParams } from "../../types";

class Obj extends Sprite {
        constructor(opts: SpriteParams) {
        super(opts);
        setTimeout(() => this.spawnElement(), opts.spawnDelay);
    }

    spawnElement(): void {
        this.div.classList.add("obj");
        this.g.gEl?.appendChild(this.div);
    }

    removeElement(): void {
        this.g.objects = this.g.objects.filter(e => e.id !== this.id);
        this.dispose();
    }
}

export { Obj };