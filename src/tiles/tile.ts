import type { Grid } from "../game/grid-types";
import type { ElementData, Position } from "../types";
import type { Base } from "./base/core-base";
import type { Entity } from "./entities/core-entity";
import type { Obj } from "./objects/core-object";

import { Marble } from "./base/marble";
import { Paint } from "./objects/paint";
import { Cat } from "./entities/cat";
import { Lady } from "./entities/lady";
import { Yarn } from "./objects/yarn";
import { Soap } from "./objects/soap";
import { Bucket } from "./objects/bucket";
import { Puddle } from "./objects/puddle";
import { Ladyline } from "./objects/ladyline";


function invokeBaseFromType(pos: Position, element: ElementData | null, g: Grid, spawnDelay: number): Base | null {
    if (!element) return null;
    let entity: Base | null = null;
    const params = [pos, element, g, spawnDelay] as const;
    switch (element.type) {
        case 1: entity = new Marble(...params); break;
    
        default: break;
    }
    return entity;
}

function invokeObjectFromType(pos: Position, element: ElementData | null, g: Grid, spawnDelay: number): Obj | null {
    if (!element) return null;
    let entity: Obj | null = null;
    const params = [pos, element, g, spawnDelay] as const;
    switch (element.type) {
        case 1: entity = new Paint(...params); break;
        case 2: entity = new Yarn(...params); break;
        case 3: entity = new Soap(...params); break;
        case 4: entity = new Bucket(...params); break;
        case 5: entity = new Puddle(...params); break;
        case 6: entity = new Ladyline(...params); break;
    
        default: break;
    }
    return entity;
}

function invokeEntityFromType(pos: Position, element: ElementData | null, g: Grid, spawnDelay: number): Entity | null {
    if (!element) return null;
    let entity: Entity | null = null;
    const params = [pos, element, g, spawnDelay] as const;
    switch (element.type) {
        case 1: entity = new Cat(...params); break;
        case 2: entity = new Cat(...params); break;
        case 3: entity = new Lady(...params); break;
    
        default: break;
    }
    return entity;
}

export { invokeBaseFromType, invokeObjectFromType, invokeEntityFromType };