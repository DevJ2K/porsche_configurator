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

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xf0ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


const tween = new TWEEN.Tween({x: 0, y: 0}) // Create a new tween that modifies 'coords'.
		.to({x: 300, y: 200}, 1000) // Move to (300, 200) in 1 second.
		.easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
		.onUpdate(() => {
			// Called after tween.js updates 'coords'.
			// Move 'box' to the position described by 'coords' with a CSS translation.
			// box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
			console.log("Yooo");
		})
		.start() // Start the tween immediately.

// ##############################################
// #                HANDLE CANVAS               #
// ##############################################
function updateCanvas() {
	camera.aspect = (mainDiv.offsetWidth) / (mainDiv.offsetHeight);
	camera.updateProjectionMatrix();
	renderer.setSize( mainDiv.offsetWidth, mainDiv.offsetHeight);
}

updateCanvas();


var animateLoop;
var mainRequestAnimation;
const FRAME_PER_SECOND = 1000 / 60;

function animate() {
	// animateLoop = setTimeout(() => {
	// 	mainRequestAnimation = requestAnimationFrame(animate);
	// }, FRAME_PER_SECOND );
	requestAnimationFrame(animate)

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	TWEEN.update();
	renderer.render( scene, camera );
}

window.addEventListener('resize', updateCanvas);
animate();
