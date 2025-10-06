import { ASSETS } from "./assets.js";
import { CONFIG } from "./config.js";

export class Bonus {
    constructor(parent, type, pos, texture = "baseBonusTexture") {
        this.type = type;
        this.disabled = false;
        this.htmlElem = document.createElement("div");
        this.htmlElem.classList.add("bonus");
        this.htmlElem.style.top = pos.y + "%";
        this.htmlElem.style.left = pos.x + "%";

        this.htmlElem.style.backgroundImage = `url(${ASSETS[texture]})`;
        parent.appendChild(this.htmlElem);
    }

    check(game) {
        if (
            this.htmlElem.offsetLeft < game.playerElement.offsetLeft + game.playerElement.offsetWidth &&
            this.htmlElem.offsetLeft + this.htmlElem.offsetWidth > game.playerElement.offsetLeft &&
            this.htmlElem.offsetTop < game.playerElement.offsetTop + game.playerElement.offsetHeight &&
            this.htmlElem.offsetTop + this.htmlElem.offsetHeight > game.playerElement.offsetTop
        ) {
            if (this.type === "l") {
                game.player.life = CONFIG["maxLife"];
            } else if (this.type === "s") {
                game.player.movementSpeed *= CONFIG["bonusSpeed"];
            }
            this.htmlElem.remove();
            this.disabled = true;
        }
    }
}