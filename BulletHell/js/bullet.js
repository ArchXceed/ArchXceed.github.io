import { ASSETS } from "./assets.js";

export class Bullet {
    constructor(velocity, basePos, speed, parent, texture = "baseBulletTexture") {
        this.vel = velocity;
        this.pos = basePos;
        this.speed = speed;
        this.disabled = false;

        this.htmlElem = document.createElement("div");
        this.htmlElem.classList.add("bullet");
        this.htmlElem.style.backgroundImage = `url(${ASSETS[texture]})`;
        parent.appendChild(this.htmlElem);
    }

    update() {
        this.pos = this.pos.add(this.vel.multiply(this.speed));
        this.render();
        if (this.pos.y > 100 || this.pos.x > 100 || this.pos.y < 0 || this.pos.y < 0) {
            this.htmlElem.remove();
            this.disabled = true;
            return true;
        }
        return false;
    }

    render() {
        this.htmlElem.style.top = this.pos.y + "%";
        this.htmlElem.style.left = this.pos.x + "%";
    }

    touches(other) {
        return (
            this.htmlElem.offsetLeft < other.offsetLeft + other.offsetWidth &&
            this.htmlElem.offsetLeft + this.htmlElem.offsetWidth > other.offsetLeft &&
            this.htmlElem.offsetTop < other.offsetTop + other.offsetHeight &&
            this.htmlElem.offsetTop + this.htmlElem.offsetHeight > other.offsetTop
        );
    }
}