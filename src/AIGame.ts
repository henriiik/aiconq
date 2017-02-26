class AIGame extends THREE.Object3D {
    cubeWidth: number;
    gameWidth: number;
    players: AIPlayer[];
    board: THREE.Mesh[];

    constructor(gameWidth: number, cubeWidth: number) {
        super();

        this.gameWidth = gameWidth;
        this.cubeWidth = cubeWidth;

        let geometry = new THREE.BoxBufferGeometry(this.cubeWidth, this.cubeWidth, this.cubeWidth);
        let darkMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        let lightMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        this.board = [];

        for (let z = 0; z < width; z++) {
            for (let x = 0; x < width; x++) {
                let mat = (z + x) % 2 ? darkMaterial : lightMaterial;
                let mesh = new THREE.Mesh(geometry, mat);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.position.z = cubeWidth * z;
                mesh.position.x = cubeWidth * x;
                mesh.position.y = -cubeWidth / 2;
                if ((x % 2) * (z % 2)) {
                    mesh.position.y *= -1;
                }
                this.add(mesh);
                this.board.push(mesh);
            }
        }

        let playerBlue = new AIPlayer(this.cubeWidth, 0x333399, new AIPoint(0, 0));
        this.add(playerBlue);

        let playerRed = new AIPlayer(this.cubeWidth, 0x993333, new AIPoint(gameWidth - 1, gameWidth - 1));
        this.add(playerRed);

        this.players = [playerBlue, playerRed];
    }

    isValidMove(m: AIMove, p: AIPoint): boolean {
        switch (m) {
            case AIMove.Up:
                return p.x % 2 === 0 && p.z > 0;
            case AIMove.Down:
                return p.x % 2 === 0 && p.z < this.gameWidth - 1;
            case AIMove.Left:
                return p.z % 2 === 0 && p.x > 0;
            case AIMove.Right:
                return p.z % 2 === 0 && p.x < this.gameWidth - 1;
            case AIMove.Stay:
                return true;
        }
        return false;
    }

    pointToIndex(p: AIPoint): number {
        return p.x + p.z * this.gameWidth;
    }

    tick() {
        this.players.forEach(player => {
            let move = player.getRandomMove();
            if (this.isValidMove(move, player.aipos)) {
                player.aipos.move(move);
                player.updatePosition();
            }
            let i = this.pointToIndex(player.aipos);
            let mesh = this.board[i];
            mesh.material = player.mat;
        });
    }
}