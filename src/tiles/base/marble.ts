import type { SpriteParams } from "../../types";
import { Base } from "./core-base";

class Marble extends Base {
    //constructor(pos: Position, data: any, g: Grid, spawnDelay: number) {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('walkable', 'base-marble');
    }

    actionWhenMoving(): void {
        // Cat specific action when moving
        console.log("Cat is moving to", this.pos);
    }

    hasChanegedPosition(): void {
        console.log("Cat moved to", this.pos);
    }
}

export { Marble };