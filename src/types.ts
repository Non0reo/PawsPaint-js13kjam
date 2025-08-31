import type { Base } from "./tiles/base/core-base";
import type { Entity } from "./tiles/entities/core-entity";
import type { Obj } from "./tiles/objects/core-object";

type GridPattern = any[][];
type Direction = 'U' | 'D' | 'L' | 'R';
type SpriteTypes = typeof Base | typeof Obj | typeof Entity;

type Position = {
    x: number;
    y: number;
}

type SpriteParams = {
    pos: Position;
    el: ElementData;
    g: any; // Grid type is not imported here to avoid circular dependency
    spawnDelay?: number;
    animationName?: string;
}

type ElementData = {
    raw: any;
    type: number;
    data: string | null;
    spriteIndex: number;
    isEmpty: boolean;
}

type Tile = {
    pos: Position;
    base: Base | null,
    obj: Obj | null,
    entity: Entity | null;
    tileArray: [Base | null, Obj | null, Entity | null];
    isTile: boolean;
    isWalkable: boolean;
}



export type { Position, Direction, ElementData, GridPattern, Tile, SpriteParams, SpriteTypes };
