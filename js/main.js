import * as THREE from 'three';
// import * as TWT from '/js/tween.umd.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canva = document.getElementById('main_canvas');
const mainDiv = document.getElementById('canva-div');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, mainDiv.innerWidth / mainDiv.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer({ canvas: canva, antialias: true });
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x000000);

// Handle Camera movement with mouse #######

renderer.setSize( window.innerWidth, window.innerHeight );
mainDiv.appendChild( renderer.domElement );


const orbit = new OrbitControls( camera, renderer.domElement );

camera.position.set( 3, 2, 5 );
orbit.update();
orbit.minDistance = 3.0;
orbit.maxDistance = 6.0;

orbit.minPolarAngle = Math.PI / 4;
orbit.maxPolarAngle = Math.PI / 2.2;

// orbit.autoRotate = true;
orbit.enabled = true;
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xf0ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;


// const tween = new TWEEN.Tween({x: 0, y: 0}) // Create a new tween that modifies 'coords'.
// 		.to({x: 300, y: 200}, 1000) // Move to (300, 200) in 1 second.
// 		.easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
// 		.onUpdate(() => {
// 			// Called after tween.js updates 'coords'.
// 			// Move 'box' to the position described by 'coords' with a CSS translation.
// 			// box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
// 			console.log("Yooo");
// 		})
// 		.start() // Start the tween immediately.

// ##############################################
// #                HANDLE CANVAS               #
// ##############################################
function updateCanvas() {
	camera.aspect = (mainDiv.offsetWidth) / (mainDiv.offsetHeight);
	camera.updateProjectionMatrix();
	renderer.setSize( mainDiv.offsetWidth, mainDiv.offsetHeight);
}

updateCanvas();


async function getGltfModels(path) {
	return new Promise((resolve, reject) => {
		const assetLoader = new GLTFLoader();

		assetLoader.load(path, (gltf) => {
			const model = gltf.scene;
			// scene.add(model);
			resolve(gltf.scene);
		}, undefined, (error) => {
			reject(error);
		});
	});
}

var porsche_env = await getGltfModels('porsche_env.gltf');
scene.add(porsche_env);


// porsche_env.traverse((child) => {
//     if (child.isMesh && child.material.name === "porsche_color") {
// 		child.material.color.set(0xFFFFFF);
//     }
//     if (child.isMesh && child.material.name === "caliper_color") { // Siege
// 		child.material.color.set(0x00FFFF);
//     }
//     if (child.isMesh && child.material.name === "TwiXeR_992_seat_leather_2.001") { // Siege
// 		child.material.color.set(0xFFFFFF);
//     }
// });

var animateLoop;
var mainRequestAnimation;
const FRAME_PER_SECOND = 1000 / 60;


const dictColor = {
	'white': 0xFFFFFF,
	'blue': 0x0000FF,
	'red': 0xFF0000,
	'green': 0x8CE238,
	'yellow': 0xFDE326,
	'black': 0x000000
}

function switchColor(color) {
	const finalColor = dictColor[color] | color | dictColor['black'];
	console.log(finalColor.toString());
	document.getElementById("bottom-navbar").style.boxShadow = '0 8px 32px 0 #' + finalColor.toString(16);
	porsche_env.traverse((child) => {
		if (child.isMesh && child.material.name === "porsche_color") {
			child.material.color.set(finalColor);
		}
		if (child.isMesh && child.material.name === "caliper_color") { // Siege
			child.material.color.set(finalColor);
		}
		if (child.isMesh && child.material.name === "TwiXeR_992_seat_leather_2.001") { // Siege
			child.material.color.set(finalColor);
		}
	});
}
window.switchColor = switchColor;


// porsche_env.traverse((child) => {
// 	if (child.isMesh && child.name === "ventilateur") {
// 		console.log(child);
// 		console.log(child.rotation.y);
// 	}
// });

function animateEnvironment() {
	const WHEEL_SPEED = 0.1;
	porsche_env.traverse((child) => {
		if (child.isMesh && child.name === "ventilateur") {
			child.rotation.y += 0.05;
		}

		if (child.isMesh && (
			child.name === "Cylinder_1" || child.name === "Cylinder_2"
			|| child.name === "Cylinder001_1" || child.name === "Cylinder001_2")
			) {
			child.rotation.y -= WHEEL_SPEED;
		}

		if (child.isMesh && (
			child.name === "Object_4001_Scene_-_Root002_0"
			|| child.name === "Object_4004_Scene_-_Root002_0"
			|| child.name === "TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9001_TwiXeR_992_whee"
			|| child.name === "TwiXeR_992_gt3rs_style_1_chrome_wheels_20x9003_TwiXeR_992_whee"
			)) {
			child.rotation.x += WHEEL_SPEED;
		}
	});
}


function animate() {
	// animateLoop = setTimeout(() => {
	// 	mainRequestAnimation = requestAnimationFrame(animate);
	// }, FRAME_PER_SECOND );
	requestAnimationFrame(animate)

	// cube.rotation.x += 0.005;
	// cube.rotation.y += 0.005;

	// TWEEN.update();

	animateEnvironment();

	orbit.update();
	renderer.render( scene, camera );
}

window.addEventListener('resize', updateCanvas);
animate();
