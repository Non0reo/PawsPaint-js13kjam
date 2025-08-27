import type { Grid } from "../../grid-types";
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

        // Check if the next position is walkable
        const nextTile = this.g.getTileAt(nextPos);
        if (!nextTile || !nextTile.isWalkable) {
            return; // Can't move if the next tile is not walkable
        }

        if (nextTile.entity instanceof Cat) {
            //check if tile after the other cat is walkable
            let afterNextPos: Position = {x: nextPos.x + dirVector.x, y: nextPos.y + dirVector.y};
            const afterNextTile = this.g.getTileAt(afterNextPos);
            if (!afterNextTile || !afterNextTile.isWalkable) {
                return; // Can't move if the tile after the other cat is not walkable
            }
            // Move the other cat first
            //(nextTile.entity as Cat).moveCat(dirVector);
        }

        

        // Move to the new position
        this.moveTo(nextPos);
    }

    /* actionWhenMoving(): void {
        // Cat specific action when moving
        console.log("Cat is moving to", this.pos);
    }

    hasChanegedPosition(): void {
        console.log("Cat moved to", this.pos);
    } */
}

export { Cat };