import type { Direction, Position, SpriteParams } from "../../types";
import { dirToDegrees } from "../../utils";
import { Obj } from "./core-object";

class Bucket extends Obj {
    constructor(opts: SpriteParams) {
        super(opts);
        this.div.classList.add('obj-bucket');
        this.setBillboard(true);
        this.canWalkOver = false;
    }

    passingBy(_pos: Position | null, _dir: Direction | null): void {
        if(!_pos || !_dir) return;
        // Trigger some action when a Cat passes by
        this.div.classList.add('obj-bucket-active');
        console.log("Bucket triggered at", _pos, "in direction", _dir);

        //this.div.style.setProperty("--rotY", 45 + 'deg');
        this.setBillboard(false);
        this.rotateTo(dirToDegrees(_dir));
        setTimeout(() => {
            this.div.classList.remove('obj-bucket-active');
        }, 500);
    }
    
}

export { Bucket };