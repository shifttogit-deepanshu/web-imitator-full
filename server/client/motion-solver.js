let helper1, helper2

let k = 0

const materialPose = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const materialRightHands = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const materialLeftHands = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
//  leftHandIndex1, leftHandIndex2, leftHandIndex3, leftHandMiddle1,
// 		leftHandMiddle2, leftHandMiddle3, leftHandRing1, leftHandRing2, leftHandRing3, leftHandPinky1, leftHandPinky2,
// 		leftHandPinky3, leftHandThumb1, leftHandThumb2, leftHandThumb3, leftArm, leftForeArm, leftHand, model,leftShoulder

		// let arm1,arm2,body,arrowHelperArmRef,arrowHelperArm,arrowHelperShoulder,arrowHelperForeArm,arrowHelperForeArmRef
        // let hand, index, middle, ring, pinky, thumb , arrowHelperHandY,arrowHelperHandZ, arrowHelperHandRef, arrowHelperIndexRef1, arrowHelperIndexRef2, arrowHelperIndexRef3
		// let globalArmQuaternion
		// let arrowHelperRef, arrowHelperRef2, refVector


		
		// const length = 2
		// const hex = "#000000"
		// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
		
init();
animate();


function drawArrowHelper(startPoint,endPoint,color){
	const length = 1
	const hex =	color
	let start = new THREE.Vector3(startPoint.x,startPoint.y,startPoint.z)
	let end = new THREE.Vector3(endPoint.x,endPoint.y,endPoint.z)

	let dir = new THREE.Vector3()

	dir.subVectors(end,start).normalize()

	const arrowHelper = new THREE.ArrowHelper( dir, start, length, hex );
	return arrowHelper 
}



function init() {

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.set(0,0,1)
	
	clock = new THREE.Clock();

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );

	const light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
	light.position.set( 0, 1, 0 );
	scene.add( light );

	const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
	scene.add( directionalLight );

	const size = 10;
	const divisions = 10;

	const gridHelper = new THREE.GridHelper( size, divisions );
	scene.add( gridHelper );

	// Loading model

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 1, 0 );
	controls.update();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

// helper1.applyQuaternion(new THREE.Quaternion().set(1,1,3,4).normalize())
// x+=0.5
// console.log(helper1)

// console.log(helper1.quaternion.angleTo(helper2.quaternion))

// const coords = {x: 1, y: 1, z:1, w:1} 
// 	const tween = new TWEEN.Tween(coords) 
// 		.to({x: 2, y: 3, z:4, w:2}, 5000) 
// 		.easing(TWEEN.Easing.Quadratic.Out) 
// 		.onUpdate((tween) => {
// 			// Called after tween.js updates 'coords'.
// 			// Move 'box' to the position described by 'coords' with a CSS translation.
// 			const newQuaternion = new THREE.Quaternion(0.2, 0.3, 0.4, 2).normalize()
// 			// helper1.applyQuaternion(newQuaternion)
// 			// console.log(".......................",tween)
// 			helper1.quaternion.rotateTowards(newQuaternion,5)
// 		})
// 		.start() // Start the tween immediately.


		
if(helper1){
	scene.remove(helper1)	
}
helper1 = drawArrowHelper({x:0.1,y:0.1,z:0.1},{x:3,y:1,z:5},"#ff00ff")
scene.add(helper1)

if(helper2){
scene.remove(helper2)
}
helper2 = drawArrowHelper({x:0.2,y:0.2,z:0.3},{x:5,y:7,z:10},"#ffffff")
scene.add(helper2)

// console.log(helper1)

const coords = {k:0} 
const tween = new TWEEN.Tween(coords) 
	.to({k:0.002}, 5000) 
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate((tween) => {

	helper1.quaternion.rotateTowards(helper2.quaternion,tween.k*2)
	console.log(tween.k)
	})
	.start() 

function animate(time) {

	requestAnimationFrame( animate )

	TWEEN.update(time)

// Start the tween immediately.



	// k+=0.05

	
		// scene.remove(helper2)	
		// helper2 = drawArrowHelper({x:1,y:1,z:1},{x:3,y:4,z:-5},"#ffff00")
		// scene.add(helper2)

	renderer.render( scene, camera )
}

