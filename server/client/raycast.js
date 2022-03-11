let camera, scene, renderer, model, raycaster, arrowHelper, rayDirVector, mesh
let k = 0


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
	loader.load( 'cube.glb', function ( gltf ) {	

	model = gltf.scene;
    scene.add(model)

    mesh = model.getObjectByName("Cube")

	model.traverse(function(obj) { obj.frustumCulled = false; })

    model.position.x = -1
    model.position.y = 0
    model.position.z = 0

	index1 = model.getObjectByName("Bone")

    rayDirVector = new THREE.Vector3().subVectors(new THREE.Vector3(0,0,0),new THREE.Vector3(-1,0,0)).normalize()

    if(arrowHelper){
        scene.remove(arrowHelper)
    }
    arrowHelper = new THREE.ArrowHelper(rayDirVector,new THREE.Vector3(0,0,0),3,"#ff0000")
    scene.add(arrowHelper)

    raycaster = new THREE.Raycaster(new THREE.Vector3(0,0,0), rayDirVector)

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

    if(model && raycaster && mesh){
        model.position.set(1+k,0,0)
        k+=0.01

        console.log(raycaster.intersectObject(mesh))
        // console.log(mesh)

    }

	renderer.render( scene, camera )
}

