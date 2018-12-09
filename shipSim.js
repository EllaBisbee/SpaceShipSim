// Global variables
var myScene, ships, clicked, score, num_col, num_bub, following = false,
firstPerChange = false;

function makeSceneGraph () {
    myScene = new Scene()
    scene.add (myScene)
    lights = new Lights()

    // Other initialization: when the mouse moves, call our function
    document.addEventListener ("mousedown", onDocumentMouseDown, false)
}

// This will override the one in boiler.js
animate = function () {
    requestAnimationFrame( animate );
    myScene.tick()
    controls.update()
}

/*
 * Handle mouse picking
 */
function onDocumentMouseDown (event) {
    // Take mouse coords, flip y, convert to (-1..+1)
    // Also note in HTML: <body style="margin: 0px">
    var mouse = {
        x: ( event.clientX / width ) * 2 - 1,
        y: - ( event.clientY / height ) * 2 + 1 }

    // Set up for picking
    var raycaster = new THREE.Raycaster ()
    raycaster.setFromCamera (mouse, camera)

    // Returns array of all objects in scene with which the ray intersects
    //scene.children
    var intersects = raycaster.intersectObjects (ships, true);
    var individual_buttons = document.getElementById("individual-buttons").children
    if (intersects.length > 0) {
        if (clicked != null){
            clicked.set_color({ color: 0x696969 })
        }
        for (var i = 0; i < individual_buttons.length; i++) {
            individual_buttons[i].removeAttribute("disabled")
        }
        clicked = intersects[0].object.parent.parent.parent;
        clicked.set_color({color: 0x000000 })
    }
    else {
        if (event.clientX > width || event.clientY > height)
            return
        if (clicked != null){
            clicked.set_color({ color: 0x696969 })
        }
        clicked = null
        for (var i = 0; i < individual_buttons.length; i++) {
            individual_buttons[i].setAttribute("disabled", "true")
        }
    }

}

function stopAllSpaceships() {
    if (myScene.isMoving) {
        myScene.isMoving = false;
        document.getElementById("stop-all").innerHTML = "Start All Spaceships";
    } else {
        myScene.isMoving = true;
        document.getElementById("stop-all").innerHTML = "Stop All Spaceships";
    }
}

function addSpaceship() {
    var x = prompt("x coordinate: ")
    x = parseFloat(x)
    while (isNaN(x)) {
        x = prompt("invalid input. x coordinate: ")
        x = parseFloat(x)
    } 
    var y = prompt("y coordinate: ")
    y = parseFloat(y)
    while (isNaN(y)) {
        y = prompt("invalid input. y coordinate: ")
        y = parseFloat(y)
    } 
    var z = prompt("z coordinate: ")
    z = parseFloat(z)
    while (isNaN(z)) {
        z = prompt("invalid input. z coordinate: ")
        z = parseFloat(z)
    } 
    var s = new Spaceship (0, 0, 0)
    s.position.set(x, y, z)
    myScene.addSpaceship(s)
}

function removeSpaceship() {
    myScene.removeSpaceship(clicked)
    var individual_buttons = document.getElementById("individual-buttons").children
    for (var i = 0; i < individual_buttons.length; i++) {
        individual_buttons[i].setAttribute("disabled", "true")
    }
    clicked = null
}

function changeSpeed() {
    var x = prompt("Speed Vector - x component: ")
    x = parseFloat(x)
    while (isNaN(x)) {
        x = prompt("invalid input. Speed Vector - x component: ")
        x = parseFloat(x)
    } 
    var y = prompt("Speed Vector - y component: ")
    y = parseFloat(y)
    while (isNaN(y)) {
        y = prompt("invalid input. Speed Vector - y component: ")
        y = parseFloat(y)
    } 
    var z = prompt("Speed Vector - z component: ")
    z = parseFloat(z)
    while (isNaN(z)) {
        z = prompt("invalid input. Speed Vector - z component: ")
        z = parseFloat(z)
    }

    clicked.set_speed(x / 10, y / 10, z / 10);
}

function goToPersp() {
    firstPerChange = true;
    following = true;
    controls.target = clicked.position;
    controls.update();
}

function resetPerspective() {
    if (following == true) 
        controls.target = new THREE.Vector3(0,0,0);

    controls.reset();
    following = false;    
}