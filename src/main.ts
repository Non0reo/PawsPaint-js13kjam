import { Cat } from "./tiles/entities/cat";
import { Soap } from "./tiles/objects/soap";
import { GridObject } from "./game/grid";
import type { Position } from "./types";


    
/* let gridObject = new GridObject([
    ['1.0.1U', 1.1, 1, 1, 1.3],
    [0, 1.4, 1, 0, 1, 1],
    [0, 1, 0, 1, 1.2]
]); */

/* let gridObject = new GridObject([
    ['1.1R.1', 1.0, '1.0.1U', 1, 1.3],
    [0, 1, 1.4, 0, 1, '1.0.1U'],
    [0, '1.0.1U', 0, '1.0.1U', 1.2]
], document.querySelector('#game')!, false, true); */

let gridObject = new GridObject([
    ['1.1R.1', '1.1R.1', 1, 1, 1.3],
    [0, 1, 1.4, 0, 1, 1],
    [0, 1, 0, 1, 1.2]
], document.querySelector('#game')!, false, true);

/* let gridObject = new GridObject([
    ['1.0.1U', 1.1, '1.0.1U', 1, 1.3],
    [0, 1.4, 1, 0, 1, '1.0.1U'],
    [0, '1.0.1U', 0, '1.0.1U', 1.2],
    [0, '1.0.1U', 0, '1.0.1U', 1.2],
    [0, '1.0.1U', 0, '1.0.1U', 1.2, 1, 1, 1, 1],
    [0, '1.0.1U', 0, '1.0.1U', 1.2]
], document.querySelector('#game') ?? document.body); */

setTimeout(() => {
    gridObject.loadGrid();
    console.log(gridObject)
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
        
        const soap = gridObject.objects.find(en => en instanceof Soap) as Soap | undefined;
        console.log(soap, gridObject.objects)
        soap?.moveTo({x: 1, y: -5}, true);
        return;
    }

    if(e.key === 'k') {
        console.log(gridObject.p)
    }

    let dir: string | null = null;
    Object.entries(gameKeys).forEach(([key, value]) => {
        if(value.includes(e.key)) dir = key;
    });
    if(dir === null) return;
    //console.log(dir, gridObject);

    for (const entity of gridObject.entities) {
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

    gridObject.gridElement.style.transform = `perspective(700px) rotateX(${mousePos.y * 20 + 50}deg) rotateZ(${mousePos.x * 20}deg) translate3d(0rem, -0rem, 0rem)`;
});

window.addEventListener('mouseout', () => {
    gridObject.gridElement.style.transform = `perspective(700px) rotateX(50deg) rotateZ(0deg) translate3d(0rem, -0rem, 0rem)`;
});


/* function update() {
    requestAnimationFrame(update);

    for (const entities of gridObject.entities) {
        entities.update();
    }
        
}
requestAnimationFrame(update); */