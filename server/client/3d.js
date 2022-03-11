let camera, scene, renderer
let leftArmHelper, leftForeArmHelper, rightArmHelper, rightForeArmHelper, faceVector, faceVectorRef, headHelper, headHelper2
let model, leftShoulder, leftArm, leftForeArm, leftHand, rightShoulder, rightArm, rightForeArm, rightHand, leftHandIndex1, leftHandIndex2, leftHandIndex3, leftHandMiddle1,
leftHandMiddle2, leftHandMiddle3, leftHandRing1, leftHandRing2, leftHandRing3, leftHandPinky1, leftHandPinky2,
leftHandPinky3, leftHandThumb1, leftHandThumb2, leftHandThumb3, rightHandIndex1, rightHandIndex2, rightHandIndex3, rightHandMiddle1,
rightHandMiddle2, rightHandMiddle3, rightHandRing1, rightHandRing2, rightHandRing3, rightHandPinky1, rightHandPinky2, neck,head,
rightHandPinky3, rightHandThumb1, rightHandThumb2, rightHandThumb3


let handLandmarks, poseLandmarks = []

let isPosingPose, isPosingHand = false

const materialPose = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const materialRightHands = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const materialLeftHands = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
		
init();
animate();


function drawLinePose(...points){
    pointsArr = []
    points.forEach(point=>{
        pointsArr.push(new THREE.Vector3(-point.x,-point.y,-point.z))
    })
    let geometry = new THREE.BufferGeometry().setFromPoints( pointsArr );
    let line = new THREE.Line( geometry, materialPose );
    return line
}


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
		line = new THREE.Line( geometry, materialLeftHands );
	}
    return line
}

function drawPoseLandmarks(landmarks){
    if(leftArmLine){
        scene.remove(leftArmLine)
    }
    if(RightArmLine){
        scene.remove(RightArmLine)
    }
    if(bodyLine){
        scene.remove(bodyLine)
    }
    leftArmLine = drawLinePose(landmarks[11],landmarks[13],landmarks[15])
    RightArmLine = drawLinePose(landmarks[12],landmarks[14],landmarks[16])
    bodyLine = drawLinePose(landmarks[11],landmarks[12],landmarks[24],landmarks[23],landmarks[11])
    scene.add(leftArmLine)
    scene.add(RightArmLine)
    scene.add(bodyLine)

	
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

function applyQuaternionToHandBone(point1,point2,bone,parentBone){	

	helper = drawArrowHelper(point1,point2)

	bone.applyQuaternion(parentBone.getWorldQuaternion().invert().multiply(helper.getWorldQuaternion()))
}


function changePose(landmarks){

    leftArmHelper = drawArrowHelper(landmarks[12],landmarks[14])
    leftForeArmHelper = drawArrowHelper(landmarks[14],landmarks[16])
    rightArmHelper = drawArrowHelper(landmarks[11],landmarks[13])
    rightForeArmHelper = drawArrowHelper(landmarks[13],landmarks[15])
    leftShoulderHelper = drawArrowHelper({x:0,y:0,z:0},{x:-1,y:1,z:1})
    rightShoulderHelper = drawArrowHelper({x:0,y:0,z:0},{x:1,y:1,z:1})

    var coords = { x:0}; // Start at (0, 0)
	var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({ x:300000}, 100) // Move to (300, 200) in 1 second.
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	
	leftArm.quaternion.rotateTowards(leftShoulderHelper.getWorldQuaternion().invert().multiply(leftArmHelper.getWorldQuaternion()),coords.x*0.000001)
	
    if(landmarks[16].visibility>0.5){
        leftForeArm.quaternion.rotateTowards(leftArmHelper.getWorldQuaternion().invert().multiply(leftForeArmHelper.getWorldQuaternion()),coords.x*0.000001)
		
    }
    else if(landmarks[16].visibility<=0.5){
        leftForeArm.quaternion.rotateTowards(leftArmHelper.getWorldQuaternion().invert().multiply(leftArm.getWorldQuaternion()),coords.x*0.000001)
		leftHand.quaternion.rotateTowards(leftForeArmHelper.getWorldQuaternion().invert().multiply(leftForeArmHelper.getWorldQuaternion()),coords.x*0.000001)
		leftHand.rotation.y= 1.5
	}
    
	
    
    leftShoulder.quaternion.rotateTowards(leftShoulderHelper.getWorldQuaternion(),3)


    rightArm.quaternion.rotateTowards(rightShoulderHelper.getWorldQuaternion().invert().multiply(rightArmHelper.getWorldQuaternion()),coords.x*0.000001)
	
    if(landmarks[15].visibility>0.5){
        rightForeArm.quaternion.rotateTowards(rightArmHelper.getWorldQuaternion().invert().multiply(rightForeArmHelper.getWorldQuaternion()),coords.x*0.000001)
	}
    else if(landmarks[15].visibility<=0.5){
        rightForeArm.quaternion.rotateTowards(rightArmHelper.getWorldQuaternion().invert().multiply(rightArm.getWorldQuaternion()),coords.x*0.000001)
		rightHand.quaternion.rotateTowards(rightForeArmHelper.getWorldQuaternion().invert().multiply(rightForeArmHelper.getWorldQuaternion()),coords.x*0.000001)
		rightHand.rotation.y = -1.5
	}
    rightShoulder.quaternion.rotateTowards(rightShoulderHelper.getWorldQuaternion(),3)


	})
	.onComplete(()=>{
		isPerforming = false

	})
	.start(); // Start the tween immediately.		

}

