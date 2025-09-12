import { Game } from "./game";

const game = new Game();

setTimeout(() => {
    console.log("Game started");
    game.loadLevel('main', 0);
}, 1000);
