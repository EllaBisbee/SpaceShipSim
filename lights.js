/*
 * Same Lights object from lights.html, now moved to separate file
 *
 * An object to hold the lights,
 * constructor just adds them to global var scene
 */
class Lights {
    constructor () {
	// Uses typical lighting setup, like portrait or TV studio...

	// Main (key) light, directional,
	// from 45 deg. user's right, above, bright white
	this.mainLight = new THREE.DirectionalLight ("white", 1)
	this.mainLight.position.set (1, 0.5, 1)
	scene.add (this.mainLight)

	// Fill light, directional, from 45deg. user's left,
	// white, half as bright
	this.fillLight = new THREE.DirectionalLight ("white", 0.5)
	this.fillLight.position.set (-1, 0, 1 )
	scene.add (this.fillLight)

	// Ambient light, white, still less bright
	this.ambientLight = new THREE.AmbientLight (0x404040)
	scene.add (this.ambientLight);
    }

    // Callback from checkboxes
    pressed (state, light) {
	light.visible = state
	render ()
    }
}