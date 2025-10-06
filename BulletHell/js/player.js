import { Vector2 } from "./vector2.js";
import { CONFIG } from "./config.js";

export class Player {
    constructor(p, elem) {
        this.movementSpeed = CONFIG["playerBaseMoveSpeed"];
        this.baseMovementSpeed = CONFIG["playerBaseMoveSpeed"];
        this.pos = p;
        this.playerElem = elem;
        this.life = CONFIG["maxLife"];
        this.pressed = [
            false, // Up [0]
            false, // Right [1]
            false, // Down [2]
            false // Left [3]
        ];
    }

    onKeyDown(k) {
        if (k === "w") {
            this.pressed[0] = true;
        } else if (k === "d") {
            this.pressed[1] = true;
        } else if (k === "s") {
            this.pressed[2] = true;
        } else if (k === "a") {
            this.pressed[3] = true;
        } else if (k === "shift") {
            if (this.pressed[0]) {
                this.pos.y -= CONFIG["dash"];
            }
            if (this.pressed[1]) {
                this.pos.x += CONFIG["dash"];
            }
            if (this.pressed[2]) {
                this.pos.y += CONFIG["dash"];
            }
            if (this.pressed[3]) {
                this.pos.x -= CONFIG["dash"];
            }

        }
    }

    onKeyUp(k) {
        if (k === "w") {
            this.pressed[0] = false;
        } else if (k === "d") {
            this.pressed[1] = false;
        } else if (k === "s") {
            this.pressed[2] = false;
        } else if (k === "a") {
            this.pressed[3] = false;
        }
    }

    updateMovements() {
        let moveSpeed = this.movementSpeed;

        if (this.pressed[0]) {
            this.pos.y -= moveSpeed;
        }
        if (this.pressed[1]) {
            this.pos.x += moveSpeed;
        }
        if (this.pressed[2]) {
            this.pos.y += moveSpeed;
        }
        if (this.pressed[3]) {
            this.pos.x -= moveSpeed;
        }
        if (this.pos.x > 90) this.pos.x = 90;
        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.y > 90) this.pos.y = 90;
        if (this.pos.y < 0) this.pos.y = 0;
    }
}