export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v2) {
        return new Vector2(this.x + v2.x, this.y + v2.y);
    }
    multiply(n2) {
        return new Vector2(this.x * n2, this.y * n2);
    }
}