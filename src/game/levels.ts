import type { LevelsData } from "../types";

class Levels {
    creator: string = "Unknown";
    name: string = "Untitled";
    id: string = "unknown";
    levelsData: Level[] = [];

    constructor(jsonData: LevelsData) {
        this.name = jsonData.name;
        this.id = jsonData.id;
        this.creator = jsonData.creator;
        jsonData.levels.forEach((lvl: any) => {
            this.levelsData.push(new Level(lvl.name, lvl.description, lvl.pattern, lvl.maxMoves));
        });
    }
}

class Level {
    name: string;
    description: string;
    pattern: any;
    maxMoves: number | null = null;

    constructor(name: string, description: string, pattern: any, maxMoves?: number) {
        this.name = name;
        this.description = description;
        this.pattern = pattern;
        this.maxMoves = maxMoves ?? null;
    }
}



export { Levels, Level };