import type { LevelData, LevelsData } from "../types";

class Levels {
    creator: string = "Unknown";
    name: string = "Untitled";
    id: string = "unknown";
    levelsData: Level[] = [];

    constructor(jsonData: LevelsData) {
        this.name = jsonData.name;
        this.id = jsonData.id;
        this.creator = jsonData.creator;
        jsonData.levels.forEach((lvl: any, i) => {
            this.levelsData.push(new Level(lvl, i));
        });
    }
}

class Level {
    index: number = 0;
    name: string;
    description: string;
    pattern: any;
    maxMoves: number | null = null;
    moveCount: number = 0;
    levelData: LevelData | null = null;

    constructor(levelData: LevelData, index: number) {
        this.index = index;
        this.levelData = levelData;
        this.name = levelData.name;
        this.description = levelData.description;
        this.pattern = levelData.pattern;
        if(levelData.maxMoves) this.maxMoves = levelData.maxMoves;
    }
}



export { Levels, Level };