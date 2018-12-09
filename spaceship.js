class Spaceship extends THREE.Object3D {
    constructor (x, y, z) {
        super()
        this.speed_vector = new THREE.Vector3(x, y, z)
        var tgeometry = new THREE.TorusGeometry( 2, 2, 16, 100 );
        var tmaterial = new THREE.MeshPhongMaterial( { color: 0x696969 } );
        var torus = new THREE.Mesh( tgeometry, tmaterial );
        torus.position.set(0, 0, 0)
        torus.rotation.set(Math.PI / 2, 0, 0)
        this.add(torus)
        this.tor = torus

        var sgeometry = new THREE.SphereGeometry( 2.5, 32, 32 );
        var smaterial = new THREE.MeshPhongMaterial( {color: 0x5F9F9F} );
        var sphere = new THREE.Mesh( sgeometry, smaterial );
        sphere.position.set(0, 1, 0)
        this.add(sphere)

        var dgeometry = new THREE.SphereGeometry(.25)
        var dmaterial = new THREE.MeshPhongMaterial( {color: 0xFF1493} )
        var dot = new THREE.Mesh( dgeometry, dmaterial)
        dot.position.set(0, 1, 3.75)
        this.add(dot)

        var seconddot = dot.clone()
        seconddot.position.set(3.75, 1, 0)
        this.add(seconddot)

        var thirddot = dot.clone()
        thirddot.position.set(-3.75, 1, 0)
        this.add(thirddot)

        var fourthdot = dot.clone()
        fourthdot.position.set(0, 1, -3.75)
        this.add(fourthdot)

        var odot = dot.clone()
        odot.position.set(2.75, 1, 2.75)
        this.add(odot)

        var adot = dot.clone()
        adot.position.set(-2.75, 1, 2.75)
        this.add(adot)

        var bdot = dot.clone()
        bdot.position.set(-2.75, 1, -2.75)
        this.add(bdot)

        var cdot = dot.clone()
        cdot.position.set(2.75, 1, -2.75)
        this.add(cdot)

        var shape = new THREE.Object3D ()
        shape.position.set(0, 0 , 0)
        this.add(shape)

        this.move = new THREE.Object3D ()
        shape.add(this.move)
        this.move.add(torus)
        this.move.add(sphere)
        this.move.add(dot)
        this.move.add(seconddot)
        this.move.add(thirddot)
        this.move.add(fourthdot)
        this.move.add(odot)
        this.move.add(adot)
        this.move.add(bdot)
        this.move.add(cdot)

        this.following = false;
    }
    get_speed() {
        return this.speed_vector
    }
    set_speed(x,y,z) {
        this.speed_vector = new THREE.Vector3(x, y, z);
    }
    set_color(color) {
        this.tor.material = new THREE.MeshPhongMaterial(color)
    }
    tick() {
        var a = this.move.rotation.y
        a += (2 * Math.PI) / (9*30)
        if (a > 2*Math.PI) {
            a -= 2 * Math.PI
        }
        this.move.rotation.set (0, a, 0)
    }
}