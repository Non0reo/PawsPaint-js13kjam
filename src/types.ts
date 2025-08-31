import type { Base } from "./tiles/base/core-base";
import type { Entity } from "./tiles/entities/core-entity";
import type { Obj } from "./tiles/objects/core-object";

type GridPattern = any[][];
type Direction = 'U' | 'D' | 'L' | 'R';
type GameStatus = 'init' | 'intro' | 'levelSelection' | 'inLevel' | 'levelComplete';
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

type LevelsData = {
    name: string;
    id: string;
    creator: string;
    levels: LevelData[];
}

type LevelData = {
    name: string;
    description: string;
    maxMoves?: number;
    minMoves?: number;
    exactMoves?: number;
    pattern: GridPattern;
}



export type { 
    Position,
    Direction,
    ElementData,
    GridPattern,
    Tile,
    SpriteParams,
    SpriteTypes,
    LevelsData,
    LevelData,
    GameStatus
};
