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
            this.levelsData.push(new Level(lvl.name, lvl.description, lvl.pattern));
        });
    }
}

class Level {
    name: string;
    description: string;
    pattern: any;

    constructor(name: string, description: string, pattern: any) {
        this.name = name;
        this.description = description;
        this.pattern = pattern;
    }
}



export { Levels, Level };