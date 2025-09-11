import { Game } from "./game";

const game = new Game();

setTimeout(() => {
    console.log("Game started");
    game.loadLevel('main', 5);
}, 1000);