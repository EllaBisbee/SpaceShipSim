class Scene extends THREE.Object3D {
    constructor () {
    super()
    clicked = null
    score = 0
    num_col = 0
    num_bub = 0
    this.spaceships = []
    ships = this.spaceships
    this.stars = []
    this.diamonds = []

    this.colors = [ {color: 0xFF00FF}, {color: 0x20B2AA}, {color: 0x3CB371}, {color: 0xFA8072},
                    {color: 0x8A2BE2}, {color: 0x6A5ACD}, {color: 0x00FA9A}  ]

    this.isMoving = true;

    var min = 100
    var max = 1000
    for(var i = 0; i < 2000; i++) {
        var dgeometry = new THREE.SphereGeometry(2)
        var dmaterial = new THREE.MeshBasicMaterial( {color: 0xFFFF33} )
        this.stars[i] = new THREE.Mesh( dgeometry, dmaterial)
        var x, y, z, x_neg, y_neg, z_neg
        x_neg = Math.floor(Math.random() * 2)
        y_neg = Math.floor(Math.random() * 2)
        z_neg = Math.floor(Math.random() * 2)
        if (x_neg == 0)
            x = -1 * Math.floor(Math.random() * (max - min + 1)) + min
        else
            x = Math.floor(Math.random() * (max - min + 1)) + min

        if (y_neg == 0)
            y = -1 * Math.floor(Math.random() * (max - min + 1)) + min
        else
            y = Math.floor(Math.random() * (max - min + 1)) + min

        if (z_neg == 0) 
            z = -1 * Math.floor(Math.random() * (max - min + 1)) + min
        else
            z = Math.floor(Math.random() * (max - min + 1)) + min


        this.stars[i].position.set(x, y, z)
        this.add(this.stars[i])
    }

    for (var i = 0; i < 80; i++) {
        this.diamonds[i] = new Diamond(this.colors[i % 7])
        this.setDiamondLocation(this.diamonds[i])
        this.add(this.diamonds[i])
    }

    this.spaceships[0] = new Spaceship (.1, -.1, -.1)
    this.spaceships[0].position.set (0, 0, -10)
    this.spaceships[1] = new Spaceship (-.2, 0, .1)
    this.spaceships[1].position.set(-10, 0, -10)
    this.add (this.spaceships[0])
    this.add (this.spaceships[1])
    }

    addSpaceship(s) {
        this.spaceships.push(s);
        this.add(s);
    }

    setDiamondLocation(diamond) {
            var dimax = 100
            var x, y, z, x_neg, y_neg, z_neg
            x_neg = Math.floor(Math.random() * 2)
            y_neg = Math.floor(Math.random() * 2)
            z_neg = Math.floor(Math.random() * 2)
            if (x_neg == 0)
                x = -1 * Math.floor(Math.random() * (dimax + 1))
            else
                x = Math.floor(Math.random() * (dimax + 1))

            if (y_neg == 0)
                y = -1 * Math.floor(Math.random() * (dimax + 1))
            else
                y = Math.floor(Math.random() * (dimax + 1))

            if (z_neg == 0) 
                z = -1 * Math.floor(Math.random() * (dimax + 1)) 
            else
                z = Math.floor(Math.random() * (dimax + 1))

            diamond.position.set(x, y, z)
    }
    checkCollisions() {
        for (var i = 0; i < ships.length; i++) {
            var curBB = new THREE.Box3().setFromObject(ships[i])
            for (var k = 0; k < this.diamonds.length; k++) {
                var diamBB = new THREE.Box3().setFromObject(this.diamonds[k])
                var diacollision = curBB.intersectsBox(diamBB)
                if (diacollision) {
                    score++
                    num_bub++
                    this.setDiamondLocation(this.diamonds[k])
                    document.getElementById("score").innerHTML = score;
                    document.getElementById("num_bub").innerHTML = num_bub;
                }
            }

            for (var j = i + 1; j < ships.length; j++) {
                var secondBB = new THREE.Box3().setFromObject(ships[j])
                var collision = curBB.intersectsBox(secondBB)
                if (collision) {
                    score--
                    num_col++
                    this.remove(ships[i])
                    this.remove(ships[j])
                    ships.splice(i, 1)
                    ships.splice(j, 1)
                    document.getElementById("score").innerHTML = score;
                    document.getElementById("num_col").innerHTML = num_col;
                    break
                }
            }
        }
    }
    removeSpaceship(clicked) {
        for (var i = 0; i < ships.length; i++) {
            if (ships[i] === clicked) {
                this.remove(ships[i])
                ships.splice(i, 1)
                break
            }
        }  
    }
    /*
     * Receive timer tick, pass it to objects that need it
     */
    tick() {
        for (var r of this.spaceships) {
            r.tick()
            var speed = r.get_speed()
            if (this.isMoving)
                r.position.set(r.position.x + speed.x, r.position.y + speed.y, r.position.z + speed.z)
        }
        for (var d of this.diamonds) {
            d.tick()
        }
        this.checkCollisions()
        render();
    }
}