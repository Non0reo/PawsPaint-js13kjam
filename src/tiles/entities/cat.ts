import type { Direction, Position, SpriteParams } from "../../types";
import { patternToElementData } from "../../utils";
import { Bucket } from "../objects/bucket";
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
        if (nextTile.entity instanceof Cat) {
            let afterNextPos: Position = {x: nextPos.x + dirVector.x, y: nextPos.y + dirVector.y};
            const afterNextTile = this.g.getTileAt(afterNextPos);
            if (!afterNextTile || !afterNextTile.isWalkable) return;
        }
        else if (!nextTile || !nextTile.isWalkable) return;

        this.moveTo(nextPos);
    }

    actionWhenMoving(_pos: Position | null, _dir: Direction | null): void {
        if(!_pos || !_dir) return;

        
        // Checks tiles all around for Buckets, and if found, triggers their action
        const directions: Position[] = [
            {x: 0, y: -1}, // Up
            {x: 1, y: 0},  // Right
            {x: 0, y: 1},  // Down
            {x: -1, y: 0}  // Left
        ];
        directions.forEach(dir => {
            const checkPos: Position = {x: _pos.x + dir.x, y: _pos.y + dir.y};
            const checkTile = this.g.getTileAt(checkPos);
            //_dirDelta is the direction from the cat to the bucket
            const _dirDelta = dir.x === 1 ? 'R' : dir.x === -1 ? 'L' : dir.y === 1 ? 'D' : 'U';
            console.log(checkPos, checkTile, _dirDelta);
            if (checkTile.obj && checkTile.obj instanceof Bucket) {
                checkTile.obj.passingBy(checkPos, _dirDelta);
            }
        });


        const tile = this.g.getTileAt(_pos);
        //if (tile.obj && tile.obj instanceof Paint) return;
        if (tile.obj) return;

        this.g.setTileAt(_pos, new Paint({
            pos: _pos,
            el: patternToElementData("0.1" + _dir)[1],
            g: this.g,
            spawnDelay: 0,
            animationName: 'fade-animation'
        }));

    }

    hasChangedPosition(_pos: Position | null, _dir: Direction | null): void {
        if(!_pos || !_dir) return;
        this.g.setTileAt(_pos, this);
    }
}

export { Cat };