import type { Grid } from "../../game/grid-types";
import type { ElementData, Position } from "../../types";
import { Entity } from "./core-entity";

class Cat extends Entity {
    constructor(pos: Position, element: ElementData, g: Grid) {
        super(pos, element, g);
        this.div.classList.add('entity-cat');
        this.setBillboard(true);
        this.canWalkOver = false;
    }

    moveCat(dirVector: Position) {
        let nextPos: Position = {x: this.pos.x, y: this.pos.y};

        nextPos.x += dirVector.x;
        nextPos.y += dirVector.y;

        const nextTile = this.g.getTileAt(nextPos);
        if (!nextTile || !nextTile.isWalkable) return;

        if (nextTile.entity instanceof Cat) {
            let afterNextPos: Position = {x: nextPos.x + dirVector.x, y: nextPos.y + dirVector.y};
            const afterNextTile = this.g.getTileAt(afterNextPos);
            if (!afterNextTile || !afterNextTile.isWalkable) return;
        }

        this.moveTo(nextPos);
    }

    actionWhenMoving(): void {
        // Cat specific action when moving
        console.log("Cat is moving to", this.pos);
    }

    hasChanegedPosition(): void {
        console.log("Cat moved to", this.pos);
    }
}

export { Cat };