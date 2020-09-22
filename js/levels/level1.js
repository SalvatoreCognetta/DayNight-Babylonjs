var animating = true;

// Ground 
var groundPosition = new BABYLON.Vector3(0, 0, 0);
var groundWidth = 200;


// Platforms
var platforms = [];

// zPosition of the platforms
var zPosition = 5;

var platformDepth = 30;
var platformHeight = 2;
var platformWidthSmall = 5;
var platformWidthMedium = 20;
var platformWidthBig = 50;


canvas = document.getElementById("renderCanvas"); // Get the canvas element
engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine


/******* Create scene function ******/
var createScene = function () {
	// Create the scene space
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 1, 1);

	//Adding a light
	var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 1, 0), scene);

	// Add a camera to the scene and attach it to the canvas
	camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 10, -120), scene);
	camera.attachControl(canvas, true);


	// Enable physics
	// scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.AmmoJSPlugin());	

	// Enable collision
	enableCollision(scene, camera);

	// Add ground and walls to the scene
	createRoom();

	// // Add platforms to the scene
	// createPlatforms();

	// Add main character to the scene
	createHero(camera);

	return scene;
};
/******* End of the create scene function ******/



/**
 * Create the walls and ground of the room-level 
 */
var createRoom = function () {
	// Ground
	addPlatform(null, groundWidth, groundPosition, true, false);
	// Left wall
	addPlatform(null, platformWidthBig * 2, new BABYLON.Vector3(-(groundWidth - platformHeight) / 2, platformWidthBig, 0), false, true);
	// Right wall
	addPlatform(null, platformWidthBig * 2, new BABYLON.Vector3((groundWidth - platformHeight) / 2, platformWidthBig, 0), false, true);

	addPlatform(null, platformWidthMedium, new BABYLON.Vector3(2, 33, 0), false, false);
}


/**
 * Create the main character of the game
 * @camera camera of the scene
 * @position {BABYLON.Vector3} Vector that specifies the init position of the hero
 */
var createHero = function (camera, position = hero.startingPosition) {
	// The first parameter can be used to specify which mesh to import. Here we import all meshes
	BABYLON.SceneLoader.ImportMesh("", hero.path, hero.name, scene, function (newMeshes) {
		hero.mesh 		= newMeshes[0];
		camera.target 	= hero.mesh;

		hero.mesh.position.copyFrom(hero.startingPosition);
		// COLLISION DETECTION - Say that the mesh will be collisionable
		hero.mesh.ellipsoid = new BABYLON.Vector3(3, .1, 1);
		hero.mesh.checkCollisions = true;


		// Initialize the animations defined in animations.js file
		initializeHeroAnimations();

		// COLLISION DETECTION - Say that the mesh character will be collisionable
		hero.checkCollisions = true;


		hero.mesh.onCollide = function (collidedMesh) {
			if (collidedMesh.position.y < hero.mesh.position.y - 1) { 
				// Check if the character touch the ground underneat him
				hero.grounded = true;
			} else {
				hero.grounded = false;
			}
		}



		// const size = new BABYLON.Vector3(1, Math.cos(Math.PI / 3), Math.cos(Math.PI / 4));
		
		// var matBB = new BABYLON.StandardMaterial("matBB", scene);
		// matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
		// matBB.wireframe = true;

		// // AABB - Axis aligned bounding box
		// hero.AABBmesh = BABYLON.Mesh.CreateBox("AABB", hero.AABBdimension, scene);
		// hero.AABBmesh.material = matBB;
		// hero.AABBmesh.ellipsoid = new BABYLON.Vector3(hero.AABBdimension/2, hero.AABBdimension/2-1, 10);
		// hero.AABBmesh.position = hero.AABBposition; // new BABYLON.Vector3(0, (hero.AABBdimension+platformHeight)/2, 0);
		// // hero.AABBmesh.checkCollisions = true;
		// hero.AABBmesh.scaling = new BABYLON.Vector3(1, Math.cos(Math.PI / 6), 1);
		
		

		// // Add colliders
		// var collidersVisible = false;
		// var sphereCollider = BABYLON.Mesh.CreateSphere("sphere1", 16, 0.5, scene);
		// sphereCollider.position.y = 0.08;
		// sphereCollider.isVisible = collidersVisible;
		// var boxCollider = BABYLON.Mesh.CreateBox("box1", 0.3, scene);
		// boxCollider.position.y = -0.13;
		// boxCollider.position.z = -0.13;
		// boxCollider.isVisible = collidersVisible;

		// // Create a physics root and add all children
		// var physicsRoot = new BABYLON.Mesh("", scene);
		// physicsRoot.addChild(newMeshes[0]);
		// physicsRoot.addChild(boxCollider);
		// physicsRoot.addChild(sphereCollider);
		// physicsRoot.position.y+=3;

		// // Enable physics on colliders first then physics root of the mesh
		// boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
		// sphereCollider.physicsImpostor = new BABYLON.PhysicsImpostor(sphereCollider, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0 }, scene);
		// physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.NoImpostor, { mass: 3 }, scene);

		// // Orient the physics root
		// physicsRoot.rotation.x = Math.PI/5;
		// physicsRoot.rotation.z = Math.PI/6;
	});
}




var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
	if (hero.mesh != null) {
		// hero.moveWithCollisions(down);
		// m.moveWithCollisions(down);
		// if (!platforms[0].intersectsMesh(hero.AABBmesh, false)) {
			hero.mesh.moveWithCollisions(down);
		// }
	}
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});
