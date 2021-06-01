import "./style.css"
import * as THREE from "three"
import gsap from "gsap"

// When using position, make sure you understand what each coordinate will
// be in terms of metrics (1 can be 1 meter or 1cm, up to u)

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "blue" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
mesh.position.x = -1.5

// Transforming properties: position, scale, rotation, quaternion
// Properties will be compiled into matrices (just know)

// Scale
// mesh.scale.x = 2

// Rotation using rotation or with quaternion
// MATH.PI = half a rotation, math.PI = 2x rotation
// Reorder helps with rotation
/* 
The order in which to apply rotations. Default is 'XYZ', which means that the object will first be rotated around its X axis, then its Y axis and finally its Z axis. Other possibilities are: 'YZX', 'ZXY', 'XZY', 'YXZ' and 'ZYX'. These must be in upper case.
*/
// mesh.rotation.reorder("XYZ")
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.x = Math.PI * 0.25

// Quaternion is also a rotation, but more mathematically

// Sizes
const sizes = {
	width: 800,
	height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

scene.add(camera)

// Scene Graph
// Add objects inside group to move things at the same time
const groupOfCubes = new THREE.Group()
groupOfCubes.add(mesh)
scene.add(groupOfCubes)

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
groupOfCubes.add(cube1)

groupOfCubes.rotation.reorder("YXZ")
groupOfCubes.rotation.y = 1
groupOfCubes.rotation.x = 1

// Vector3
// More than just x, y or z. Has a lot of methods. A position property is not an object, its an instance of the Vecto3 class, which
// has a lot of cool properties to measure things such as distance, normalizing values, setting values etc
console.log(mesh.position.distanceTo(camera.position))

// Axes helper to help
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("root"),
})

renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

// ANIMATIONS
// Like stop-motion, most screens run at 60 FPS
// Animations loook the same, but the amount of pictures per second can vary
// Request animation frame = code a function to be called once on the next frame
const gameLoop = () => {
	const elapsedTime = clock.getElapsedTime()
	// update objects
	groupOfCubes.rotation.y = elapsedTime

	// render
	renderer.render(scene, camera)

	window.requestAnimationFrame(gameLoop)
}
gameLoop()
