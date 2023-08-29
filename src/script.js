import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */
// Geometry
const planeGeometry = new THREE.PlaneGeometry(window.innerWidth/30, window.innerHeight /30, 32, 32)
// const sphereGeometry = new THREE.SphereGeometry(.5,40)
const boxGeometry = new THREE.BoxGeometry(1,1,1)





/**
 * MATERIALS
 */
const boxMaterial = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: {value: 1.0},
        uGeometryType: {value: 0}
    },


})

//Box
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.rotateY(Math.PI * 0.25)
boxMesh.rotateX(Math.PI * 0.25)



/**
 * MESHES
 */
//Plane

const planeMaterial = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: {value: 1.0},
        uGeometryType: {value: 1}
    },


})

const planeMesh = new THREE.Mesh(planeGeometry,
    planeMaterial)
    planeMesh.position.set(0,0,-2)



//Scene add
scene.add(boxMesh, planeMesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () =>
{

    // Update controls
    controls.update()

    const elapsedTime = clock.getElapsedTime();
    boxMaterial.uniforms.uTime.value = elapsedTime
    planeMaterial.uniforms.uTime.value = elapsedTime


    // console.log(Math.floor(elapsedTime));


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    //
}

tick()
