let camera, scene, renderer

let leftHandLine, leftHandIndexLine, leftHandMiddleLine,leftHandRingLine, leftHandPinkyLine, leftHandThumbLine
let rightHandLine, rightHandIndexLine, rightHandMiddleLine,rightHandRingLine, rightHandPinkyLine, rightHandThumbLine

const materialPose = new THREE.MeshStandardMaterial( {
	color: "#ff0000"
} );
const materialRightHands = new THREE.MeshStandardMaterial( {
	color: "#ff0000"
} );
const materialLeftHands = new THREE.MeshStandardMaterial( {
	color: "#00ff00"
} );
		
init();
animate();


function drawLineHand(type,...points){
	let line
    pointsArr = []
    points.forEach(point=>{
        pointsArr.push(new THREE.Vector3(-point.x,-point.y,-point.z))
    })
    let geometry = new THREE.BufferGeometry().setFromPoints( pointsArr );
	if(type=="Right"){
		line = new THREE.Line( geometry, materialRightHands );
	}
	else if (type=="Left"){
		line = new THREE.Line( geometry, materialRightHands );
	}
    return line
}


function drawHandLandmarks(type,landmarks){
    
	if(type=="Left"){

		modelIndex3.position.x = -landmarks[7].x
		modelIndex3.position.y = -landmarks[7].y
		modelIndex3.position.z = -landmarks[7].z

		index3.rotation.x = 0
		index3.rotation.y = 0
		index3.rotation.z = 0

		if(index3Helper){
			scene.remove(index3Helper)
		}

		let index3Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[8].x,-landmarks[8].y,-landmarks[8].z),new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z))

		index3Helper = new THREE.ArrowHelper(index3Vector.normalize(),new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z),3,"#ff0000")

        casterVector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z),new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z))
		
		index2RayCaster = new THREE.Raycaster(new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z),casterVector.normalize(),0,0.01)

		scene.add(index3Helper)

		index3.applyQuaternion(index3Helper.getWorldQuaternion())


        modelIndex2.position.x = -landmarks[6].x
		modelIndex2.position.y = -landmarks[6].y
		modelIndex2.position.z = -landmarks[6].z

		index2.rotation.x = 0
		index2.rotation.y = 0
		index2.rotation.z = 0

		if(index2Helper){
			scene.remove(index2Helper)
		}

		let index2Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z),new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z))

		index2Helper = new THREE.ArrowHelper(index2Vector.normalize(),new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z),3,"#ff0000")

		// scene.add(index2Helper)

		index2.applyQuaternion(index2Helper.getWorldQuaternion())
        		

		if(leftHandLine){
			scene.remove(leftHandLine)
		}
		if(leftHandIndexLine){
			scene.remove(leftHandIndexLine)
		}
		if(leftHandMiddleLine){
			scene.remove(leftHandMiddleLine)
		}
		if(leftHandRingLine){
			scene.remove(leftHandRingLine)
		}
		if(leftHandPinkyLine){
			scene.remove(leftHandPinkyLine)
		}
		if(leftHandThumbLine){
			scene.remove(leftHandThumbLine)
		}
		leftHandLine = drawLineHand(type,landmarks[0],landmarks[5],landmarks[9],landmarks[13],landmarks[17],landmarks[0])
		leftHandIndexLine = drawLineHand(type,landmarks[5],landmarks[6],landmarks[7],landmarks[8])
		leftHandMiddleLine = drawLineHand(type,landmarks[9],landmarks[10],landmarks[11],landmarks[12])
		leftHandRingLine = drawLineHand(type,landmarks[13],landmarks[14],landmarks[15],landmarks[16])
		leftHandPinkyLine = drawLineHand(type,landmarks[17],landmarks[18],landmarks[19],landmarks[20])
		leftHandThumbLine = drawLineHand(type,landmarks[0],landmarks[1],landmarks[2],landmarks[3],landmarks[4])
		scene.add(leftHandLine)
		scene.add(leftHandIndexLine)
		scene.add(leftHandMiddleLine)
		scene.add(leftHandRingLine)
		scene.add(leftHandPinkyLine)
		scene.add(leftHandThumbLine)
	}
	else if(type=="Right"){
		if(rightHandLine){
			scene.remove(rightHandLine)
		}
		if(rightHandIndexLine){
			scene.remove(rightHandIndexLine)
		}
		if(rightHandMiddleLine){
			scene.remove(rightHandMiddleLine)
		}
		if(rightHandRingLine){
			scene.remove(rightHandRingLine)
		}
		if(rightHandPinkyLine){
			scene.remove(rightHandPinkyLine)
		}
		if(rightHandThumbLine){
			scene.remove(rightHandThumbLine)
		}
		rightHandLine = drawLineHand(type,landmarks[0],landmarks[5],landmarks[9],landmarks[13],landmarks[17],landmarks[0])
		rightHandIndexLine = drawLineHand(type,landmarks[5],landmarks[6],landmarks[7],landmarks[8])
		rightHandMiddleLine = drawLineHand(type,landmarks[9],landmarks[10],landmarks[11],landmarks[12])
		rightHandRingLine = drawLineHand(type,landmarks[13],landmarks[14],landmarks[15],landmarks[16])
		rightHandPinkyLine = drawLineHand(type,landmarks[17],landmarks[18],landmarks[19],landmarks[20])
		rightHandThumbLine = drawLineHand(type,landmarks[0],landmarks[1],landmarks[2],landmarks[3],landmarks[4])
		scene.add(rightHandLine)
		scene.add(rightHandIndexLine)
		scene.add(rightHandMiddleLine)
		scene.add(rightHandRingLine)
		scene.add(rightHandPinkyLine)
		scene.add(rightHandThumbLine)
	}
    
}


function init() {

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.set(0,0,5)
	
	clock = new THREE.Clock();

	scene = new THREE.Scene();
	scene.background = new THREE.Color( "#ffffff" );

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


function animate(time) {

	requestAnimationFrame( animate )

	renderer.render( scene, camera )
}