function handlePoseLandmarks(landmarks){	
	console.log(landmarks[16].disanceTo(landmarks[16]))
	if(!isPosingPose && model){

		let angleXY = findAngle({x:landmarks[6].x,y:landmarks[6].y,z:0},{x:landmarks[3].x,y:landmarks[3].y,z:0},{x:landmarks[6].x,y:0,z:0})
		neck.rotation.z = (1.8 - angleXY)*0.9

		changePose(landmarks)
	}	
}

function handleHandLandmarks(type,landmarks){

	
	handLandmarks = landmarks

	if(model){
		if(type=="Right"){

			rightHand.rotation.x = 0
			rightHand.rotation.y = 0
			rightHand.rotation.z = 0

			rightHandThumb1.rotation.x = 0
			rightHandThumb1.rotation.y = 0
			rightHandThumb1.rotation.z = 0

			applyQuaternionToHandBone(landmarks[0],landmarks[9],rightHand,rightForeArm)
			// applyQuaternionToHandBone(landmarks[0],landmarks[1],rightHandThumb1,rightHand)

			rightHandIndex1.rotation.x = findAngle(landmarks[0],landmarks[5],landmarks[6])
			rightHandIndex2.rotation.x = findAngle(landmarks[5],landmarks[6],landmarks[7])
			rightHandIndex3.rotation.x = findAngle(landmarks[6],landmarks[7],landmarks[8])

			rightHandMiddle1.rotation.x = findAngle(landmarks[0],landmarks[9],landmarks[10])
			rightHandMiddle2.rotation.x = findAngle(landmarks[9],landmarks[10],landmarks[11])
			rightHandMiddle3.rotation.x = findAngle(landmarks[10],landmarks[11],landmarks[12])

			rightHandRing1.rotation.x = findAngle(landmarks[0],landmarks[13],landmarks[14])
			rightHandRing2.rotation.x = findAngle(landmarks[13],landmarks[14],landmarks[15])
			rightHandRing3.rotation.x = findAngle(landmarks[14],landmarks[15],landmarks[16])

			rightHandPinky1.rotation.x = findAngle(landmarks[0],landmarks[17],landmarks[18])
			rightHandPinky2.rotation.x = findAngle(landmarks[17],landmarks[18],landmarks[19])
			rightHandPinky3.rotation.x = findAngle(landmarks[18],landmarks[19],landmarks[20])

			rightHandThumb1.rotation.z = -1.6 + findAngle(landmarks[0],landmarks[1],landmarks[2])*3
			rightHandThumb2.rotation.z = -0.5 + findAngle(landmarks[1],landmarks[2],landmarks[3])*2
			rightHandThumb3.rotation.z = -0.5 + findAngle(landmarks[2],landmarks[3],landmarks[4])*2

			
			YRotationAngle = rotateHand(landmarks)
		    rightHand.rotation.y = -Math.PI+YRotationAngle
			
			
		}
		if(type=="Left"){

			leftHand.rotation.x = 0
			leftHand.rotation.y = 0
			leftHand.rotation.z = 0

			leftHandThumb1.rotation.x = 0
			leftHandThumb1.rotation.y = 0
			leftHandThumb1.rotation.z = 0
			
			applyQuaternionToHandBone(landmarks[0],landmarks[9],leftHand,leftForeArm)
			// applyQuaternionToHandBone(landmarks[0],landmarks[1],leftHandThumb1,leftHand)


			leftHandIndex1.rotation.x = findAngle(landmarks[0],landmarks[5],landmarks[6])
			leftHandIndex2.rotation.x = findAngle(landmarks[5],landmarks[6],landmarks[7])
			leftHandIndex3.rotation.x = findAngle(landmarks[6],landmarks[7],landmarks[8])

			leftHandMiddle1.rotation.x = findAngle(landmarks[0],landmarks[9],landmarks[10])
			leftHandMiddle2.rotation.x = findAngle(landmarks[9],landmarks[10],landmarks[11])
			leftHandMiddle3.rotation.x = findAngle(landmarks[10],landmarks[11],landmarks[12])

			leftHandRing1.rotation.x = findAngle(landmarks[0],landmarks[13],landmarks[14])
			leftHandRing2.rotation.x = findAngle(landmarks[13],landmarks[14],landmarks[15])
			leftHandRing3.rotation.x = findAngle(landmarks[14],landmarks[15],landmarks[16])

			leftHandPinky1.rotation.x = findAngle(landmarks[0],landmarks[17],landmarks[18])
			leftHandPinky2.rotation.x = findAngle(landmarks[17],landmarks[18],landmarks[19])
			leftHandPinky3.rotation.x = findAngle(landmarks[18],landmarks[19],landmarks[20])

			leftHandThumb1.rotation.z = 1-findAngle(landmarks[0],landmarks[1],landmarks[2])*2
			leftHandThumb2.rotation.z = 0.7-findAngle(landmarks[1],landmarks[2],landmarks[3])*2
			leftHandThumb3.rotation.z = 0.7-findAngle(landmarks[2],landmarks[3],landmarks[4])*2

			

			// let vec1 = new THREE.Vector3(landmarks[5].x,landmarks[5].y,landmarks[5].z)
			// let vecRef = new THREE.Vector3(landmarks[0].x,landmarks[0].y,landmarks[0].z)
			// let vec2 = new THREE.Vector3(landmarks[17].x,landmarks[17].y,landmarks[17].z)

			// let refVect1 = new THREE.Vector3().subVectors(vec1,vecRef).normalize()
			// let refVect2 = new THREE.Vector3().subVectors(vec2,vecRef).normalize()

			// let resultant = refVect1.cross(refVect2)

			// let finalAngle = resultant.angleTo(new THREE.Vector3(0,0,1).normalize())

			// if(arrowHelperRef){
			// 	scene.remove(arrowHelperRef)
			// }
			// arrowHelperRef = new THREE.ArrowHelper(resultant,new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z),0.3,"#ff0000")

			// scene.add(arrowHelperRef)
	
			// leftHand.rotation.y = (-Math.PI+finalAngle)*(1.05)

			YRotationAngle = rotateHand(landmarks)

			leftHand.rotation.y = YRotationAngle

		}

		// leftHand.rotation.y = 0

		// if(ah){
		// 	scene.remove(ah)
		// }
		// ah = drawArrowHelper(type,landmarks[0],landmarks[9])
		// scene.add(ah)
	}	
}




