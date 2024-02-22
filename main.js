/*
	EARTHQUAKES by Eli Cohavi

	Libraries used:
	Three.js,
	Orbit Controls,
	Tween Camera Controls,
	Text Geometry from THREE,
	Fonts from THREE

	Assets used:
	10k Earthmap by James Hastings-Trew @ https://planetpixelemporium.com/earth8081.html
	+ 4k Variant for efficiency & optimization

*/


//Library Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';


//Initilization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 13, 0);


//First Camera Position
camera.position.z = 5;
camera.position.y = 11;

//Earth Exterior Texture
const earthExtTexture = new THREE.TextureLoader().load(
	"Assets/Textures/8081_earthmap10k.jpg");
earthExtTexture.wrapS = THREE.RepeatWrapping;
earthExtTexture.wrapT = THREE.RepeatWrapping;
earthExtTexture.repeat.set(0.5, 1); 	/*
Earth Map Texture by James Hastings-Trew
@ https://planetpixelemporium.com/earth.html
Use Allowed for Personal & Commercial Projects
Not for redistribution. 				*/


//Earth Half Sphere Exterior
const halfEarthGeo = new THREE.SphereGeometry(15, 64, 32, Math.PI, Math.PI);
const halfEarthMat = new THREE.MeshStandardMaterial({ map: earthExtTexture });
const halfEarthSphere = new THREE.Mesh(halfEarthGeo, halfEarthMat);
halfEarthMat.side = THREE.DoubleSide;
scene.add(halfEarthSphere);

//Earth Half Sphere Interior Brown
const halfEarthInsideGeoBrown = new THREE.CircleGeometry(15, 64);
const halfEarthInsideMatBrown = new THREE.MeshStandardMaterial({ color: 0x673300, opacity: 0 });
const halfEarthInsideBrown = new THREE.Mesh(halfEarthInsideGeoBrown, halfEarthInsideMatBrown);
scene.add(halfEarthInsideBrown);

//Earth Half Sphere Interior Orange
const halfEarthInsideGeo = new THREE.CircleGeometry(14, 64);
const halfEarthInsideMat = new THREE.MeshStandardMaterial({ color: 0xFF8213 });
const halfEarthInside = new THREE.Mesh(halfEarthInsideGeo, halfEarthInsideMat);
halfEarthInsideBrown.position.z = -.01; //To prevent collision between Orange and Brown
scene.add(halfEarthInside);

//Earth Core
const coreGeo = new THREE.SphereGeometry(5, 64, 32);
const coreMat = new THREE.MeshStandardMaterial({ color: 0xFFCE00 });
const Core = new THREE.Mesh(coreGeo, coreMat);
scene.add(Core);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

//Shake Earth
let shakePosX;
let shakePosY;
let shakeBoolean = false;
function shakeEarth() {
	if (shakeBoolean == true) {
		console.log('shakeBoolean is true');
		halfEarthSphere.position.x = shakePosX;
		halfEarthSphere.position.y = shakePosY;
		halfEarthInsideBrown.position.x = shakePosX;
		halfEarthInsideBrown.position.y = shakePosY;
	}
	else {
		console.log('shakeBoolean is false');
		halfEarthSphere.position.x = 0;
		halfEarthSphere.position.y = 0;
		halfEarthInsideBrown.position.x = 0;
		halfEarthInsideBrown.position.y = 0;
	}

}

//Core Arrows
let arrowOpacity = 0;
const arrowGeo = new THREE.ConeGeometry(0.5, 1, 4, 1);
const arrowMat = new THREE.MeshStandardMaterial({ color: 0xFFCE00, transparent: true, opacity: arrowOpacity, });

const arrow1 = new THREE.Mesh(arrowGeo, arrowMat);
arrow1.position.y = 6.5;
arrow1.rotation.y = Math.PI / 4;

const arrow2 = new THREE.Mesh(arrowGeo, arrowMat);
arrow2.position.y = 8;
arrow2.rotation.y = Math.PI / 4;

const arrow3 = new THREE.Mesh(arrowGeo, arrowMat);
arrow3.position.x = 6.5;
arrow3.rotation.x = Math.PI / 4;
arrow3.rotation.z = 3 * Math.PI / 2;

const arrow4 = new THREE.Mesh(arrowGeo, arrowMat);
arrow4.position.x = 8;
arrow4.rotation.x = Math.PI / 4;
arrow4.rotation.z = 3 * Math.PI / 2;

