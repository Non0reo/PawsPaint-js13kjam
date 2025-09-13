import type { Direction, Position, SpriteParams } from "../../types";
import { dirToPosVector, patternToElementData } from "../../utils";
import { Obj } from "./core-object";
import { Paint } from "./paint";
import { Puddle } from "./puddle";
import { EmptyBucket } from "./empty-bucket";

class Bucket extends Obj {
    isUsed: boolean;

    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-bucket');
        this.setBillboard(true);
        this.canWalkOver = false;
        this.isUsed = false;
    }

    passingBy(_pos: Position | null, _dir: Direction | null): void {
        if(!_pos || !_dir || this.isUsed) return;
        this.isUsed = true;

        // Remove this bucket and replace with EmptyBucket for rewind tracking
        this.g.setTileAt(_pos, new EmptyBucket({
            pos: { ..._pos },
            el: patternToElementData(`0.7${_dir}`)[1],
            g: this.g,
            spawnDelay: 0,
            animationName: 'fade-animation'
        }));

        // Spawn a puddle on every tile in the direction of the bucket until hitting the grid edge
        let pos = { ..._pos };
        const vec = dirToPosVector(_dir);
        while (true) {
            pos = { x: pos.x + vec.x, y: pos.y + vec.y };
            if (pos.x < 0 || pos.y < 0 || pos.x >= this.g.w || pos.y >= this.g.h) break;
            const tile = this.g.getTileAt(pos);
            if (!tile/*  || !tile.isTile */) break;
            // Remove paint if present
            if (tile.obj && tile.obj instanceof Paint) {
                tile.obj.removeElement();
            }
            this.g.setTileAt(pos, new Puddle({
                pos: { ...pos },
                el: patternToElementData("0.5")[1],
                g: this.g,
                spawnDelay: 0,
                animationName: 'fade-animation'
            }));
        }

        this.removeElement();
    }
    
}

export { Bucket };