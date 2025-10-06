import { ASSETS } from "./assets.js";
import { Bonus } from "./bonus.js";
import { Bullet } from "./bullet.js";
import { Vector2 } from "./vector2.js";

let instance = null;

export class Enemy {
    constructor(p, g, htmlElem) {
        instance = this;
        this.pos = p;
        this.game = g;
        this.life = 100;
        this.htmlElem = htmlElem;
        htmlElem.style.backgroundImage = `url(${ASSETS["bossImg"]})`;
        this.phaseOne();
    }

    render() {
        this.htmlElem.style.top = this.pos.y + "%";
        this.htmlElem.style.left = this.pos.x + "%";
    }

    pause(clbk) {
        const healthBonus = new Bonus(this.game.bonusesContainer, "l", new Vector2(Math.round(Math.random() * 90), Math.round(Math.random() * 90)), "healthBonusTexture");
        const speedBonus = new Bonus(this.game.bonusesContainer, "s", new Vector2(Math.round(Math.random() * 90), Math.round(Math.random() * 90)), "speedBonusTexture");
        this.game.bonuses.push(healthBonus, speedBonus);
        this.life -= 25;
        if (this.life <= 0) {
            document.body.querySelector("#win").style.display = "block";
            document.body.querySelector("#win").style.animation = "win 2s forwards";
            this.game.stopped = true;
            return;
        }
        setTimeout(clbk, 2000);
    }

    phaseOne(rec = false) {
        setTimeout(() => {
            instance.attackTypeOne();
            setTimeout(() => {
                instance.attackTypeOne();
                setTimeout(() => {
                    instance.attackTypeTwo();
                    if (rec) {
                        setTimeout(() => {
                            instance.phaseOne(false);
                        }, 2000);
                    } else {
                        instance.pause(instance.phaseTwo);
                    }
                }, 2000);
            }, 1000);
        }, 1000);
    }


    phaseTwo() {
        instance.attackTypeTree();
        setTimeout(() => {
            instance.attackTypeTree();
            setTimeout(() => {
                instance.attackTypeTree();
                setTimeout(() => {
                    instance.pause(instance.phaseTree);
                }, 15000);
            }, 10000);
        }, 4000);
    }

    phaseTree() {
        instance.attackTypeFour();
        instance.attackTypeFive();
        setTimeout(() => {
            instance.attackTypeFour();
            instance.attackTypeFive();
            setTimeout(() => {
                instance.pause(instance.phaseFour);
            }, 5000);
        }, 5000);
    }

    phaseFour() {
        let idx = 0;
        const i = setInterval(() => {
            idx++;
            instance.attackTypeSeven(idx * 5);
            if (idx >= 4) {
                clearInterval(i);
                setInterval(() => {
                    instance.pause(() => {});
                }, 3000);
            }
        }, 1000);
    }

    attackTypeOne() {
        let x = 10;
        const i = setInterval(() => {
            instance.game.bullets.push(new Bullet(new Vector2(0, 1), new Vector2(x, 0), 0.6, instance.game.bulletsContainer));
            x += 10;
            if (x >= 90) {
                clearInterval(i);
            }
        }, 500);
    }

    attackTypeTwo() {
        let y = 10;
        const i = setInterval(() => {
            instance.game.bullets.push(new Bullet(new Vector2(1, 0), new Vector2(0, y), 0.6, instance.game.bulletsContainer));
            y += 10;
            if (y >= 90) {
                clearInterval(i);
            }
        }, 500);
    }

    attackTypeTree() {
        let it = 0;
        const i = setInterval(() => {
            it++;
            instance.attackTypeOne();
            instance.attackTypeTwo()
            if (it > 2) {
                clearInterval(i);
            }
        }, 1000);
    }

    attackTypeFour() {
        for (let i = 0; i < 100; i += 20) {
            instance.game.bullets.push(new Bullet(new Vector2(0, 1), new Vector2(i, 0), 0.6, instance.game.bulletsContainer));
            instance.game.bullets.push(new Bullet(new Vector2(1, 0), new Vector2(0, i), 0.6, instance.game.bulletsContainer));
            instance.game.bullets.push(new Bullet(new Vector2(0, -1), new Vector2(i, 100), 0.6, instance.game.bulletsContainer));
            instance.game.bullets.push(new Bullet(new Vector2(-1, 0), new Vector2(100, i), 0.6, instance.game.bulletsContainer));
        }
    }

    attackTypeFive() {
        for (let i = 0; i < 100; i += 20) {
            instance.game.bullets.push(new Bullet(new Vector2(1, 1), new Vector2(i, 0), 0.6, instance.game.bulletsContainer));
            instance.game.bullets.push(new Bullet(new Vector2(1, 1), new Vector2(0, i), 0.6, instance.game.bulletsContainer));
            instance.game.bullets.push(new Bullet(new Vector2(-1, -1), new Vector2(i, 100), 0.6, instance.game.bulletsContainer));
            instance.game.bullets.push(new Bullet(new Vector2(-1, -1), new Vector2(100, i), 0.6, instance.game.bulletsContainer));
        }
    }

    attackTypeSix(y = 10) {
        let it = 0;
        const i = setInterval(() => {
            it++;
            instance.game.bullets.push(new Bullet(new Vector2(1, 0), new Vector2(0, y), 1.3, instance.game.bulletsContainer));
            if (it > 10) {
                clearInterval(i);
            }
        }, 100);
    }

    attackTypeSeven(offfset = 0) {
        let y = offfset;
        const i = setInterval(() => {
            instance.attackTypeSix(y);
            y += 20;
            if (y >= 90) {
                clearInterval(i);
            }
        }, 300);
    }
}