const arrow5 = new THREE.Mesh(arrowGeo, arrowMat);
arrow5.position.y = -6.5;
arrow5.rotation.y = Math.PI / 4;
arrow5.rotation.z = Math.PI;

const arrow6 = new THREE.Mesh(arrowGeo, arrowMat);
arrow6.position.y = -8;
arrow6.rotation.y = Math.PI / 4;
arrow6.rotation.z = Math.PI;

const arrow7 = new THREE.Mesh(arrowGeo, arrowMat);
arrow7.position.x = -6.5;
arrow7.rotation.x = Math.PI / 4;
arrow7.rotation.z = Math.PI / 2;

const arrow8 = new THREE.Mesh(arrowGeo, arrowMat);
arrow8.position.x = -8;
arrow8.rotation.x = Math.PI / 4;
arrow8.rotation.z = Math.PI / 2;

scene.add(arrow1);
scene.add(arrow2);
scene.add(arrow3);
scene.add(arrow4);
scene.add(arrow5);
scene.add(arrow6);
scene.add(arrow7);
scene.add(arrow8);


//Convection Current Arrow Off Or On
let convectionCurrentOpacity = 0;

//Geo and Mats
const convecArrowGeo = new THREE.ConeGeometry(0.5, 1, 4, 1);
const convecRedArrowMat = new THREE.MeshStandardMaterial(
	{ color: 0xFF0000, transparent: true, opacity: convectionCurrentOpacity, });
const convecOrangeArrowMat = new THREE.MeshStandardMaterial(
	{ color: 0xFF3800, transparent: true, opacity: convectionCurrentOpacity, });
const convecYellowArrowMat = new THREE.MeshStandardMaterial(
	{ color: 0xFFCE00, transparent: true, opacity: convectionCurrentOpacity, });
const convecLightBlueArrowMat = new THREE.MeshStandardMaterial(
	{ color: 0x0094FF, transparent: true, opacity: convectionCurrentOpacity, });
const convecBlueArrowMat = new THREE.MeshStandardMaterial(
	{ color: 0x000AFF, transparent: true, opacity: convectionCurrentOpacity, });

//Construction of Arrows
const convecRedArrow1 = new THREE.Mesh(convecArrowGeo, convecRedArrowMat);
convecRedArrow1.position.y = 6.5;
convecRedArrow1.position.x = 1;

const convecRedArrow2 = new THREE.Mesh(convecArrowGeo, convecRedArrowMat);
convecRedArrow2.position.y = 6.5;
convecRedArrow2.position.x = -1;

const convecOrangeArrow1 = new THREE.Mesh(convecArrowGeo, convecOrangeArrowMat);
convecOrangeArrow1.position.y = 9;
convecOrangeArrow1.position.x = -1;

const convecOrangeArrow2 = new THREE.Mesh(convecArrowGeo, convecOrangeArrowMat);
convecOrangeArrow2.position.y = 9;
convecOrangeArrow2.position.x = 1;

const convecYellowArrow1 = new THREE.Mesh(convecArrowGeo, convecYellowArrowMat);
convecYellowArrow1.position.y = 12.5;
convecYellowArrow1.position.x = -2.5;

const convecYellowArrow2 = new THREE.Mesh(convecArrowGeo, convecYellowArrowMat);
convecYellowArrow2.position.y = 12.5;
convecYellowArrow2.position.x = 2.5;

const convecLightBlueArrow1 = new THREE.Mesh(convecArrowGeo, convecLightBlueArrowMat);
convecLightBlueArrow1.position.y = 10.5;
convecLightBlueArrow1.position.x = -6;

const convecLightBlueArrow2 = new THREE.Mesh(convecArrowGeo, convecLightBlueArrowMat);
convecLightBlueArrow2.position.y = 10.5;
convecLightBlueArrow2.position.x = 6;

const convecBlueArrow1 = new THREE.Mesh(convecArrowGeo, convecBlueArrowMat);
convecBlueArrow1.position.y = 5.5;
convecBlueArrow1.position.x = -5;

const convecBlueArrow2 = new THREE.Mesh(convecArrowGeo, convecBlueArrowMat);
convecBlueArrow2.position.y = 5.5;
convecBlueArrow2.position.x = 5;

scene.add(convecRedArrow1);
scene.add(convecRedArrow2);
scene.add(convecOrangeArrow1);
scene.add(convecOrangeArrow2);
scene.add(convecYellowArrow1);
scene.add(convecYellowArrow2);
scene.add(convecLightBlueArrow1);
scene.add(convecLightBlueArrow2);
scene.add(convecBlueArrow1);
scene.add(convecBlueArrow2);


