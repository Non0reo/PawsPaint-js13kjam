import type { Base } from "./tiles/base/core-base";
import type { Entity } from "./tiles/entities/core-entity";
import type { TileObject } from "./tiles/objects/core-object";

type Position = {
    x: number;
    y: number;
}

type ElementData = {
    all: any;
    type: number;
    data: any;
    isEmpty: boolean;
}

type Tile = {
    pos: Position;
    base: Base | null,
    obj: TileObject | null,
    entity: Entity | null;
    tile: [Base | null, TileObject | null, Entity | null];
    isTile: boolean;
    isWalkable: boolean;
}


type Direction = 'Up' | 'Down' | 'Left' | 'Right';
type GridPattern = any[][];

export type { Position, Direction, ElementData, GridPattern, Tile };
