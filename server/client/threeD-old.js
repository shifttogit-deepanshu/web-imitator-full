let camera, scene, renderer, leftArmLine, RightArmLine, bodyLine
let leftHandLine, leftHandIndexLine, leftHandMiddleLine,leftHandRingLine, leftHandPinkyLine, leftHandThumbLine
let leftHandRefVec1start, leftHandRefVec1end, leftHandRefVec2start, leftHandRefVec2end, leftHandRefVector1, leftHandRefVector2, leftHandRefAngle, leftHandRefCross
let rightHandLine, rightHandIndexLine, rightHandMiddleLine,rightHandRingLine, rightHandPinkyLine, rightHandThumbLine
let leftArmHelper, leftForeArmHelper, rightArmHelper, rightForeArmHelper
let model, leftShoulder, leftArm, leftForeArm, leftHand, rightShoulder, rightArm, rightForeArm, rightHand, leftHandIndex1, leftHandIndex2, leftHandIndex3, leftHandMiddle1,
leftHandMiddle2, leftHandMiddle3, leftHandRing1, leftHandRing2, leftHandRing3, leftHandPinky1, leftHandPinky2,
leftHandPinky3, leftHandThumb1, leftHandThumb2, leftHandThumb3, rightHandIndex1, rightHandIndex2, rightHandIndex3, rightHandMiddle1,
rightHandMiddle2, rightHandMiddle3, rightHandRing1, rightHandRing2, rightHandRing3, rightHandPinky1, rightHandPinky2,
rightHandPinky3, rightHandThumb1, rightHandThumb2, rightHandThumb3

let arrowHelperh, arrowHelperRef

let poseLeftHandVisibility,poseRightHandVisibility = 0

let handLandmarks, poseLandmarks = []

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