//Arrow Movement
function moveArrows() {

	//Core Arrow Movement & Opacity
	arrow1.material.opacity = arrowOpacity;
	arrow1.position.y += 0.02;
	arrow2.position.y += 0.02;
	arrow3.position.x += 0.02;
	arrow4.position.x += 0.02;
	arrow5.position.y -= 0.02;
	arrow6.position.y -= 0.02;
	arrow7.position.x -= 0.02;
	arrow8.position.x -= 0.02;

	//Convection Arrow Movement
	convecRedArrow1.position.y += 0.02;
	convecRedArrow2.position.y += 0.02;

	convecOrangeArrow1.position.y += 0.02;
	convecOrangeArrow1.position.x -= 0.01;
	convecOrangeArrow1.rotation.z = Math.PI / 6;

	convecOrangeArrow2.position.y += 0.02;
	convecOrangeArrow2.position.x += 0.01;
	convecOrangeArrow2.rotation.z = 11 * Math.PI / 6;

	convecYellowArrow1.position.y -= 0.005;
	convecYellowArrow1.position.x -= 0.02;
	convecYellowArrow1.rotation.z = 4 * Math.PI / 6;

	convecYellowArrow2.position.y -= 0.005;
	convecYellowArrow2.position.x += 0.02;
	convecYellowArrow2.rotation.z = 8 * Math.PI / 6;

	convecLightBlueArrow1.position.y -= 0.02;
	convecLightBlueArrow1.rotation.z = 6 * Math.PI / 6;

	convecLightBlueArrow2.position.y -= 0.02;
	convecLightBlueArrow2.rotation.z = 6 * Math.PI / 6;

	convecBlueArrow1.position.x += 0.02;
	convecBlueArrow1.rotation.z = 3 * Math.PI / 2;

	convecBlueArrow2.position.x -= 0.02;
	convecBlueArrow2.rotation.z = Math.PI / 2;


	//Convection Arrow Movement Resets
	if (convecRedArrow1.position.y > 9) {
		convecRedArrow1.position.y = 6.5;
		convecRedArrow2.position.y = 6.5;

	}
	if (convecOrangeArrow1.position.y > 11.5) {
		convecOrangeArrow1.position.y = 9;
		convecOrangeArrow1.position.x = -1;
		convecOrangeArrow2.position.y = 9;
		convecOrangeArrow2.position.x = 1;
		convecYellowArrow1.position.y = 12.5;
		convecYellowArrow1.position.x = -2.5;
		convecYellowArrow2.position.x = 2.5;
		convecYellowArrow2.position.y = 12.5;
		convecLightBlueArrow1.position.y = 10.5;
		convecLightBlueArrow1.position.x = -6;
		convecLightBlueArrow2.position.y = 10.5;
		convecLightBlueArrow2.position.x = 6;
		convecBlueArrow1.position.y = 5.5;
		convecBlueArrow1.position.x = -5;
		convecBlueArrow2.position.y = 5.5;
		convecBlueArrow2.position.x = 5;
	}

	//Convection Arrow Opacities
	convecRedArrow1.material.opacity = convectionCurrentOpacity;
	convecOrangeArrow1.material.opacity = convectionCurrentOpacity;
	convecYellowArrow1.material.opacity = convectionCurrentOpacity;
	convecLightBlueArrow1.material.opacity = convectionCurrentOpacity;
	convecBlueArrow1.material.opacity = convectionCurrentOpacity;

	//Core Arrow Movement Resets
	if (arrow1.position.y > 9.5) {
		arrow1.position.y = 6.5;
		arrow3.position.x = 6.5;
		arrow5.position.y = -6.5
		arrow7.position.x = -6.5;

	} if (arrow2.position.y > 9.5) {
		arrow2.position.y = 6.5;
		arrow4.position.x = 6.5;
		arrow6.position.y = -6.5;
		arrow8.position.x = -6.5;
	}

}

//Text Attributes
let text = 'three.js',
	bevelEnabled = true;



const height = 0.01,
	size = 0.25,
	hover = 30,

	curveSegments = 4,

	bevelThickness = 0.01,
	bevelSize = .01;
bevelEnabled = true;



//Font
const loader = new FontLoader();
const font = loader.load(
	//resource URL
	'Assets/Fonts/helvetiker_regular.typeface.json',

	//onLoad callback
	function (font) {
		//do something with the font
		console.log(font);

		textGeneration(font);


	},

	//onProgress callback
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},

	//onError callback
	function (err) {
		console.log('An error happened');
	}
);

