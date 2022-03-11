let camera, scene, renderer

let leftHandLine, leftHandIndexLine, leftHandMiddleLine,leftHandRingLine, leftHandPinkyLine, leftHandThumbLine
let rightHandLine, rightHandIndexLine, rightHandMiddleLine,rightHandRingLine, rightHandPinkyLine, rightHandThumbLine
let hand,main,all,index1,index2,index3,middle1,middle2,middle3,pinky1,pinky2,pinky3,ring1,ring2,ring3,thumb1,thumb2,thumb3

let handRight,mainRight,allRight,index1Right,index2Right,index3Right,middle1Right,middle2Right,middle3Right,pinky1Right,pinky2Right,pinky3Right,ring1Right,ring2Right,ring3Right,thumb1Right,thumb2Right,thumb3Right

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


function setPosition(model,landmark){
	model.position.x = -landmark.x
	model.position.y = -landmark.y
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
	let start = new THREE.Vector3(-startPoint.x,-startPoint.y,-startPoint.z)
	let end = new THREE.Vector3(-endPoint.x,-endPoint.y,-endPoint.z)

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
		setNullRotation(index1)
		setNullRotation(middle1)
		setNullRotation(main)
		setNullRotation(ring1)
		setNullRotation(pinky1)		
		setNullRotation(thumb1)
		setNullRotation(thumb2)
		setNullRotation(thumb3)

		let vec1 = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z),new THREE.Vector3(-landmarks[5].x,-landmarks[5].y,-landmarks[5].z))
	
		let vec2 = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z),new THREE.Vector3(-landmarks[17].x,-landmarks[17].y,-landmarks[17].z))
		
		let dirCross = vec1.cross(vec2)

		let dirCrossRef = new THREE.Vector3(0,0,-1)

		let rotateY = dirCross.angleTo(dirCrossRef)		

		handHelper = drawArrowHelper(landmarks[0],landmarks[9])

		

		applyQuaternionToBone(landmarks[5],landmarks[6],index1)
	
		
		applyQuaternionToBone(landmarks[9],landmarks[10],middle1)
	
		
	
		
		applyQuaternionToBone(landmarks[13],landmarks[14],ring1)
	
		
		applyQuaternionToBone(landmarks[17],landmarks[18],pinky1)
	
		applyQuaternionToBone(landmarks[0],landmarks[2],thumb1,thumb2)
		applyQuaternionToBone(landmarks[2],landmarks[3],thumb2,thumb3)
		applyQuaternionToBone(landmarks[3],landmarks[4],thumb3)

		main.rotation.y = -rotateY
	
		setPosition(all,landmarks[0])
		let scaleFactorHandWidth = new THREE.Vector3(-landmarks[5].x,-landmarks[5].y,-landmarks[5].z).distanceTo(new THREE.Vector3(-landmarks[17].x,-landmarks[17].y,-landmarks[17].z))	
		let scaleFactorHandHeight = new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z).distanceTo(new THREE.Vector3(-landmarks[9].x,-landmarks[9].y,-landmarks[9].z))	
		all.scale.set(scaleFactorHandWidth*0.2,scaleFactorHandHeight*0.08,scaleFactorHandWidth*0.2)
		main.applyQuaternion(handHelper.getWorldQuaternion())
		index1.applyQuaternion(handHelper.getWorldQuaternion().invert())
		middle1.applyQuaternion(handHelper.getWorldQuaternion().invert())
		ring1.applyQuaternion(handHelper.getWorldQuaternion().invert())
		pinky1.applyQuaternion(handHelper.getWorldQuaternion().invert())
		thumb1.applyQuaternion(handHelper.getWorldQuaternion().invert())
	
		index2.rotation.x = findAngle(landmarks[5],landmarks[6],landmarks[7])
		index3.rotation.x = findAngle(landmarks[6],landmarks[7],landmarks[8])
	
		middle2.rotation.x = findAngle(landmarks[9],landmarks[10],landmarks[11])
		middle3.rotation.x = findAngle(landmarks[10],landmarks[11],landmarks[12])
	
		ring2.rotation.x = findAngle(landmarks[13],landmarks[14],landmarks[15])
		ring3.rotation.x = findAngle(landmarks[14],landmarks[15],landmarks[16])
	
		pinky2.rotation.x = findAngle(landmarks[17],landmarks[18],landmarks[19])
		pinky3.rotation.x = findAngle(landmarks[18],landmarks[19],landmarks[20])		
		
		// index1.rotation.y = -rotateY
		// middle1.rotation.y = -rotateY
		// ring1.rotation.y = -rotateY
		// pinky1.rotation.y = -rotateY
		// thumb1.rotation.y = -rotateY

		

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

		handHelperRight = drawArrowHelper(landmarks[0],landmarks[9])

		setNullRotation(index1Right)
		applyQuaternionToBone(landmarks[5],landmarks[6],index1Right)
	
		setNullRotation(middle1Right)
		applyQuaternionToBone(landmarks[9],landmarks[10],middle1Right)
	
		setNullRotation(mainRight)
	
		setNullRotation(ring1Right)
		applyQuaternionToBone(landmarks[13],landmarks[14],ring1Right)
	
		setNullRotation(pinky1Right)
		applyQuaternionToBone(landmarks[17],landmarks[18],pinky1Right)
	
		setNullRotation(thumb1Right)
		setNullRotation(thumb2Right)
		setNullRotation(thumb3Right)
		applyQuaternionToBone(landmarks[0],landmarks[2],thumb1Right,thumb2Right)
		applyQuaternionToBone(landmarks[2],landmarks[3],thumb2Right,thumb3Right)
		applyQuaternionToBone(landmarks[3],landmarks[4],thumb3Right)
	
		setPosition(allRight,landmarks[0])
		let scaleFactorHandWidthRight = new THREE.Vector3(-landmarks[5].x,-landmarks[5].y,-landmarks[5].z).distanceTo(new THREE.Vector3(-landmarks[17].x,-landmarks[17].y,-landmarks[17].z))	
		let scaleFactorHandHeightRight = new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z).distanceTo(new THREE.Vector3(-landmarks[9].x,-landmarks[9].y,-landmarks[9].z))	
		allRight.scale.set(scaleFactorHandWidthRight*0.13,scaleFactorHandHeightRight*0.08,scaleFactorHandWidthRight*0.13)
		mainRight.applyQuaternion(handHelperRight.getWorldQuaternion())
		index1Right.applyQuaternion(handHelperRight.getWorldQuaternion().invert())
		middle1Right.applyQuaternion(handHelperRight.getWorldQuaternion().invert())
		ring1Right.applyQuaternion(handHelperRight.getWorldQuaternion().invert())
		pinky1Right.applyQuaternion(handHelperRight.getWorldQuaternion().invert())
		thumb1Right.applyQuaternion(handHelperRight.getWorldQuaternion().invert())
	
		index2Right.rotation.x = findAngle(landmarks[5],landmarks[6],landmarks[7])
		index3Right.rotation.x = findAngle(landmarks[6],landmarks[7],landmarks[8])
	
		middle2Right.rotation.x = findAngle(landmarks[9],landmarks[10],landmarks[11])
		middle3Right.rotation.x = findAngle(landmarks[10],landmarks[11],landmarks[12])
	
		ring2Right.rotation.x = findAngle(landmarks[13],landmarks[14],landmarks[15])
		ring3Right.rotation.x = findAngle(landmarks[14],landmarks[15],landmarks[16])
	
		pinky2Right.rotation.x = findAngle(landmarks[17],landmarks[18],landmarks[19])
		pinky3Right.rotation.x = findAngle(landmarks[18],landmarks[19],landmarks[20])


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
	loader.load( 'hand.glb', function ( gltf ) {	

	hand = gltf.scene;
	scene.add(hand)

	hand.traverse(function(obj) { obj.frustumCulled = false; })

	all = hand.getObjectByName("Armature")
	main = hand.getObjectByName("hand")
	index1 = hand.getObjectByName("index1")
	index2 = hand.getObjectByName("index2")
	index3 = hand.getObjectByName("index3")
	middle1 = hand.getObjectByName("middle1")
	middle2 = hand.getObjectByName("middle2")
	middle3 = hand.getObjectByName("middle3")
	ring1 = hand.getObjectByName("ring1")
	ring2 = hand.getObjectByName("ring2")
	ring3 = hand.getObjectByName("ring3")
	pinky1 = hand.getObjectByName("pinky1")
	pinky2 = hand.getObjectByName("pinky2")
	pinky3 = hand.getObjectByName("pinky3")
	thumb1 = hand.getObjectByName("thumb1")
	thumb2 = hand.getObjectByName("thumb2")
	thumb3 = hand.getObjectByName("thumb3")

	const helper = new THREE.SkeletonHelper( hand );
	scene.add( helper );

	});


	loader.load( 'handRight.glb', function ( gltf ) {	

		handRight = gltf.scene;
		scene.add(handRight)
	
		handRight.traverse(function(obj) { obj.frustumCulled = false; })
	
		allRight = handRight.getObjectByName("Armature")
		mainRight = handRight.getObjectByName("hand")
		index1Right = handRight.getObjectByName("index1")
		index2Right = handRight.getObjectByName("index2")
		index3Right = handRight.getObjectByName("index3")
		middle1Right = handRight.getObjectByName("middle1")
		middle2Right = handRight.getObjectByName("middle2")
		middle3Right = handRight.getObjectByName("middle3")
		ring1Right = handRight.getObjectByName("ring1")
		ring2Right = handRight.getObjectByName("ring2")
		ring3Right = handRight.getObjectByName("ring3")
		pinky1Right = handRight.getObjectByName("pinky1")
		pinky2Right = handRight.getObjectByName("pinky2")
		pinky3Right = handRight.getObjectByName("pinky3")
		thumb1Right = handRight.getObjectByName("thumb1")
		thumb2Right = handRight.getObjectByName("thumb2")
		thumb3Right = handRight.getObjectByName("thumb3")

	
		const helper = new THREE.SkeletonHelper( handRight );
		scene.add( helper );
	
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

