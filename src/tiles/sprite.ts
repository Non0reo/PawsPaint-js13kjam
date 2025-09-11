import type { GridType } from "../game/grid-types";
import type { Direction, ElementData, Position, SpriteParams } from "../types";
import { directionFromDelta, dirToDegrees } from "../utils";

class Sprite {
    pos: Position;
    div: HTMLDivElement;
    element: ElementData;
    dir: Direction;
    g: GridType;
    id: string = crypto.randomUUID();
    billboard: boolean = false;
    cameraPos: Position;
    moving: boolean = false;
    canWalkOver: boolean = true;

    constructor(opts: SpriteParams) {
        this.pos = opts.pos;
        this.element = opts.el;
        this.dir = (opts.el.data?.length === 1 ? opts.el.data[0] : 'U') as Direction;
        this.g = opts.g;
        this.cameraPos = {x: (this.g.w - 1) / -2, y: 4};
        this.div = this.divGenerator(opts.animationName);
        this.setBillboard();
        this.rotateTo(dirToDegrees(this.dir));
    }

    divGenerator(animateionName?: string): HTMLDivElement {
        let div = document.createElement('div');
        div.classList.add('sprite');
        div.setAttribute('anim', animateionName ?? 'drop-animation');
        div.style.gridArea = `${this.pos.y + 1} / ${this.pos.x + 1}`;
        div.style.setProperty("--rotZ", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad');
        return div;
    }

    setBillboard(isBillboard: boolean = false) {
        this.billboard = isBillboard;
        if(this.billboard) {
            this.div.setAttribute('sprite-render', 'billboard');
            this.div.style.setProperty("--rotX", '-90deg');
            this.div.style.setProperty("--rotZ", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad');
            this.div.style.setProperty("--sprite-y-offset", '-0.3rem');
            this.div.style.setProperty("--sprite-z-offset", '0.0rem');
            this.div.style.transformOrigin = 'center bottom';
        }
        else {
            this.div.setAttribute('sprite-render', 'flat');
            this.div.style.setProperty("--rotX", '0');
            this.div.style.setProperty("--rotZ", '0');
            this.div.style.setProperty("--sprite-y-offset", '0rem');
            this.div.style.setProperty("--sprite-z-offset", '0rem');
            this.div.style.transformOrigin = 'center center';
        }
    }

    setAnimation(name: string = 'no-animation') {
        this.div.setAttribute('anim', name);
    }

    rotateTo(angle: number) {
        this.div.style.setProperty("--rotZ", angle + 'deg');
    }

    moveTo(newPos: Position, force: boolean = false) {
        if(!force &&
            (this.moving || this.g.getTileAt(newPos) === null ||
            (newPos.x < 0 || newPos.y < 0 || newPos.x >= this.g.w || newPos.y >= this.g.h))
        ) return;

        this.g.game.moveCount++;
        this.g.game.uiEl.querySelector('.moves-remaning')!.textContent = this.g.game.maxMoves ? String(this.g.game.maxMoves - this.g.game.moveCount) : '∞';
        if(this.g.game.maxMoves && this.g.game.maxMoves - this.g.game.moveCount === 0) this.g.game.changeStatus('levelFailed');

        this.moving = true;
        this.dir = directionFromDelta(newPos.x - this.pos.x, newPos.y - this.pos.y) || this.dir;

        this.div.style.transition = 'none';
        this.div.style.transform = `
            translate3d(0, var(--sprite-y-offset), var(--sprite-z-offset))
            translate(${this.pos.x - newPos.x}rem, ${this.pos.y - newPos.y}rem)
            rotateZ(var(--rotZ))
            rotateX(var(--rotX))`;
        void this.div.offsetWidth;
        this.div.style.transition = 'transform 0.3s ease-in-out';

        //this.g.setTileAt(newPos, this)
        //console.log(this)
        // Determine direction of movement
        this.actionWhenMoving(newPos, this.dir);
        
       
        this.pos = newPos;
        this.div.style.gridArea = `${this.pos.y + 1} / ${this.pos.x + 1}`;
        this.div.style.setProperty(
            "--rotZ", 
            this.billboard ? Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad' : '0'
        );
        this.div.style.transform = `
            translate3d(0, var(--sprite-y-offset), var(--sprite-z-offset))
            translate(0rem, 0rem)
            rotateZ(var(--rotZ))
            rotateX(var(--rotX))`;

        setTimeout(() => {
            this.moving = false;
            this.hasChangedPosition(newPos, this.dir);
        }, 300);
        
    }

    actionWhenMoving(_pos: Position | null, _dir: Direction | null): void {
    }

    hasChangedPosition(_pos: Position | null, _dir: Direction | null): void {
    }

    /* update() {
        this.div.style.setProperty("--rot", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad');
    } */

    dispose() {
        this.div?.remove();
    }
}

export { Sprite };