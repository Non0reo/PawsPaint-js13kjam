import { Cat } from "./tiles/entities/cat";
import { Soap } from "./tiles/objects/soap";
import { Grid } from "./game/grid";
import type { Position } from "./types";

import "./tiles/base/core-base"

    
/* let gObj = new GObj([
    ['1.0.1U', 1.1, 1, 1, 1.3],
    [0, 1.4, 1, 0, 1, 1],
    [0, 1, 0, 1, 1.2]
]); */

/* let gObj = new GObj([
    ['1.1R.1', 1.0, '1.0.1U', 1, 1.3],
    [0, 1, 1.4, 0, 1, '1.0.1U'],
    [0, '1.0.1U', 0, '1.0.1U', 1.2]
], document.querySelector('#game')!, false, true); */

let gObj = new Grid([
    ['1.1R.1', '1.1R.1', 1, 1, 1.3],
    [0, 1, 1.4, 0, 1, 1],
    [0, 1, 0, 1, 1.2]
], document.querySelector('#game')!, false, true);

/* let gObj = new GObj([
    ['1.0.1U', 1.1, '1.0.1U', 1, 1.3],
    [0, 1.4, 1, 0, 1, '1.0.1U'],
    [0, '1.0.1U', 0, '1.0.1U', 1.2],
    [0, '1.0.1U', 0, '1.0.1U', 1.2],
    [0, '1.0.1U', 0, '1.0.1U', 1.2, 1, 1, 1, 1],
    [0, '1.0.1U', 0, '1.0.1U', 1.2]
], document.querySelector('#game') ?? document.body); */

setTimeout(() => {
    gObj.loadGrid();
    console.log(gObj)
}, 1000);


let gameKeys = {
    up: ['w', 'z', 'ArrowUp'],
    down: ['s', 'ArrowDown'],
    left: ['a', 'q', 'ArrowLeft'],
    right: ['d', 'ArrowRight'],
}

//Events
window.addEventListener('keydown', (e) => {
    if(e.key === ' ') {
        
        const soap = gObj.objects.find(en => en instanceof Soap) as Soap | undefined;
        console.log(soap, gObj.objects)
        soap?.moveTo({x: 1, y: -5}, true);
        return;
    }

    if(e.key === 'k') {
        console.log(gObj.p)
    }

    let dir: string | null = null;
    Object.entries(gameKeys).forEach(([key, value]) => {
        if(value.includes(e.key)) dir = key;
    });
    if(dir === null) return;
    //console.log(dir, gObj);

    for (const entity of gObj.entities) {
        if(entity instanceof Cat) {
            switch (dir) {
                case 'up': entity.moveCat({x: 0, y: -1}); break;
                case 'down': entity.moveCat({x: 0, y: 1}); break;
                case 'left': entity.moveCat({x: -1, y: 0}); break;
                case 'right': entity.moveCat({x: 1, y: 0}); break;
            }
        }
    }
});

window.addEventListener('mousemove', (e) => {
    const mousePos: Position = {
        x: (e.clientX / e.view!.innerWidth) - 0.5,
        y: (e.clientY / e.view!.innerHeight) - 0.5
    }

    //gObj.gEl.style.transform = `perspective(700px) rotateX(${mousePos.y * 20 + 50}deg) rotateZ(${mousePos.x * 20}deg) translate3d(0rem, -0rem, 0rem)`;
    gObj.gEl.style.setProperty('--rotX', (mousePos.y * 20) + 'deg');
    gObj.gEl.style.setProperty('--rotZ', (mousePos.x * 20) + 'deg');
});

window.addEventListener('mouseout', () => {
    gObj.gEl.style.setProperty('--rotX', '0deg');
    gObj.gEl.style.setProperty('--rotZ', '0deg');
});


/* function update() {
    requestAnimationFrame(update);

    for (const entities of gObj.entities) {
        entities.update();
    }
        
}
requestAnimationFrame(update); */