//Text
let materials;
let questionGeo;
let instructionGeo;
let coreExpGeo;
let convecExpGeo1;
let convecExpGeo2;
let question;
let instructions;
let coreExp;
let convecExp;
let convecExp2;

//Materials For Text
materials = [
	new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
	new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
];

//All Text Generations
function textGeneration(font) {

	//Question Text
	questionGeo = new TextGeometry(
		`We know that earthquakes can be caused \nby tectonic plates shifting, \nbut why do they shift in the first place?`, {

		font: font,

		size: size,
		height: height,
		curveSegments: curveSegments,

		bevelThickness: bevelThickness,
		bevelSize: bevelSize,
		bevelEnabled: bevelEnabled,

	}).center();

	//Text Object Creation
	question = new THREE.Mesh(questionGeo, materials);
	question.position.x = 0;
	question.position.y = 0;
	question.position.z = -1050;

	scene.add(question);


	//Instruction Text
	instructionGeo = new TextGeometry(
		'Use numbers 1 through 4 for scene selection. \nClick and drag to navigate scene.', {

		font: font,

		size: size,
		height: height,
		curveSegments: curveSegments,

		bevelThickness: bevelThickness,
		bevelSize: bevelSize,
		bevelEnabled: bevelEnabled,

	}).center();

	//Text Object Creation
	instructions = new THREE.Mesh(instructionGeo, materials);
	instructions.position.x = 0;
	instructions.position.y = 10;
	instructions.position.z = 0;

	scene.add(instructions);


	//Core Explanation
	coreExpGeo = new TextGeometry(
		"It all starts in the core. \nDeep in the Earth, heavy elements such as Iron, \nNickel, Uranium, and Potassium are in a constant \nstate of Nuclear Fission (splitting atoms) because they \nare breaking down. As these metallic isotopes break down, \nthey release what's called radioactive decay.",
		{

			font: font,

			size: size / 4,
			height: height / 4,
			curveSegments: curveSegments,

			bevelThickness: bevelThickness / 4,
			bevelSize: bevelSize / 4,
			bevelEnabled: bevelEnabled,

		});

	//Text Object Creation
	coreExp = new THREE.Mesh(coreExpGeo, materials);
	coreExp.position.x = 0;
	coreExp.position.y = 0;
	coreExp.position.z = -1050;

	scene.add(coreExp);


	//Convection Explanation
	convecExpGeo1 = new TextGeometry(
		"This Radioactive Decay releases incredible \namounts of energy that ascend toward the \nsurface via the process of Convection, \nheating up the Asthenosphere, a \nsemi-solid viscous layer below the crust.",
		{

			font: font,

			size: size * 1.5,
			height: height * 1.5,
			curveSegments: curveSegments,

			bevelThickness: bevelThickness,
			bevelSize: bevelSize,
			bevelEnabled: bevelEnabled,

		});

	//Text Object Creation
	convecExp = new THREE.Mesh(convecExpGeo1, materials);
	convecExp.position.x = 0;
	convecExp.position.y = 0;
	convecExp.position.z = -1050;

	scene.add(convecExp);


	//Convection Explanation Cont.
	convecExpGeo2 = new TextGeometry(
		"This energy then transfers its heat to the \ntectonic plates, pulling the plates away from \neach other (and toward each other in some parts) \nas it cools down and sinks back down to the core, \nstarting the process over again. \nRepeated pulling on these slabs causes tectonic \nmovement over time; i.e., earthquakes.",
		{

			font: font,

			size: size / 2,
			height: height / 2,
			curveSegments: curveSegments,

			bevelThickness: bevelThickness / 2,
			bevelSize: bevelSize / 2,
			bevelEnabled: bevelEnabled,

		});

	//Text Object Creation
	convecExp2 = new THREE.Mesh(convecExpGeo2, materials);
	convecExp2.position.x = 0;
	convecExp2.position.y = 0;
	convecExp2.position.z = -1050;

	scene.add(convecExp2);
}

