import { CONFIG } from "./config.js";
import { Game } from "./game.js";

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").remove();
    const hardcore = document.getElementById("hardcore").checked;
    document.getElementById("hardcore").remove();
    if (hardcore) {
      CONFIG["maxLife"] = 1;
      document.querySelector("#lifebar progress").max = 1;
    }
    const game = new Game(document.querySelector(".scene"));
});