import type { Grid } from "./grid-types";
import type { ElementData, Position } from "./types";

class Sprite {
    pos: Position;
    div: HTMLDivElement;
    element: ElementData;
    g: Grid;
    billboard: boolean = false;
    cameraPos: Position;
    targetPos: Position;
    moveProgress: number = 0;
    moving: boolean = false;

    constructor(pos: Position, element: ElementData, g: Grid) {
        this.pos = pos;
        this.targetPos = pos;
        this.element = element;
        this.g = g;
        this.cameraPos = {x: (this.g.w - 1) / -2, y: 4};
        this.div = this.divGenerator();
        this.setBillboard();
    }

    divGenerator() {
        let div = document.createElement('div');
        div.classList.add('sprite');
        div.style.gridArea = `${this.pos.y + 1} / ${this.pos.x + 1}`;
        div.style.setProperty("--rotation", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad');
        return div;
    }

    setBillboard(isBillboard: boolean = false) {
        this.billboard = isBillboard;
        /* const classSprite = isBillboard ? 'billboard' : 'flat';
        this.div.setAttribute('sprite-render', classSprite);
        this.div.style.setProperty("--rotationX", isBillboard ? '-90deg' : '0deg');
        this.div.style.setProperty("--rotationZ", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad'); */

        if(this.billboard) {
            this.div.setAttribute('sprite-render', 'billboard');
            this.div.style.setProperty("--rotationX", '-90deg');
            this.div.style.setProperty("--rotationZ", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad');
            this.div.style.setProperty("--sprite-y-offset", '-0.3rem');
            this.div.style.setProperty("--sprite-z-offset", '0.0rem');
            
        }
        else {
            this.div.setAttribute('sprite-render', 'flat');
            this.div.style.setProperty("--rotationX", '0deg');
            this.div.style.setProperty("--rotationZ", '0');
            this.div.style.setProperty("--sprite-y-offset", '0rem');
            this.div.style.setProperty("--sprite-z-offset", '0rem');
        }

    }

    moveTo(newPos: Position) {
        if(this.moving) return;
        this.g.tile(newPos)?.base?.element.isEmpty && console.log("not walkable");
        if(newPos.x < 0 || newPos.y < 0 || newPos.x >= this.g.w || newPos.y >= this.g.h) return;

        this.moving = true;
        
        if(this.billboard) {
            this.div.style.setProperty("--rotationZ", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad');
        }
        else {
            this.div.style.setProperty("--rotationZ", '0');
        }

        this.div.style.transform = `
            translate3d(0, var(--sprite-y-offset), var(--sprite-z-offset))
            translate(${newPos.x - this.pos.x}rem, ${newPos.y - this.pos.y}rem)
            rotateZ(var(--rotationZ))
            rotateX(var(--rotationX))`;

        this.pos = newPos;

        setTimeout(() => {
            this.div.style.transition = 'none';
            this.div.style.gridArea = `${this.pos.y + 1} / ${this.pos.x + 1}`;
            this.div.style.transform = `
                translate3d(0, var(--sprite-y-offset), var(--sprite-z-offset))
                rotateZ(var(--rotationZ))
                rotateX(var(--rotationX))`;
            void this.div.offsetWidth;
            this.div.style.transition = 'all 0.3s ease-in-out';
            this.moving = false;
        }, 300);
        
    }

    update() {
        this.div.style.setProperty("--rotation", Math.atan2(this.pos.x + this.cameraPos.x, this.pos.y + this.cameraPos.y) + 'rad');
    }
}

export { Sprite };