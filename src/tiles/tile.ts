import type { Grid } from "../grid-types";
import type { ElementData, Position } from "../types";
import type { Base } from "./base/core-base";
import type { Entity } from "./entities/core-entity";
import type { TileObject } from "./objects/core-object";

import { Marble } from "./base/marble";
import { Paint } from "./objects/paint";
import { Cat } from "./entities/cat";
import { Lady } from "./entities/lady";
import { Yarn } from "./objects/yarn";
import { Soap } from "./objects/soap";
import { Bucket } from "./objects/bucket";
import { Puddle } from "./objects/puddle";
import { Ladyline } from "./objects/ladyline";


function invokeBaseFromType(pos: Position, element: ElementData, g: Grid): Base | null {
    let entity: Base | null = null;
    switch (element.type) {
        case 1: entity = new Marble(pos, element, g); break;
    
        default: break;
    }
    return entity;
}

function invokeObjectFromType(pos: Position, element: ElementData, g: Grid): TileObject | null {
    let entity: TileObject | null = null;
    switch (element.type) {
        case 1: entity = new Paint(pos, element, g); break;
        case 2: entity = new Yarn(pos, element, g); break;
        case 3: entity = new Soap(pos, element, g); break;
        case 4: entity = new Bucket(pos, element, g); break;
        case 5: entity = new Puddle(pos, element, g); break;
        case 6: entity = new Ladyline(pos, element, g); break;
    
        default: break;
    }
    return entity;
}

function invokeEntityFromType(pos: Position, element: ElementData, g: Grid): Entity | null {
    let entity: Entity | null = null;
    switch (element.type) {
        case 1: entity = new Cat(pos, element, g); break;
        case 2: entity = new Cat(pos, element, g); break;
        case 3: entity = new Lady(pos, element, g); break;
    
        default: break;
    }
    return entity;
}

export { invokeBaseFromType, invokeObjectFromType, invokeEntityFromType };