function drawHandLandmarks(type,landmarks){
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

// function drawRightHandLandmarks(type,landmarks){
//     if(rightHandLine){
//         scene.remove(leftHandLine)
//     }
// 	if(rightHandIndexLine){
//         scene.remove(leftHandIndexLine)
//     }
// 	if(rightHandMiddleLine){
//         scene.remove(leftHandMiddleLine)
//     }
// 	if(rightHandRingLine){
//         scene.remove(leftHandRingLine)
//     }
// 	if(rightHandPinkyLine){
//         scene.remove(leftHandPinkyLine)
//     }
// 	if(rightHandThumbLine){
//         scene.remove(leftHandThumbLine)
//     }
//     rightHandLine = drawLineHand(type,landmarks[0],landmarks[5],landmarks[9],landmarks[13],landmarks[17],landmarks[0])
// 	rightHandIndexLine = drawLineHand(type,landmarks[5],landmarks[6],landmarks[7],landmarks[8])
// 	leftHandMiddleLine = drawLineHand(type,landmarks[9],landmarks[10],landmarks[11],landmarks[12])
// 	leftHandRingLine = drawLineHand(type,landmarks[13],landmarks[14],landmarks[15],landmarks[16])
// 	leftHandPinkyLine = drawLineHand(type,landmarks[17],landmarks[18],landmarks[19],landmarks[20])
// 	leftHandThumbLine = drawLineHand(type,landmarks[0],landmarks[1],landmarks[2],landmarks[3],landmarks[4])
//     scene.add(leftHandLine)
// 	scene.add(leftHandIndexLine)
// 	scene.add(leftHandMiddleLine)
// 	scene.add(leftHandRingLine)
// 	scene.add(leftHandPinkyLine)
// 	scene.add(leftHandThumbLine)
// }

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


function drawArrowHelpers(landmarks){
	if(leftArmHelper){
		scene.remove(leftArmHelper)
	}
	if(leftForeArmHelper){
		scene.remove(leftForeArmHelper)
	}
	if(rightArmHelper){
		scene.remove(rightArmHelper)
	}
	if(rightForeArmHelper){
		scene.remove(rightForeArmHelper)
	}
	leftArmHelper =  drawArrowHelper(landmarks[12],landmarks[14])
	leftForeArmHelper =  drawArrowHelper(landmarks[14],landmarks[16])
	rightArmHelper =  drawArrowHelper(landmarks[11],landmarks[13])
	rightForeArmHelper =  drawArrowHelper(landmarks[13],landmarks[15])
	scene.add(leftArmHelper)
	scene.add(leftForeArmHelper)
	scene.add(rightArmHelper)
	scene.add(rightForeArmHelper)

}

function applyQuaternionToBone(point1,point2,parentBone,childBone,bool){	

	helper = drawArrowHelper(point1,point2)

	// if(bool)
	// 	{	
			
	// 		scene.remove(helper)
	// 		scene.add(helper)

	// 		let dirVector = new THREE.Vector3()
	// 		parentBone.getWorldDirection(dirVector)
	// 		arrowHelperh = new THREE.ArrowHelper(dirVector,new THREE.Vector3(0,0,0),0.3,"#ffffff")

	// 		scene.add(arrowHelperh)
	// 		console.log("difference between quaternions..........",helper.getWorldQuaternion().dot(parentBone.getWorldQuaternion()))
	// 	}

	if(childBone){
		childBone.applyQuaternion(helper.getWorldQuaternion().invert())
	}
	parentBone.applyQuaternion(helper.getWorldQuaternion())
}

function handlePoseLandmarks(landmarks){	

	if(model){
		leftShoulder.rotation.x = 0
		leftShoulder.rotation.y = 0
		leftShoulder.rotation.z = 0

		leftArm.rotation.x = 0
		leftArm.rotation.y = 0
		leftArm.rotation.z = 0
		

		
		leftForeArm.rotation.x = 0
		leftForeArm.rotation.y = 0
		leftForeArm.rotation.z = 0

		leftHand.rotation.x = 0
		leftHand.rotation.y = 0
		leftHand.rotation.z = 0

		leftHandThumb1.rotation.x = 0
		leftHandThumb1.rotation.y = 0
		leftHandThumb1.rotation.z = 0

		leftHandThumb2.rotation.x = 0
		leftHandThumb2.rotation.y = 0
		leftHandThumb2.rotation.z = 0

		leftHandThumb3.rotation.x = 0
		leftHandThumb3.rotation.y = 0
		leftHandThumb3.rotation.z = 0

		rightHandThumb1.rotation.x = 0
		rightHandThumb1.rotation.y = 0
		rightHandThumb1.rotation.z = 0

		rightHandThumb2.rotation.x = 0
		rightHandThumb2.rotation.y = 0
		rightHandThumb2.rotation.z = 0

		rightHandThumb3.rotation.x = 0
		rightHandThumb3.rotation.y = 0
		rightHandThumb3.rotation.z = 0
		

		rightShoulder.rotation.x = 0
		rightShoulder.rotation.y = 0
		rightShoulder.rotation.z = 0

		rightArm.rotation.x = 0
		rightArm.rotation.y = 0
		rightArm.rotation.z = 0

		
		rightForeArm.rotation.x = 0
		rightForeArm.rotation.y = 0
		rightForeArm.rotation.z = 0

		rightHand.rotation.x = 0
		rightHand.rotation.y = 0
		rightHand.rotation.z = 0
		
		poseLeftHandVisibility = landmarks[16].visibility
		poseRightHandVisibility = landmarks[15].visibility

		
	if(poseLandmarks.length>0){

		let distanceFromPrev = new THREE.Vector3(poseLandmarks[15].x,poseLandmarks[15].y,poseLandmarks[15].z).distanceTo(new THREE.Vector3(landmarks[15].x,landmarks[15].y,landmarks[15].z))
		if(distanceFromPrev>0.04){
			// console.log("now running...................................",distanceFromPrev)
		}
	}	 


		if(landmarks[16].visibility<0.4){
			applyQuaternionToBone(landmarks[12],landmarks[14],leftForeArm,leftHand)
		// 	leftForeArm.rotation.y = leftArm.rotation.y
			applyQuaternionToBone(landmarks[12],landmarks[14],leftHand)
			leftHand.rotation.y = 1.5

		}
		else{			
			applyQuaternionToBone(landmarks[14],landmarks[16],leftForeArm,leftHand)		
		}
		applyQuaternionToBone(landmarks[12],landmarks[14],leftArm,leftForeArm)
		applyQuaternionToBone({x:0,y:0,z:0},{x:-1,y:0,z:0},leftShoulder,leftArm)			
		

		if(landmarks[15].visibility<0.4){
			applyQuaternionToBone(landmarks[11],landmarks[13],rightForeArm,rightHand)
		// 	leftForeArm.rotation.y = leftArm.rotation.y
			applyQuaternionToBone(landmarks[11],landmarks[13],rightHand)
			rightHand.rotation.y = -1.5

		}
		else{
			
			applyQuaternionToBone(landmarks[13],landmarks[15],rightForeArm,rightHand)		
		}
		applyQuaternionToBone(landmarks[11],landmarks[13],rightArm,rightForeArm)
		applyQuaternionToBone({x:0,y:0,z:0},{x:1,y:0,z:0},rightShoulder,rightArm)

		poseLandmarks = landmarks
	}	
}

function handleHandLandmarks(type,landmarks){

	handLandmarks = landmarks

	if(model){
		if(type=="Right"){

			applyQuaternionToBone(landmarks[0],landmarks[9],rightHand)
			applyQuaternionToBone(landmarks[0],landmarks[1],rightHandThumb1)
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
			
			applyQuaternionToBone(landmarks[0],landmarks[9],leftHand)
			applyQuaternionToBone(landmarks[0],landmarks[1],leftHandThumb1)
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

	// if(arrowHelperRef){
	// 	scene.remove(arrowHelperRef)
	// }
	// arrowHelperRef = new THREE.ArrowHelper(resultant,new THREE.Vector3(-landmarks[0].x,-landmarks[0].y,-landmarks[0].z),0.3,"#ff0000")

	// scene.add(arrowHelperRef)

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

// const applyDirectionToBonePose = (data)=>{

// 	if(leftArm){
// 	leftShoulder.rotation.x = 0
// 	leftShoulder.rotation.y = 0
// 	leftShoulder.rotation.z = 0

// 	leftArm.rotation.x = 0
// 	leftArm.rotation.y = 0
// 	leftArm.rotation.z = 0

// 	leftForeArm.rotation.x = 0
// 	leftForeArm.rotation.y = 0
// 	leftForeArm.rotation.z = 0

// 	leftHand.rotation.x = 0
// 	leftHand.rotation.y = 0
// 	leftHand.rotation.z = 0	

// 	sphereForeArm.rotation.x = 0
// 	sphereForeArm.rotation.y = 0
// 	sphereForeArm.rotation.z = 0
	
	
// 	// moveBoneToQuaternion(data[14],data[16],leftHand)
// 	moveBoneToQuaternion(data[14],data[16],leftForeArm,leftHand)
// 	moveBoneToQuaternion(data[12],data[14],leftArm,leftForeArm)
// 	moveBoneToQuaternion({x:1,y:0,z:0},{x:0,y:0,z:0},leftShoulder,leftArm)
// 	moveBoneToQuaternion(data[14],data[16],sphereForeArm,)
// 	}
// 	else{
// 		return 
// 	}
	
// }

// const applyDirectionToBoneHands = (data)=>{

// 	scene.remove(arrowHelperRef)
// 	scene.remove(arrowHelperRef2)

// 	let v1 = new THREE.Vector3(-data[5].x,-data[5].y,data[5].z)

// 	let v2 = new THREE.Vector3(-data[17].x,-data[17].y,data[17].z)

// 	dirVector = new THREE.Vector3()

// 	dirVector.subVectors(v2,v1).normalize()

// 	refVector = new THREE.Vector3(dirVector.x,dirVector.y,0).normalize()

// 	arrowHelperRef = new THREE.ArrowHelper(dirVector,v1,length,hex)

// 	arrowHelperRef2 = new THREE.ArrowHelper(refVector,v1,length,"#100000")

// 	let angle = dirVector.angleTo(refVector)

// 	if(-data[5].x>=-data[17].x){
// 		angle = Math.PI/2 - angle
// 	}

// 	scene.add(arrowHelperRef)	
// 	scene.add(arrowHelperRef2)	


// 	if(leftArm){		
// 		moveBoneToQuaternion(data[0],data[9],leftHand,)
// 		leftHand.rotation.y = -angle*2
// 	}
// 	else{
// 		return 
// 	}
// }


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

		// loader.load( 'corrector.glb', function ( gltf ) {

		// 	sphereForeArm = gltf.scene;
		// 	scene.add(sphereForeArm)	
		// 	// console.log("sphere..........",sphere)
		// 	})
	

	model = gltf.scene;
    scene.add(model)

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


	

	// // console.log(leftHand)

    // const axesHelper = new THREE.AxesHelper( 100 );
    // // scene.add( axesHelper );

    // const axesHelper2 = new THREE.AxesHelper( 100);
	// // leftHandIndex1.add(axesHelper2)

	// const helper = new THREE.SkeletonHelper( model );
	// // scene.add( helper )	
	
	
	
	// leftArm.rotation.x = 0
	// leftArm.rotation.y = 0
	// leftArm.rotation.z = 0

	// leftForeArm.rotation.x = 0
	// leftForeArm.rotation.y = 0
	// leftForeArm.rotation.z = 0

	// leftShoulder.rotation.x = 0
	// leftShoulder.rotation.y = 0
	// leftShoulder.rotation.z = 0

	// leftHand.rotation.x = 0
	// leftHand.rotation.y = 0
	// leftHand.rotation.z = 0


	// sphereForeArm.rotation.x = 0
	// sphereForeArm.rotation.y = 0
	// sphereForeArm.rotation.z = 0

	// // const length = 2
	// // const hexShoulder = "#000000"
	// // const hexArm = "#100000"
	// // const hexForeArm = "#001010"

	// // //Aligning vector ForeArm //////////////////////////////////////////////////////////////////
	
	// // let startVectorForeArm = leftForeArm.getWorldPosition()
	// // let endVectorForeArm = new THREE.Vector3(1,0,0).normalize()

	// // // let dirVectorForeArm = new THREE.Vector3()

	// // // dirVectorShoulder.subVectors(endVector,startVector).normalize()	

	// // let arrowHelperForeArm = new THREE.ArrowHelper( endVectorForeArm, startVectorForeArm, length, hexForeArm )


	// // //Aligning vector Arm //////////////////////////////////////////////////////////////////
	// // let startVectorArm = leftArm.getWorldPosition()
	// // let endVectorArm = new THREE.Vector3(1,1,1).normalize()

	// // // let dirVectorArm = new THREE.Vector3()

	// // // dirVectorShoulder.subVectors(endVector,startVector).normalize()

	
	// // //Aligning vector Shoulder //////////////////////////////////////////////////////////////////

	// // let arrowHelperArm = new THREE.ArrowHelper( endVectorArm, startVectorArm, length, hexArm )

	// // let startVectorShoulder = leftShoulder.getWorldPosition()
	// // // const originArm = new THREE.Vector3( 0,0,0 );
	// // let endVectorShoulder = new THREE.Vector3(1,0,0).normalize();

	// // // let dirVectorShoulder = new THREE.Vector3()

	// // // dirVectorShoulder.subVectors(endVector,startVector).normalize()

	// // // const length = 2
	// // // const hexArm = 0xffff00


	// // let arrowHelperShoulder = new THREE.ArrowHelper( endVectorShoulder, startVectorShoulder, length, hexShoulder )

	// // leftForeArm.applyQuaternion(arrowHelperForeArm.getWorldQuaternion())	
	
	// // leftArm.applyQuaternion(arrowHelperArm.getWorldQuaternion())

	// // leftShoulder.applyQuaternion(arrowHelperShoulder.getWorldQuaternion())

	// // leftArm.applyQuaternion(arrowHelperShoulder.getWorldQuaternion().invert())

	// // leftForeArm.applyQuaternion(arrowHelperArm.getWorldQuaternion().invert())

	// // scene.add(arrowHelperArm)
	// // scene.add(arrowHelperShoulder)
	// // scene.add(arrowHelperForeArm)

	
	// const length = 2
	// const hex = "#000000"
	
	// // let startHand = leftHand.getWorldPosition()

	// // let endHand = new THREE.Vector3(0,0,1)

	// // let dirVectorHand = new THREE.Vector3()

	// // dirVectorHand.subVectors(endHand,startHand).normalize()	

	// // handAngle = dirVectorHand.angleTo(new THREE.Vector3(1,0,0))

	// // leftHand.rotateOnWorldAxis(new THREE.Vector3(0,1,0).normalize(),handAngle)

	// // // console.log((-handAngleY+(10*(Math.PI/180)))*(180/Math.PI) + "degree")

	// // // console.log(-handAngle)

	// // arrowHelperHand = new THREE.ArrowHelper( endHand, startHand, length, hex )

	// // scene.add(arrowHelperHand)

	// // leftHand.applyQuaternion(arrowHelperHand.getWorldQuaternion())
		
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



// const socket = io()

// socket.on("connect", () => {
// 	console.log("user connected....message from client")
// })



// function drawHands(data){
    
// 	if(hand){
//         scene.remove(hand)
//     }
//     if(index){
//         scene.remove(index)
//     }
//     if(middle){
//         scene.remove(middle)
//     }
//     if(ring){
//         scene.remove(ring)
//     }
//     if(pinky){
//         scene.remove(pinky)
//     }
// 	if(arrowHelperHandY){
// 		scene.remove(arrowHelperHandY)
// 	}
// 	if(arrowHelperHandRef){
// 		scene.remove(arrowHelperHandRef)
// 	}
// 	if(thumb){
// 		scene.remove(thumb)
// 	}
// 	if(arrowHelperIndexRef1){
// 		scene.remove(arrowHelperIndexRef1)
// 	}
// 	if(arrowHelperIndexRef2){
// 		scene.remove(arrowHelperIndexRef2)
// 	}

//     let pointsHandse = [];

//     pointsHandse.push( new THREE.Vector3( -data[0].x,-data[0].y,data[0].z ) );
//     pointsHandse.push( new THREE.Vector3( -data[5].x,-data[5].y,data[5].z ) );
//     pointsHandse.push( new THREE.Vector3( -data[9].x,-data[9].y,data[9].z ) );
//     pointsHandse.push( new THREE.Vector3( -data[13].x,-data[13].y,data[13].z ) );
//     pointsHandse.push( new THREE.Vector3( -data[17].x,-data[17].y,data[17].z ) );
//     pointsHandse.push( new THREE.Vector3( -data[0].x,-data[0].y,data[0].z ) );

//     let pointsIndexe = []
//     pointsIndexe.push( new THREE.Vector3( -data[5].x,-data[5].y,data[5].z ) );
//     pointsIndexe.push( new THREE.Vector3( -data[6].x,-data[6].y,data[6].z ) );
//     pointsIndexe.push( new THREE.Vector3( -data[7].x,-data[7].y,data[7].z ) );
//     pointsIndexe.push( new THREE.Vector3( -data[8].x,-data[8].y,data[8].z ) );

//     let pointsMiddlee = []
//     pointsMiddlee.push( new THREE.Vector3( -data[9].x,-data[9].y,data[9].z ) );
//     pointsMiddlee.push( new THREE.Vector3( -data[10].x,-data[10].y,data[10].z ) );
//     pointsMiddlee.push( new THREE.Vector3( -data[11].x,-data[11].y,data[11].z ) );
//     pointsMiddlee.push( new THREE.Vector3( -data[12].x,-data[12].y,data[12].z ) );
    
//     let pointsRinge = []
//     pointsRinge.push( new THREE.Vector3( -data[13].x,-data[13].y,data[13].z ) );
//     pointsRinge.push( new THREE.Vector3( -data[14].x,-data[14].y,data[14].z ) );
//     pointsRinge.push( new THREE.Vector3( -data[15].x,-data[15].y,data[15].z ) );
//     pointsRinge.push( new THREE.Vector3( -data[16].x,-data[16].y,data[16].z ) );

//     let pointsPinkye = []
//     pointsPinkye.push( new THREE.Vector3( -data[17].x,-data[17].y,data[17].z ) );
//     pointsPinkye.push( new THREE.Vector3( -data[18].x,-data[18].y,data[18].z ) );
//     pointsPinkye.push( new THREE.Vector3( -data[19].x,-data[19].y,data[19].z ) );
//     pointsPinkye.push( new THREE.Vector3( -data[20].x,-data[20].y,data[20].z ) );

// 	let pointsThumbe = []
//     pointsThumbe.push( new THREE.Vector3( -data[0].x,-data[0].y,data[0].z ) );
//     pointsThumbe.push( new THREE.Vector3( -data[1].x,-data[1].y,data[1].z ) );
//     pointsThumbe.push( new THREE.Vector3( -data[2].x,-data[2].y,data[2].z ) );
//     pointsThumbe.push( new THREE.Vector3( -data[3].x,-data[3].y,data[3].z ) );
// 	pointsThumbe.push( new THREE.Vector3( -data[4].x,-data[4].y,data[4].z ) );

//     let geometry1e = new THREE.BufferGeometry().setFromPoints( pointsHandse );
//     let geometry2e = new THREE.BufferGeometry().setFromPoints( pointsIndexe );
//     let geometry3e = new THREE.BufferGeometry().setFromPoints( pointsMiddlee );
//     let geometry4e = new THREE.BufferGeometry().setFromPoints( pointsRinge );
//     let geometry5e = new THREE.BufferGeometry().setFromPoints( pointsPinkye );
// 	let geometry6e = new THREE.BufferGeometry().setFromPoints( pointsThumbe );

//     hand = new THREE.Line( geometry1e, material );
//     index = new THREE.Line( geometry2e, material );
//     middle = new THREE.Line( geometry3e, material );	
//     ring = new THREE.Line( geometry4e, material );
//     pinky = new THREE.Line( geometry5e, material );	
// 	thumb = new THREE.Line(geometry6e, material);

//     scene.add( hand );
//     scene.add( index );
//     scene.add(middle);
//     scene.add( ring );
//     scene.add(pinky);
// 	scene.add(thumb);
// }






// function drawPose(data){
    
//     if(arm1){
//         scene.remove(arm1)
//     }
    
//     if(arm2){
//         scene.remove(arm2)
//     }
    
//     if(body){
//         scene.remove(body)
//     }
//     if(arrowHelperArmRef){
//         scene.remove(arrowHelperArmRef)
//     }
//     if(arrowHelperArm){
//         scene.remove(arrowHelperArm)
//     }
//     if(arrowHelperShoulder){
//         scene.remove(arrowHelperShoulder)
//     }
//     if(arrowHelperForeArmRef){
//         scene.remove(arrowHelperForeArmRef)
//     }

//     // console.log("data"+ data)
    
        
    
//         let pointsArm1 = [];
    
//         pointsArm1.push( new THREE.Vector3( -data[11].x,-data[11].y,-data[11].z ) );
//         pointsArm1.push( new THREE.Vector3( -data[13].x,-data[13].y,-data[13].z ) );
//         pointsArm1.push( new THREE.Vector3( -data[15].x,-data[15].y,-data[15].z ) );
//         pointsArm1.push( new THREE.Vector3( -data[17].x,-data[17].y,-data[17].z ) );
//         pointsArm1.push( new THREE.Vector3( -data[19].x,-data[19].y,-data[19].z ) );
//         pointsArm1.push( new THREE.Vector3( -data[15].x,-data[15].y,-data[15].z ) );
//         pointsArm1.push( new THREE.Vector3( -data[21].x,-data[21].y,-data[21].z ) );
    
//         let pointsArm2 = [];
    
//         pointsArm2.push( new THREE.Vector3( -data[12].x,-data[12].y,-data[12].z ) );
//         pointsArm2.push( new THREE.Vector3( -data[14].x,-data[14].y,-data[14].z ) );
//         pointsArm2.push( new THREE.Vector3( -data[16].x,-data[16].y,-data[16].z ) );
//         pointsArm2.push( new THREE.Vector3( -data[18].x,-data[18].y,-data[18].z ) );
//         pointsArm2.push( new THREE.Vector3( -data[20].x,-data[20].y,-data[20].z ) );
//         pointsArm2.push( new THREE.Vector3( -data[16].x,-data[16].y,-data[16].z ) );
//         pointsArm2.push( new THREE.Vector3( -data[22].x,-data[22].y,-data[22].z ) );
    
//         let bodyparts = []
    
//         bodyparts.push( new THREE.Vector3( -data[12].x,-data[12].y,-data[12].z ) );
//         bodyparts.push( new THREE.Vector3( -data[11].x,-data[11].y,-data[11].z ) );
//         bodyparts.push( new THREE.Vector3( -data[23].x,-data[23].y,-data[23].z ) );
//         bodyparts.push( new THREE.Vector3( -data[24].x,-data[24].y,-data[24].z ) );
//         bodyparts.push( new THREE.Vector3( -data[12].x,-data[12].y,-data[12].z ) );
    
//         let geometry1 = new THREE.BufferGeometry().setFromPoints( pointsArm1 );
//         let geometry2 = new THREE.BufferGeometry().setFromPoints( pointsArm2 );
//         let geometry3 = new THREE.BufferGeometry().setFromPoints( bodyparts );
    
//         arm1 = new THREE.Line( geometry1, material );
//         arm2 = new THREE.Line( geometry2, material );
//         body = new THREE.Line( geometry3, material );	
    
//         scene.add( arm1 );
//         scene.add( arm2 );
//         scene.add(body);
// }


// const moveBoneToQuaternion = (point1,point2,parent,child)=>{

// 	let startVector = new THREE.Vector3(point1.x,point1.y,point1.z)

// 	let endVector = new THREE.Vector3(point2.x,point2.y,point2.z)

// 	let directionVector = new THREE.Vector3()

// 	directionVector.subVectors(startVector,endVector).normalize()

// 	arrowHelper = new THREE.ArrowHelper( directionVector, startVector, length, hex )


// 	parent.applyQuaternion(arrowHelper.getWorldQuaternion())

// 	if(child){
// 		child.applyQuaternion(arrowHelper.getWorldQuaternion().invert())
// 	}
// }

function animate(time) {

	requestAnimationFrame( animate )

	// if(leftForeArm && sphereForeArm){
	// 	// sphereArm.position.x = leftForeArm.getWorldPosition().x
	// 	// sphereArm.position.y = leftForeArm.getWorldPosition().y
	// 	// sphereArm.position.z = leftForeArm.getWorldPosition().z

	// 	sphereForeArm.position.x = leftForeArm.getWorldPosition().x
	// 	sphereForeArm.position.y = leftForeArm.getWorldPosition().y
	// 	sphereForeArm.position.z = leftForeArm.getWorldPosition().z
	// }

	// leftHandIndex1.rotation.x = 1
	// leftHandIndex2.rotation.x = 1.5

	// leftHandIndex1.rotation.x += 0.05
	// leftHandThumb1.rotation.y += 0.05
	// leftHandThumb2.rotation.z = -1.5
	// leftHandThumb3.rotation.z = -1.
	// leftForeArm.rotation.y += 0.05
	

	renderer.render( scene, camera )
}

