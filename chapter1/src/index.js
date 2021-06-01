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
// const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 1, 3)

// orthographic camera
// params: left, right, top, bottom, then near & far
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(
	-1 * aspectRatio,
	1 * aspectRatio,
	1,
	-1,
	0.1,
	100
)
camera.position.x = 2
camera.position.z = 2
camera.position.y = 2
console.log(camera.position.length())
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("root"),
})

renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const loop = () => {
	const elapsedTime = clock.getElapsedTime()
	mesh.rotation.y = elapsedTime
	renderer.render(scene, camera)
	window.requestAnimationFrame(loop)
}

loop()