function rotateHand(handLandmarks){		

	let vec1 = new THREE.Vector3(handLandmarks[5].x,handLandmarks[5].y,handLandmarks[5].z)
	let vecRef = new THREE.Vector3(handLandmarks[0].x,handLandmarks[0].y,handLandmarks[0].z)
	let vec2 = new THREE.Vector3(handLandmarks[17].x,handLandmarks[17].y,handLandmarks[17].z)

	let refVect1 = new THREE.Vector3().subVectors(vec1,vecRef).normalize()
	let refVect2 = new THREE.Vector3().subVectors(vec2,vecRef).normalize()

	let resultant = refVect1.cross(refVect2)

	let finalAngle = resultant.angleTo(new THREE.Vector3(0,0,1).normalize())

	return (-Math.PI+finalAngle)*(1.05)
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


function init() {

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.set(-0.2,0.2,0.5)
	
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

	const loader = new THREE.GLTFLoader();
	loader.load( 'lousie.glb', function ( gltf ) {	

	model = gltf.scene;
    scene.add(model)
	console.log(model)

	model.traverse(function(obj) { obj.frustumCulled = false; });

	

	leftShoulder = model.getObjectByName( 'mixamorig8LeftShoulder' );
	leftArm = model.getObjectByName( 'mixamorig8LeftArm' );
	leftForeArm = model.getObjectByName( 'mixamorig8LeftForeArm' );
    leftHand = model.getObjectByName( 'mixamorig8LeftHand' );
	
	rightShoulder = model.getObjectByName( 'mixamorig8RightShoulder' );
	rightArm = model.getObjectByName( 'mixamorig8RightArm' );
	rightForeArm = model.getObjectByName( 'mixamorig8RightForeArm' );
    rightHand = model.getObjectByName( 'mixamorig8RightHand' );
	
	leftHandIndex1 = model.getObjectByName("mixamorig8LeftHandIndex1")
	leftHandIndex2 = model.getObjectByName("mixamorig8LeftHandIndex2")
	leftHandIndex3 = model.getObjectByName("mixamorig8LeftHandIndex3")

	leftHandMiddle1 = model.getObjectByName("mixamorig8LeftHandMiddle1")
	leftHandMiddle2 = model.getObjectByName("mixamorig8LeftHandMiddle2")
	leftHandMiddle3 = model.getObjectByName("mixamorig8LeftHandMiddle3")

	leftHandRing1 = model.getObjectByName("mixamorig8LeftHandRing1")
	leftHandRing2 = model.getObjectByName("mixamorig8LeftHandRing2")
	leftHandRing3 = model.getObjectByName("mixamorig8LeftHandRing3")

	leftHandPinky1 = model.getObjectByName("mixamorig8LeftHandPinky1")
	leftHandPinky2 = model.getObjectByName("mixamorig8LeftHandPinky2")
	leftHandPinky3 = model.getObjectByName("mixamorig8LeftHandPinky3")

	leftHandThumb1 = model.getObjectByName("mixamorig8LeftHandThumb1")
	leftHandThumb2 = model.getObjectByName("mixamorig8LeftHandThumb2")
	leftHandThumb3 = model.getObjectByName("mixamorig8LeftHandThumb3")


		
	rightHandIndex1 = model.getObjectByName("mixamorig8RightHandIndex1")
	rightHandIndex2 = model.getObjectByName("mixamorig8RightHandIndex2")
	rightHandIndex3 = model.getObjectByName("mixamorig8RightHandIndex3")

	rightHandMiddle1 = model.getObjectByName("mixamorig8RightHandMiddle1")
	rightHandMiddle2 = model.getObjectByName("mixamorig8RightHandMiddle2")
	rightHandMiddle3 = model.getObjectByName("mixamorig8RightHandMiddle3")

	rightHandRing1 = model.getObjectByName("mixamorig8RightHandRing1")
	rightHandRing2 = model.getObjectByName("mixamorig8RightHandRing2")
	rightHandRing3 = model.getObjectByName("mixamorig8RightHandRing3")

	rightHandPinky1 = model.getObjectByName("mixamorig8RightHandPinky1")
	rightHandPinky2 = model.getObjectByName("mixamorig8RightHandPinky2")
	rightHandPinky3 = model.getObjectByName("mixamorig8RightHandPinky3")

	rightHandThumb1 = model.getObjectByName("mixamorig8RightHandThumb1")
	rightHandThumb2 = model.getObjectByName("mixamorig8RightHandThumb2")
	rightHandThumb3 = model.getObjectByName("mixamorig8RightHandThumb3")

	neck = model.getObjectByName("mixamorig8Neck")
	head = model.getObjectByName("mixamorig8Head")

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

    TWEEN.update(time)

	renderer.render( scene, camera )
}

