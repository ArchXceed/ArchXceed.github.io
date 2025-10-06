import { Player } from "./player.js";
import { Vector2 } from "./vector2.js";
import { ASSETS } from "./assets.js";
import { Enemy } from "./enemy.js";

export class Game {
    constructor(c) {
        this.playerElement = c.querySelector("#player");
        this.bulletsContainer = c.querySelector("#bullets");
        this.bonusesContainer = c.querySelector("#bonuses");
        this.playerBar = c.querySelector(".ui > #lifebar > progress");
        this.bossLife = c.querySelector(".ui > #bosslife > progress");
        this.enemy = c.querySelector("#enemy")
        this.bullets = [];
        this.bonuses = [];
        this.player = new Player(new Vector2(50, 50), this.playerElement);
        this.enemy = new Enemy(new Vector2(40, 0), this, this.enemy);
        this.stopped = false;
        this.setUp();
        this.render();
        window.addEventListener("keydown", (e) => {
            this.player.onKeyDown(e.key.toLowerCase());
        });
        window.addEventListener("keyup", (e) => {
            this.player.onKeyUp(e.key.toLowerCase());
        });
    }

    setUp() {
        this.playerElement.style.backgroundImage = `url(${ASSETS.player})`;
    }

    render() {
        if (this.stopped) return;
        this.enemy.render();
        this.playerElement.style.top = this.player.pos.y + "%";
        this.playerElement.style.left = this.player.pos.x + "%";
        this.player.updateMovements();
        this.playerBar.value = this.player.life;
        this.bossLife.value = this.enemy.life;
        for (const bonus of this.bonuses) {
            if (!bonus.disabled) {
                bonus.check(this);
            }
        }
        if (this.player.life === 1) {
            document.querySelector(".one-life").style.display = "block";
        } else {
            document.querySelector(".one-life").style.display = "none";
        }
        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            if (bullet.disabled) continue;
            bullet.update();
            if (bullet.touches(this.playerElement)) {
                this.player.life -= 1;
                console.log(this.player.life);
                bullet.htmlElem.remove();
                this.bullets.disabled = true;
                if (this.player.life <= 0) {
                    this.playerElement.style.animation = "die 1s forwards";
                    return;
                }
            }
        }
        requestAnimationFrame(() => { this.render() });
    }
}

