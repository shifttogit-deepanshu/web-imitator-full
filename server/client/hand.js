let camera, scene, renderer, mesh
let leftArmHelper, leftForeArmHelper, rightArmHelper, rightForeArmHelper, faceVector, faceVectorRef, headHelper, headHelper2
let model, leftShoulder, leftArm, leftForeArm, leftHand, rightShoulder, rightArm, rightForeArm, rightHand, leftHandIndex1, leftHandIndex2, leftHandIndex3, leftHandMiddle1,
leftHandMiddle2, leftHandMiddle3, leftHandRing1, leftHandRing2, leftHandRing3, leftHandPinky1, leftHandPinky2,
leftHandPinky3, leftHandThumb1, leftHandThumb2, leftHandThumb3, rightHandIndex1, rightHandIndex2, rightHandIndex3, rightHandMiddle1,
rightHandMiddle2, rightHandMiddle3, rightHandRing1, rightHandRing2, rightHandRing3, rightHandPinky1, rightHandPinky2, neck,head,
rightHandPinky3, rightHandThumb1, rightHandThumb2, rightHandThumb3, finger

let leftHandLine, leftHandIndexLine, leftHandMiddleLine,leftHandRingLine, leftHandPinkyLine, leftHandThumbLine
let rightHandLine, rightHandIndexLine, rightHandMiddleLine,rightHandRingLine, rightHandPinkyLine, rightHandThumbLine

let index,index1,index2,index3, index1Helper, index2Helper, index3Helper, x, skeletonHelper

let model2, middle, middle1, middle2, middle3

let handLandmarks, poseLandmarks = []

let isPosingPose, isPosingHand = false


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


