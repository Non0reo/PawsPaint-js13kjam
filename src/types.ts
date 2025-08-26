import type { Base, Entity, TileObject } from "./tile";

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
    isTile: boolean;
}


type Direction = 'Up' | 'Down' | 'Left' | 'Right';
type GridPattern = any[][];

export type { Position, Direction, ElementData, GridPattern, Tile };
