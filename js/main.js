import * as THREE from 'three';
import * as TWEEN from 'tween';
import * as TWEEN2 from 'tween2';
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
	animateLoop = setTimeout(() => {
		mainRequestAnimation = requestAnimationFrame(animate);
	}, FRAME_PER_SECOND );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

window.addEventListener('resize', updateCanvas);
animate();
