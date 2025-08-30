import type { Direction, Position, SpriteParams } from "../../types";
import { patternToElementData } from "../../utils";
import { Paint } from "../objects/paint";
import { Entity } from "./core-entity";

class Cat extends Entity {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('entity-cat');
        this.setBillboard(true);
        this.canWalkOver = false;
    }

    moveCat(dirVector: Position) {
        let nextPos: Position = {x: this.pos.x, y: this.pos.y};

        nextPos.x += dirVector.x;
        nextPos.y += dirVector.y;

        const nextTile = this.g.getTileAt(nextPos);
        console.log(nextTile);
        if (nextTile.entity instanceof Cat) {
            console.log("Cat in the way, checking if it can move");
            let afterNextPos: Position = {x: nextPos.x + dirVector.x, y: nextPos.y + dirVector.y};
            const afterNextTile = this.g.getTileAt(afterNextPos);
            if (!afterNextTile || !afterNextTile.isWalkable) return;
            
        }
        else if (!nextTile || !nextTile.isWalkable) return;

        this.moveTo(nextPos);
    }

    actionWhenMoving(_pos: Position | null, _dir: Direction | null): void {
        if(!_pos || !_dir) return;

        const tile = this.g.getTileAt(_pos);
        if (tile.obj && tile.obj instanceof Paint) return;

        this.g.setTileAt(_pos, new Paint({
            pos: _pos,
            element: patternToElementData("0.1" + _dir)[1],
            g: this.g,
            spawnDelay: 0,
            animationName: 'fade-animation'
        }));
    }

    hasChangedPosition(_pos: Position | null, _dir: Direction | null): void {
        if(!_pos || !_dir) return;
        this.g.setTileAt(_pos, this)
        //console.log("Cat moved to", this.pos);
    }
}

export { Cat };