
import type { SpriteParams } from "../../types";
import { Obj } from "./core-object";

class EmptyBucket extends Obj {
	constructor(opts: SpriteParams) {
		super(opts);
		this.div.classList.add('obj-empty-bucket');
		this.canWalkOver = false;
	}
}

export { EmptyBucket };
