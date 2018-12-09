class Diamond extends THREE.Object3D {
    constructor (color) {
        super ()
        var onegeom = new THREE.TetrahedronGeometry(4.5)
        var material = new THREE.MeshPhongMaterial(color)
        var first = new THREE.Mesh( onegeom, material)
        first.position.set(0, 0, 0)
        this.add(first)
        var shape = new THREE.Object3D ()
        shape.position.set(0, 0 , 0)
        this.add(shape)

        this.move = new THREE.Object3D ()
        shape.add(this.move)
        this.move.add(first)
    }
    tick() {
        var a = this.move.rotation.y
        a += (2 * Math.PI) / (9*100)
        if (a > 2*Math.PI) {
            a -= 2 * Math.PI
        }
        this.move.rotation.set (0, a, 0)
    }
}