import type { SpriteParams } from "../../types";
import { Entity } from "./core-entity";

class Mouse extends Entity {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('entity-mouse');
        this.setBillboard(true);
    }

    actionWhenMoving(): void {
        // Cat specific action when moving
        console.log("Mouse is moving to", this.pos);
    }

    hasChanegedPosition(): void {
        console.log("Mouse moved to", this.pos);
    }
}

export { Mouse };