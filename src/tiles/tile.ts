import type { SpriteParams, SpriteTypes } from "../types";
import { Base } from "./base/core-base";
import { Entity } from "./entities/core-entity";
import { Obj } from "./objects/core-object";
import { ObjectName } from "../constants";


/* function invokeBaseFromType(pos: Position, element: ElementData | null, g: Grid, spawnDelay: number): Base | null {
    if (!element) return null;
    let entity: Base | null = null;
    const params = {pos, element, g, spawnDelay} as SpriteParams;
    switch (element.type) {
        case 1: entity = new Marble(params); break;
    
        default: break;
    }
    return entity;
}

function invokeObjectFromType(pos: Position, element: ElementData | null, g: Grid, spawnDelay: number): Obj | null {
    if (!element) return null;
    //let entity: Obj | null = null;
    const params = {pos, element, g, spawnDelay} as SpriteParams;
    // switch (element.type) {
    //     case 1: entity = new Paint(params); break;
    //     case 2: entity = new Yarn(params); break;
    //     case 3: entity = new Soap(params); break;
    //     case 4: entity = new Bucket(params); break;
    //     case 5: entity = new Puddle(params); break;
    //     case 6: entity = new Ladyline(params); break;
    
    //     default: break;
    // }
    //get object name from constants
    const elementName = ObjectName.get(element.type) || "Empty";
    if(elementName === "Empty") return null;
    return new (eval(elementName))(params) as Obj;

    //return entity;
}

function invokeEntityFromType(pos: Position, element: ElementData | null, g: Grid, spawnDelay: number): Entity | null {
    if (!element) return null;
    let entity: Entity | null = null;
    const params = {pos, element, g, spawnDelay} as SpriteParams;
    switch (element.type) {
        case 1: entity = new Cat(params); break;
        case 2: entity = new Cat(params); break;
        case 3: entity = new Lady(params); break;
    
        default: break;
    }
    return entity;
} */

function invokeSpriteFromType(opts: SpriteParams, spriteType: SpriteTypes): Base | Obj | Entity | null {
    if (!opts.element) return null;
    let elementName;
    switch (spriteType) {
        case Base: elementName = ObjectName.get(opts.element.type) || null; break;
        case Obj: elementName = ObjectName.get(opts.element.type) || null; break;
        case Entity: elementName = ObjectName.get(opts.element.type) || null; break;
        default: break;
    }

    if (!elementName) return null;
    return new (eval(elementName as string))(opts) as Base | Obj | Entity;
}

// export { invokeBaseFromType, invokeObjectFromType, invokeEntityFromType };
export { invokeSpriteFromType };