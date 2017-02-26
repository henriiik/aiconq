"use strict";
class AIPlayer extends THREE.Object3D {
    constructor(cubeWidth, color, position) {
        super();
        this.radius = cubeWidth * 0.3;
        this.height = cubeWidth;
        this.mat = new THREE.MeshLambertMaterial({ color: color });
        this.aipos = position;
        this.updateMesh();
        this.updatePosition();
    }
    updateMesh() {
        let coneGeo = new THREE.ConeBufferGeometry(this.radius, this.height, 32, 32);
        let cone = new THREE.Mesh(coneGeo, this.mat);
        cone.position.y = this.height / 2;
        cone.castShadow = true;
        cone.receiveShadow = true;
        this.add(cone);
        let sphereGeo = new THREE.SphereBufferGeometry(this.radius, 32, 32);
        let sphere = new THREE.Mesh(sphereGeo, this.mat);
        sphere.position.y = this.height;
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        this.add(sphere);
    }
    updatePosition() {
        this.position.x = this.aipos.x * cubeWidth;
        this.position.z = this.aipos.z * cubeWidth;
    }
    getMove() {
        let x = this.aipos.x;
        let y = this.aipos.z;
        if (x < 8 && y === 0) {
            return AIMove.Right;
        }
        else if (x === 8 && y < 8) {
            return AIMove.Down;
        }
        else if (x > 0 && y === 8) {
            return AIMove.Left;
        }
        else {
            return AIMove.Up;
        }
    }
    getRandomMove() {
        return Math.floor(Math.random() * 4);
    }
}
//# sourceMappingURL=AIPlayer.js.map