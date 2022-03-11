let camera, scene, renderer

let leftHandLine, leftHandIndexLine, leftHandMiddleLine,leftHandRingLine, leftHandPinkyLine, leftHandThumbLine
let rightHandLine, rightHandIndexLine, rightHandMiddleLine,rightHandRingLine, rightHandPinkyLine, rightHandThumbLine

let modelIndexLeft, indexArmatureLeft, index1Left, index2Left, index3Left
let modelMiddleLeft, middleArmatureLeft, middle1Left, middle2Left, middle3Left
let modelRingLeft, ringArmatureLeft, ring1Left, ring2Left, ring3Left
let modelPinkyLeft, pinkyArmatureLeft, pinky1Left, pinky2Left, pinky3Left
let modelHandLeft, handArmatureLeft, thumb1Left, thumb2Left, thumb3Left

let indexLeft, middleLeft, ringLeft, pinkyLeft

let crossHelper, crossIdeal

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
        pointsArr.push(new THREE.Vector3(-point.x*1.4,-point.y*0.65,-point.z))
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

function setPosition(model,landmark){
	model.position.x = -landmark.x*1.4
	model.position.y = -landmark.y*0.65
	model.position.z = -landmark.z
}

function setNullRotation(model){	
	model.rotation.x = 0
	model.rotation.y = 0
	model.rotation.z = 0
}

function drawArrowHelper(startPoint,endPoint){
	const length = 0.3
	const hex = "#ff0000"
	let start = new THREE.Vector3(-startPoint.x*1.4,-startPoint.y*0.65,-startPoint.z)
	let end = new THREE.Vector3(-endPoint.x*1.4,-endPoint.y*0.65,-endPoint.z)

	let dir = new THREE.Vector3()

	dir.subVectors(end,start).normalize()

	const arrowHelper = new THREE.ArrowHelper( dir, start, length, hex );
	return arrowHelper 
}

function applyQuaternionToBone(point1,point2,parentBone,childBone){	

	helper = drawArrowHelper(point1,point2)

	parentBone.applyQuaternion(helper.getWorldQuaternion())

	if(childBone){
		childBone.applyQuaternion(helper.getWorldQuaternion().invert())
	}
	
}

function findAngle(point1,point2,point3){
	let vector1 = new THREE.Vector3(point1.x,point1.y,point1.z)
	let vector2 = new THREE.Vector3(point2.x,point2.y,point2.z)
	let vector3 = new THREE.Vector3(point3.x,point3.y,point3.z)

	let sub1 = new THREE.Vector3()
	let sub2 = new THREE.Vector3()

	sub1.subVectors(vector1,vector2).normalize()
	sub2.subVectors(vector2,vector3).normalize()

	return sub1.angleTo(sub2)
}

