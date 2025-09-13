import { Game } from "./game";

const game = new Game();

setTimeout(() => {
    console.log("Game started");
    game.loadLevel('main', 10);
}, 1000);
