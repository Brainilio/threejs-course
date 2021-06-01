import "./style.css"
import * as THREE from "three"
import gsap from "gsap"

// When using position, make sure you understand what each coordinate will
// be in terms of metrics (1 can be 1 meter or 1cm, up to u)

const cursor = {
	x: 0,
	y: 0,
}
// cursor
window.addEventListener("mousemove", (e) => {
	cursor.x = e.clientX / sizes.width - 0.5
	cursor.y = -(e.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "blue" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
	width: 800,
	height: 600,
}

// different cameras
// arraycamera = render scene multiple times using multiple cameras
// stereocamera: render the scene through two cameras that mimic the eyes to create parallax effect
// cubecamera = 6 renders, facing different directions good for environments, reflections, shadow
// orthographic camera = render the scene without perspective
// perspective camera: needs parameters

// perspectivecamera
// params: FOV (vertical), Aspect ratio (width / height), near, and far parameter ( any object closer than near or further than far will not show up)
// don't use extreme values to prevent z-fighting
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 1, 5)

// orthographic camera
// params: left, right, top, bottom, then near & far
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	100
// )
// camera.position.x = 2
camera.position.z = 3
// camera.position.y = 2
console.log(camera.position.length())
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("root"),
})

renderer.setSize(sizes.width, sizes.height)

const loop = () => {
	// update camera with cursor
	// camera.position.x = cursor.x * 3
	// camera.position.y = cursor.y * 3
	// camera must always look at a vector3 class poistion

	// do a full rotation
	camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
	camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
	camera.position.y = cursor.y * 5

	camera.lookAt(mesh.position)
	renderer.render(scene, camera)
	window.requestAnimationFrame(loop)
}

loop()
