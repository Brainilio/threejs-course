import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

// Scene
const scene = new THREE.Scene()

/* ---- GEOMETRIES ---  */

// How to store buffer geometry data -> Float32Array, fixed length & easier to handle
// under the hood, javascript uses dynamic arrays -> think about how it allocates memory
// once you exceed the current length and other memory slots are taken, your computer is going
// to look for other open memory slots, which often means having to move the entire slot where
// back to back positions/slots are available
// this can be harder on other computers, so lets declare a fixed array
// IMPROVE PERFORMANCE!
// const positionsArray = new Float32Array([
// 	0,
// 	0,
// 	0, // first vertex
// 	0,
// 	1,
// 	0, // second vertex
// 	1,
// 	0,
// 	0, //  third vertex
// ])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute("position", positionsAttribute)

const geometry = new THREE.BufferGeometry()
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
	positionsArray[i] = Math.random() - 0.5
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometry.setAttribute("position", positionsAttribute)
// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "blue", wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/* ------------------------ */

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

// RESIZING EVENT!
window.addEventListener("resize", (e) => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// update renderer
	renderer.setSize(sizes.width, sizes.height)

	// pixel ratio
	// You might have jittery edges because of your computers
	// pixel ratio = how many physical pixesl you have on the screen
	// to fix this: highest pixel ratios are usually on teh weakest devices aka mobiles
	// only have a pixel ratio up to 2
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// double click for full-screen
window.addEventListener("dblclick", (e) => {
	if (!document.fullscreenElement) {
		document.getElementById("root").requestFullscreen()
	} else {
		document.exitFullscreen()
	}
})

// Camera
const camera = new THREE.PerspectiveCamera(
	50,
	sizes.width / sizes.height,
	1,
	80
)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls -> orbit-control
const orbitControl = new OrbitControls(camera, document.getElementById("root"))

// Damping controls -> make sure to update and keep damping -> smoothing of dragging camera
orbitControl.enableDamping = true
orbitControl.enabled = true

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("root"),
})

renderer.setSize(sizes.width, sizes.height)

const loop = () => {
	renderer.render(scene, camera)
	orbitControl.update()
	window.requestAnimationFrame(loop)
}

loop()
