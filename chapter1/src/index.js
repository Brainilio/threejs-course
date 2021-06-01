import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "blue" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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

// Damping controls -> make sure to update and keep damping
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
