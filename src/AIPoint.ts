class AIPoint {
    x: number;
    z: number;

    constructor(x: number, z: number) {
        this.x = Math.floor(x);
        this.z = Math.floor(z);
    }

    move(m: AIMove) {
        if (m === AIMove.Up && this.x % 2 === 0) {
            this.z--;
        } else if (m === AIMove.Down && this.x % 2 === 0) {
            this.z++;
        } else if (m === AIMove.Left && this.z % 2 === 0) {
            this.x--;
        } else if (m === AIMove.Right && this.z % 2 === 0) {
            this.x++;
        }
    }
}