function showHands(type,landmarks){
	
	if(type=="Left"){

		let vec1 = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z),new THREE.Vector3(-landmarks[5].x,-landmarks[5].y,-landmarks[5].z))
	
		let vec2 = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z),new THREE.Vector3(-landmarks[17].x,-landmarks[17].y,-landmarks[17].z))
		
		let dirCross = vec1.cross(vec2)

		let dirCrossRef = new THREE.Vector3(0,0,-1)

		let rotateY = dirCross.angleTo(dirCrossRef)

		console.log(rotateY)

		setNullRotation(index1Left)


		let scaleFactorIndex = new THREE.Vector3(-landmarks[5].x*1.4,-landmarks[5].y*0.65,-landmarks[5].z).distanceTo(new THREE.Vector3(-landmarks[6].x*1.4,-landmarks[6].y*0.65,-landmarks[6].z))	
		indexArmatureLeft.scale.set(scaleFactorIndex*0.14,scaleFactorIndex*0.15,scaleFactorIndex*0.14)
		
		
		setPosition(indexArmatureLeft,landmarks[5])		
		index1Left.rotation.y = -rotateY		
		applyQuaternionToBone(landmarks[5],landmarks[6],index1Left)
		index2Left.rotation.x = findAngle(landmarks[5],landmarks[6],landmarks[7])
		index3Left.rotation.x = findAngle(landmarks[6],landmarks[7],landmarks[8])

		
		
		
		
		
		
		setNullRotation(middle1Left)


		let scaleFactorMiddle = new THREE.Vector3(-landmarks[9].x*1.4,-landmarks[9].y*0.65,-landmarks[9].z).distanceTo(new THREE.Vector3(-landmarks[10].x*1.4,-landmarks[10].y*0.65,-landmarks[10].z))	
		middleArmatureLeft.scale.set(scaleFactorMiddle*0.23,scaleFactorMiddle*0.25,scaleFactorMiddle*0.23)
		setPosition(middleArmatureLeft,landmarks[9])		
		middle1Left.rotation.y = -rotateY
		applyQuaternionToBone(landmarks[9],landmarks[10],middle1Left)
		middle2Left.rotation.x = findAngle(landmarks[9],landmarks[10],landmarks[11])
		middle3Left.rotation.x = findAngle(landmarks[10],landmarks[11],landmarks[12])
				
		
		
		
		setNullRotation(ring1Left)


		let scaleFactorRing = new THREE.Vector3(-landmarks[13].x*1.4,-landmarks[13].y*0.65,-landmarks[13].z).distanceTo(new THREE.Vector3(-landmarks[14].x*1.4,-landmarks[14].y*0.65,-landmarks[14].z))	
		ringArmatureLeft.scale.set(scaleFactorRing*0.25,scaleFactorRing*0.29,scaleFactorRing*0.25)
		setPosition(ringArmatureLeft,landmarks[13])		
		ring1Left.rotation.y = -rotateY
		applyQuaternionToBone(landmarks[13],landmarks[14],ring1Left)
		ring2Left.rotation.x = findAngle(landmarks[13],landmarks[14],landmarks[15])
		ring3Left.rotation.x = findAngle(landmarks[14],landmarks[15],landmarks[16])
					
    

		setNullRotation(pinky1Left)


		let scaleFactorPinky = new THREE.Vector3(-landmarks[17].x*1.4,-landmarks[17].y*0.65,-landmarks[17].z).distanceTo(new THREE.Vector3(-landmarks[18].x*1.4,-landmarks[18].y*0.65,-landmarks[18].z))	
		pinkyArmatureLeft.scale.set(scaleFactorPinky*0.3,scaleFactorPinky*0.4,scaleFactorPinky*0.3)
		setPosition(pinkyArmatureLeft,landmarks[17])		
		pinky1Left.rotation.y = -rotateY
		applyQuaternionToBone(landmarks[17],landmarks[18],pinky1Left)
		pinky2Left.rotation.x = findAngle(landmarks[17],landmarks[18],landmarks[19])
		pinky3Left.rotation.x = findAngle(landmarks[18],landmarks[19],landmarks[20])


		
		setNullRotation(handLeft)

		let scaleFactorHandHeight = new THREE.Vector3(-landmarks[0].x*1.4,-landmarks[0].y*0.65,-landmarks[0].z).distanceTo(new THREE.Vector3(-landmarks[5].x*1.4,-landmarks[5].y*0.65,-landmarks[5].z))
		let scaleFactorHandWidth = new THREE.Vector3(-landmarks[5].x*1.4,-landmarks[5].y*0.65,-landmarks[5].z).distanceTo(new THREE.Vector3(-landmarks[17].x*1.5,-landmarks[17].y*0.65,-landmarks[17].z))	
		
		handArmatureLeft.scale.set(scaleFactorHandWidth*0.15,scaleFactorHandHeight*0.08,scaleFactorHandHeight*0.1)	
		
		setPosition(handArmatureLeft,landmarks[0])		
		handLeft.rotation.y = -rotateY
		applyQuaternionToBone(landmarks[0],landmarks[9],handLeft)
		console.log("here......................................................",scaleFactorHandWidth)

		
		setNullRotation(thumb1Left)
		applyQuaternionToBone(landmarks[1],landmarks[2],thumb1Left)

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

	const loader = new THREE.GLTFLoader();


	loader.load( 'index.glb', function ( gltf ) {	

	modelIndexLeft = gltf.scene;
    scene.add(modelIndexLeft)

	modelIndexLeft.traverse(function(obj) { obj.frustumCulled = false; })

	indexArmatureLeft = modelIndexLeft.getObjectByName("Armature")
	index1Left = modelIndexLeft.getObjectByName("index1")
	index2Left = modelIndexLeft.getObjectByName("index2")
	index3Left = modelIndexLeft.getObjectByName("index3")

	});

	
	loader.load( 'middle.glb', function ( gltf ) {	

	modelMiddleLeft = gltf.scene;
	scene.add(modelMiddleLeft)

	modelMiddleLeft.traverse(function(obj) { obj.frustumCulled = false; })

	middleArmatureLeft = modelMiddleLeft.getObjectByName("Armature")
	middle1Left = modelMiddleLeft.getObjectByName("middle1")
	middle2Left = modelMiddleLeft.getObjectByName("middle2")
	middle3Left = modelMiddleLeft.getObjectByName("middle3")

	});




	loader.load( 'ring.glb', function ( gltf ) {	

	modelRingLeft = gltf.scene;
	scene.add(modelRingLeft)

	modelRingLeft.traverse(function(obj) { obj.frustumCulled = false; })

	ringArmatureLeft = modelRingLeft.getObjectByName("Armature")
	ring1Left = modelRingLeft.getObjectByName("ring1")
	ring2Left = modelRingLeft.getObjectByName("ring2")
	ring3Left = modelRingLeft.getObjectByName("ring3")

	});




	loader.load( 'pinky.glb', function ( gltf ) {	

	modelPinkyLeft = gltf.scene;
	scene.add(modelPinkyLeft)

	modelPinkyLeft.traverse(function(obj) { obj.frustumCulled = false; })

	pinkyArmatureLeft = modelPinkyLeft.getObjectByName("Armature")
	pinky1Left = modelPinkyLeft.getObjectByName("pinky1")
	pinky2Left = modelPinkyLeft.getObjectByName("pinky2")
	pinky3Left = modelPinkyLeft.getObjectByName("pinky3")

	});


	loader.load( 'hand part.glb', function ( gltf ) {	

	modelHandLeft = gltf.scene;
	scene.add(modelHandLeft)

	modelHandLeft.traverse(function(obj) { obj.frustumCulled = false; })

	handArmatureLeft = modelHandLeft.getObjectByName("Armature")
	handLeft = handArmatureLeft.getObjectByName("hand")
	thumb1Left = handArmatureLeft.getObjectByName("thumb1")
	thumb2Left = handArmatureLeft.getObjectByName("thumb1")
	thumb3Left = handArmatureLeft.getObjectByName("thumb1")

	indexLeft = handArmatureLeft.getObjectByName("index")
	middleLeft = handArmatureLeft.getObjectByName("middle")
	ringLeft = handArmatureLeft.getObjectByName("ring")
	pinkyLeft = handArmatureLeft.getObjectByName("pinky")

	});



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