function showHands(type,landmarks){
	if(!model){
		return  
	}
	
	indexScale = new THREE.Vector3(-landmarks[5].x,-landmarks[5].y,-landmarks[5].z).distanceTo(new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z))

	index.scale.set(indexScale*0.3,indexScale*0.3,indexScale*0.3)


	middleScale = new THREE.Vector3(-landmarks[9].x,-landmarks[9].y,-landmarks[9].z).distanceTo(new THREE.Vector3(-landmarks[10].x,-landmarks[10].y,-landmarks[10].z))

	middle.scale.set(middleScale*0.25,middleScale*0.25,middleScale*0.25)
	
	
	
	
	if(type=="Left"){
		index.position.set(-landmarks[5].x,-landmarks[5].y-0.01,-landmarks[5].z)
		middle.position.set(-landmarks[9].x,-landmarks[9].y-0.01,-landmarks[9].z)
		// model.position.x = -landmarks[7].x
		// model.position.y = -landmarks[7].y
		// model.position.z = -landmarks[7].z

		index1.rotation.x = 0
		index1.rotation.y = 0
		index1.rotation.z = 0

		index2.rotation.x = 0
		index2.rotation.y = 0
		index2.rotation.z = 0

		index3.rotation.x = 0
		index3.rotation.y = 0
		index3.rotation.z = 0

		middle1.rotation.x = 0
		middle1.rotation.y = 0
		middle1.rotation.z = 0

		middle2.rotation.x = 0
		middle2.rotation.y = 0
		middle2.rotation.z = 0

		middle3.rotation.x = 0
		middle3.rotation.y = 0
		middle3.rotation.z = 0


	
		let index1Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z),new THREE.Vector3(-landmarks[5].x,-landmarks[5].y,-landmarks[5].z))
		index1Helper = new THREE.ArrowHelper(index1Vector.normalize(),new THREE.Vector3(-landmarks[5].x,-landmarks[5].y,-landmarks[5].z),3,"#ff0000")
		index1.applyQuaternion(index1Helper.getWorldQuaternion())


	
		let index2Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z),new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z))
		index2Helper = new THREE.ArrowHelper(index2Vector.normalize(),new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z),3,"#ff0000")
		index2.applyQuaternion(index1Helper.getWorldQuaternion().invert().multiply(index2Helper.getWorldQuaternion()))

		
		
	
		let index3Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[8].x,-landmarks[8].y,-landmarks[8].z),new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z))
		index3Helper = new THREE.ArrowHelper(index3Vector.normalize(),new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z),3,"#ff0000")
		index3.applyQuaternion(index2Helper.getWorldQuaternion().invert().multiply(index3Helper.getWorldQuaternion()))
	

		
		
		
		
		
		let middle1Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[10].x,-landmarks[10].y,-landmarks[10].z),new THREE.Vector3(-landmarks[9].x,-landmarks[9].y,-landmarks[9].z))
		middle1Helper = new THREE.ArrowHelper(middle1Vector.normalize(),new THREE.Vector3(-landmarks[10].x,-landmarks[10].y,-landmarks[10].z),3,"#ff0000")
		middle1.applyQuaternion(middle1Helper.getWorldQuaternion())


	
		// let index2Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z),new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z))
		// index2Helper = new THREE.ArrowHelper(index2Vector.normalize(),new THREE.Vector3(-landmarks[6].x,-landmarks[6].y,-landmarks[6].z),3,"#ff0000")
		// index2.applyQuaternion(index1Helper.getWorldQuaternion().invert().multiply(index2Helper.getWorldQuaternion()))

		
		
	
		// let index3Vector = new THREE.Vector3().subVectors(new THREE.Vector3(-landmarks[8].x,-landmarks[8].y,-landmarks[8].z),new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z))
		// index3Helper = new THREE.ArrowHelper(index3Vector.normalize(),new THREE.Vector3(-landmarks[7].x,-landmarks[7].y,-landmarks[7].z),3,"#ff0000")
		// index3.applyQuaternion(index2Helper.getWorldQuaternion().invert().multiply(index3Helper.getWorldQuaternion()))
		
		
		
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

	model = gltf.scene;
    scene.add(model)

	model.traverse(function(obj) { obj.frustumCulled = false; })

	index =  model.getObjectByName("Armature")
	index1 = model.getObjectByName("index1")
	index2 = model.getObjectByName("index2")
	index3 = model.getObjectByName("index3")

	});

	loader.load( 'middle.glb', function ( gltf ) {	

	model2 = gltf.scene;
    scene.add(model2)

	model2.traverse(function(obj) { obj.frustumCulled = false; })

	middle =  model2.getObjectByName("Armature")
	middle1 = model2.getObjectByName("middle1")
	middle2 = model2.getObjectByName("middle2")
	middle3 = model2.getObjectByName("middle3")

	});

	// scene.add(mesh)

    // loader.load( 'hand.glb', function ( gltf2 ) {	

    //     model2 = gltf2.scene;
    //     scene.add(model2)
    //     console.log("model2..........................",model2)
    
    //     model2.traverse(function(obj) { obj.frustumCulled = false; })
    
    //     model2.position.set(new THREE.Vector3(1,0,0))
    //     // leftShoulder = model.getObjectByName( 'mixamorig8LeftShoulder' );
    //     // leftArm = model.getObjectByName( 'mixamorig8LeftArm' );
    //     // leftForeArm = model.getObjectByName( 'mixamorig8LeftForeArm' );
    //     // leftHand = model.getObjectByName( 'mixamorig8LeftHand' );
        
    //     // rightShoulder = model.getObjectByName( 'mixamorig8RightShoulder' );
    //     // rightArm = model.getObjectByName( 'mixamorig8RightArm' );
    //     // rightForeArm = model.getObjectByName( 'mixamorig8RightForeArm' );
    //     // rightHand = model.getObjectByName( 'mixamorig8RightHand' );
        
    //     // leftHandIndex1 = model.getObjectByName("mixamorig8LeftHandIndex1")
    //     // leftHandIndex2 = model.getObjectByName("mixamorig8LeftHandIndex2")
    //     // leftHandIndex3 = model.getObjectByName("mixamorig8LeftHandIndex3")
    
    //     // leftHandMiddle1 = model.getObjectByName("mixamorig8LeftHandMiddle1")
    //     // leftHandMiddle2 = model.getObjectByName("mixamorig8LeftHandMiddle2")
    //     // leftHandMiddle3 = model.getObjectByName("mixamorig8LeftHandMiddle3")
    
    //     // leftHandRing1 = model.getObjectByName("mixamorig8LeftHandRing1")
    //     // leftHandRing2 = model.getObjectByName("mixamorig8LeftHandRing2")
    //     // leftHandRing3 = model.getObjectByName("mixamorig8LeftHandRing3")
    
    //     // leftHandPinky1 = model.getObjectByName("mixamorig8LeftHandPinky1")
    //     // leftHandPinky2 = model.getObjectByName("mixamorig8LeftHandPinky2")
    //     // leftHandPinky3 = model.getObjectByName("mixamorig8LeftHandPinky3")
    
    //     // leftHandThumb1 = model.getObjectByName("mixamorig8LeftHandThumb1")
    //     // leftHandThumb2 = model.getObjectByName("mixamorig8LeftHandThumb2")
    //     // leftHandThumb3 = model.getObjectByName("mixamorig8LeftHandThumb3")
    
    
            
    //     // rightHandIndex1 = model.getObjectByName("mixamorig8RightHandIndex1")
    //     // rightHandIndex2 = model.getObjectByName("mixamorig8RightHandIndex2")
    //     // rightHandIndex3 = model.getObjectByName("mixamorig8RightHandIndex3")
    
    //     // rightHandMiddle1 = model.getObjectByName("mixamorig8RightHandMiddle1")
    //     // rightHandMiddle2 = model.getObjectByName("mixamorig8RightHandMiddle2")
    //     // rightHandMiddle3 = model.getObjectByName("mixamorig8RightHandMiddle3")
    
    //     // rightHandRing1 = model.getObjectByName("mixamorig8RightHandRing1")
    //     // rightHandRing2 = model.getObjectByName("mixamorig8RightHandRing2")
    //     // rightHandRing3 = model.getObjectByName("mixamorig8RightHandRing3")
    
    //     // rightHandPinky1 = model.getObjectByName("mixamorig8RightHandPinky1")
    //     // rightHandPinky2 = model.getObjectByName("mixamorig8RightHandPinky2")
    //     // rightHandPinky3 = model.getObjectByName("mixamorig8RightHandPinky3")
    
    //     // rightHandThumb1 = model.getObjectByName("mixamorig8RightHandThumb1")
    //     // rightHandThumb2 = model.getObjectByName("mixamorig8RightHandThumb2")
    //     // rightHandThumb3 = model.getObjectByName("mixamorig8RightHandThumb3")
    
    //     // neck = model.getObjectByName("mixamorig8Neck")
    //     // head = model.getObjectByName("mixamorig8Head")
    
    //     })


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

	if(model2){
		console.log(model2)
	}

	renderer.render( scene, camera )
}