//Tween camera position with keyboard
//Create variable to switch between camera positions and target
document.onkeydown = function (e) {
	if (question && coreExp && convecExp && convecExp2) {
		switch (e.key) {

			case "1": //Key 1
				new TWEEN.Tween(camera.position) //Move Camera Smoothly To Next Point
					.to({ x: 0, y: 13, z: 5 }, 1000)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.start();
				controls.target.set(0, 13, 0);

				//Shake Earth
				shakeBoolean = true;

				arrowOpacity = 0;
				convectionCurrentOpacity = 0;

				//Make Question Appear
				question.position.x = 0;
				question.position.y = 12;
				question.position.z = 0;

				//Make Instructions Disappear
				instructions.position.x = 0;
				instructions.position.y = 0;
				instructions.position.z = -3050;  //-3050 being beyond the point of render for the camera

				//Make Core Explanation Disappear
				coreExp.position.x = 0;
				coreExp.position.y = 0;
				coreExp.position.z = -3050;

				//Make Convection Explanation 1 Disappear
				convecExp.position.x = 0;
				convecExp.position.y = 0;
				convecExp.position.z = -3050;

				//Make Convection Explanation 2 Disappear
				convecExp2.position.x = 0;
				convecExp2.position.y = 0;
				convecExp2.position.z = -3050;

				break;
			case "2": //Key 2
				new TWEEN.Tween(camera.position) //Move Camera Smoothly To Next Point
					.to({ x: 0, y: 0, z: 10 }, 1000)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.start();
				controls.target.set(0, 0, 0);

				//Shake Earth false
				shakeBoolean = false;

				arrowOpacity = 1;
				convectionCurrentOpacity = 0;

				//Make Question Disappear
				question.position.x = 0;
				question.position.y = 0;
				question.position.z = -3050;

				//Make Instructions Disappear
				instructions.position.x = 0;
				instructions.position.y = 0;
				instructions.position.z = -3050;

				//Make Core Explanation Appear
				coreExp.position.x = -2;
				coreExp.position.y = 0;
				coreExp.position.z = 8.5;
				coreExp.rotation.y = Math.PI / 12;

				//Make Convection Explanation 1 Disappear
				convecExp.position.x = 0;
				convecExp.position.y = 0;
				convecExp.position.z = -3050;

				//Make Convection Explanation 2 Disappear
				convecExp2.position.x = 0;
				convecExp2.position.y = 0;
				convecExp2.position.z = -3050;

				break;
			case "3": //Key 3
				new TWEEN.Tween(camera.position) //Move Camera Smoothly To Next Point
					.to({ x: 0, y: 7, z: 15 }, 1000)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.start();
				controls.target.set(0, 7, 0);

				//Shake Earth false
				shakeBoolean = false;

				arrowOpacity = 1;
				convectionCurrentOpacity = 0;

				//Make Question Disappear
				question.position.x = 0;
				question.position.y = 0;
				question.position.z = -3050;

				//Make Instructions Disappear
				instructions.position.x = 0;
				instructions.position.y = 0;
				instructions.position.z = -3050;

				//Make Core Explanation Disappear
				coreExp.position.x = 0;
				coreExp.position.y = 0;
				coreExp.position.z = -3050;

				//Make Convection Explanation 1 Appear
				convecExp.position.x = -10;
				convecExp.position.y = 8;
				convecExp.position.z = 7;
				convecExp.rotation.y = Math.PI / 12;

				//Make Convection Explanation 2 Disappear
				convecExp2.position.x = 0;
				convecExp2.position.y = 0;
				convecExp2.position.z = -3050;

				break;
			case "4":
				new TWEEN.Tween(camera.position) //Move Camera Smoothly To Next Point
					.to({ x: 0, y: 10, z: 7 }, 1000)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.start();
				controls.target.set(0, 10, 0);

				//Shake Earth false
				shakeBoolean = false;

				arrowOpacity = 0;
				convectionCurrentOpacity = 1;

				//Make Question Disappear
				question.position.x = 0;
				question.position.y = 0;
				question.position.z = -3050;

				//Make Instructions Disappear
				instructions.position.x = 0;
				instructions.position.y = 0;
				instructions.position.z = -3050;

				//Make Core Explanation Disappear
				coreExp.position.x = 0;
				coreExp.position.y = 0;
				coreExp.position.z = -3050;

				//Make Convection Explanation 1 Disappear
				convecExp.position.x = 0;
				convecExp.position.y = 0;
				convecExp.position.z = -3050;

				//Make Convection Explanation 2 Appear
				convecExp2.position.x = -3;
				convecExp2.position.y = 10;
				convecExp2.position.z = 4;

				break;

		}
	}
}

//Elements To Continuously Animate
function animate() {
	requestAnimationFrame(animate);

	moveArrows();
	TWEEN.update();
	renderer.render(scene, camera);

	shakePosX = THREE.MathUtils.randFloat(-.05, .05);
	shakePosY = THREE.MathUtils.randFloat(-.05, .05);

	shakeEarth();
}

//Window Resizing
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

//Animate
animate();