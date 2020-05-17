// Establishes the 3D side and communicates with the backend.

// Initialization
let scene = new THREE.Scene(),
    cam = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    ),
    renderer = new THREE.WebGLRenderer()
scene.background = new THREE.Color(0x000000)
cam.position.z = 20
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Enables the user to move around using the PointerLockControls library
let controls = new THREE.OrbitControls(cam, renderer.domElement)
// let controls = new THREE.PointerLockControls( cam, document.body ),
// oneTime = 0
// renderer.domElement.addEventListener("click", (event) => {
//     if(oneTime % 2 == 0) {
//         renderer.domElement.requestPointerLock()
//         oneTime += 1
//     }
// })
// document.addEventListener('pointerlockchange', lockChangeAlert, false);
// document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

// function lockChangeAlert() {
//   if((document.pointerLockElement === renderer.domElement ||
//   document.mozPointerLockElement === renderer.domElement)) {
//     console.log('The pointer lock status is now locked');
//     controls.isLocked = true
//     controls.connect()
//   } else {
//     console.log('The pointer lock status is now unlocked');  
//     controls.isLocked = false
//     controls.disconnect()
//     oneTime += 1
//   }
// }
// document.body.addEventListener("click", function(event) {
//     document.body.requestPointerLock();
// }, false);
// Unfortunately using global variables is necessary.
let raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2()
// Managing clicks
const onDocumentMouseDown = (event) => {
    event.preventDefault()

    mouse.x = event.clientX / renderer.domElement.clientWidth * 2 - 1
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1

    raycaster.setFromCamera(mouse, cam)
    // cam.updateProjectionMatrix()
    // Here is where the click handlers are in the array.
    let meshObjects = [sphere],
        intersects = raycaster.intersectObjects(meshObjects)
    for (let i = 0; i < intersects.length; i++) {
        // intersects[i].object.whatever
        intersects[i].object.material.color = new THREE.Color(0x00ffff)
    }
}

// arrow = new THREE.ArrowHelper( cam.getWorldDirection(), cam.getWorldPosition(), 100, Math.random() * 0xffffff );
// scene.add( arrow );

document.addEventListener("mousedown", onDocumentMouseDown, false)

// Shapes
let sphere = new THREE.Mesh(
    new THREE.BoxGeometry(
        2,
        2,
        2
    ),
    new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true })
)
scene.add(sphere)

// Lighting
const ambientLight = new THREE.HemisphereLight(
    0xddeeff,
    0x202020,
    2
),
mainLight = new THREE.DirectionalLight(
    0xffffff,
    4
)
mainLight.position.set(1, 1, 1)
scene.add(ambientLight, mainLight)

// Rendering
renderer.gammaFactor = 2.2
renderer.gammeOutput = true
renderer.physicallyCorrectLights = true
const animate = () => {
    requestAnimationFrame(animate)
    sphere.rotation.x += 0.01

    renderer.render(scene, cam)
}
animate()