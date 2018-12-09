/*
 * All the boilerplate from the first example is here,
 * you just provide makeSceneGraph()
 */

// Global variables
var scene, renderer, camera, controls, bottom_height, side_width, width, height;

window.onload = function () { 
	// Most browsers now support WebGLRenderer
	var videoInput = document.getElementById('inputVideo');
	var canvasInput = document.getElementById('inputCanvas');
	var bottom = document.getElementById('bottomContainer');
	var side = document.getElementById('sidepanel')
	side_width = side.clientWidth
	bottom_height = bottom.clientHeight
	width = window.innerWidth - side_width
	height = window.innerHeight - bottom_height


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0x191970 )
	renderer.setSize( width, height );
	document.getElementById('theContainer').appendChild(renderer.domElement);

	// Create the scene
	scene = new THREE.Scene();

	// Put a camera into the scene
	camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1000 );
	camera.position.set(0, 0, 175);
	scene.add(camera);

	// Create a camera contol
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	// Add our stuff to the scene, kept in a separate function
	makeSceneGraph()

	render()
	animate()

	//headtrackr.controllers.three.realisticAbsoluteCameraControl(camera, 1, [0, 0, 175], new THREE.Vector3(0, 0, 0));

	var htracker = new headtrackr.Tracker();
	htracker.init(videoInput, canvasInput);
	htracker.start()

	prev_event = null;
	document.addEventListener('headtrackingEvent', function(event) {
		if (prev_event == null) {
			prev_event = event;
		} else {
			dX = 10 * (event.x - prev_event.x);
			dY = 10 * (event.y - prev_event.y);
			dZ = 10 * (event.z - prev_event.z);

			if (clicked != null && following) {
				if (firstPerChange) {
					camera.position.x = clicked.position.x - 99*clicked.speed_vector.x;
					camera.position.y = clicked.position.y - 99*clicked.speed_vector.y;
					camera.position.z = clicked.position.z - 99*clicked.speed_vector.z;
				}
				dX += clicked.speed_vector.x
				dY += clicked.speed_vector.y
				dZ += clicked.speed_vector.z
			}

			camera.position.x += dX;
			camera.position.y += dY;
			camera.position.z += dZ;
			controls.update();
			prev_event = event;
		}
		firstPerChange = false
	});
}

// Animation loop
function animate() {
	requestAnimationFrame( animate );
	controls.update()
}

// Render the scene
function render() {
	renderer.render( scene, camera );
}

// In case window is resized
window.onresize = function () {
	var bottom = document.getElementById('bottomContainer');
	var side = document.getElementById('sidepanel')
	side_width = side.clientWidth
	bottom_height = bottom.clientHeight
	width = window.innerWidth - side_width
	height = window.innerHeight - bottom_height
	renderer.setSize( width, height );

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	render();
}
