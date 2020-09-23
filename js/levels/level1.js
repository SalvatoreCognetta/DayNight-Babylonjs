var animating = true;
// Ground 
var groundPosition = new BABYLON.Vector3(0, 0, 0);
var groundWidth = 200;


// Platforms
var platforms = [];

// zPosition of the platforms
var zPosition = 5;

var platformDepth = 30;
var platformHeight = 5;
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
	document.getElementById("Button").onclick = function () { day = !day; };
	//Adding some ambient light
	var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	light.intensity = 0.5;
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
	createLamp();

	return scene;
};
/******* End of the create scene function ******/



/**
 * Create the walls and ground of the room-level 
 */
var createRoom = function () {
	// Ground
	var groundMaterial = new BABYLON.StandardMaterial("material", scene);
	var groundTexture = new BABYLON.Texture("../../images/ground.png", scene);
	groundMaterial.diffuseTexture = groundTexture;
	addPlatform(groundMaterial, groundWidth, groundPosition, objShow.ALWAYS, true, false);
	// Left wall
	addPlatform(null, platformWidthBig * 2, new BABYLON.Vector3(-(groundWidth - platformHeight) / 2, platformWidthBig + platformHeight/2, 0), objShow.ALWAYS, false, true);
	// Right wall
	addPlatform(null, platformWidthBig * 2, new BABYLON.Vector3((groundWidth - platformHeight) / 2, platformWidthBig + platformHeight/2, 0), objShow.ALWAYS, false, true);

	addPlatform(null, platformWidthMedium, new BABYLON.Vector3(2, 23, 0), objShow.NIGHT, false, false);
}


/**
 * Create the main character of the game
 * @camera camera of the scene
 * @position {BABYLON.Vector3} Vector that specifies the init position of the hero
 */
var createHero = function (camera, position = hero.startingPosition) {
	// The first parameter can be used to specify which mesh to import. Here we import all meshes
	BABYLON.SceneLoader.ImportMesh("", hero.path, hero.name, scene, function (newMeshes) {
		hero.mesh = newMeshes[0];
		camera.target = hero.mesh;

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

		var matBB = new BABYLON.StandardMaterial("matBB", scene);
		matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
		matBB.wireframe = true;
		if (!debug)
			matBB.alpha = 0;

		// AABB - Axis aligned bounding box
		hero.AABBmesh = BABYLON.Mesh.CreateBox("AABB", hero.AABBdimension, scene);
		hero.AABBmesh.material = matBB;
		hero.AABBmesh.ellipsoid = new BABYLON.Vector3(hero.AABBdimension / 2, hero.AABBdimension / 2 - 1, 10);
		hero.AABBmesh.position = hero.mesh.position.clone();
		hero.AABBmesh.scaling = new BABYLON.Vector3(1, Math.cos(Math.PI / 6), 1);


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


var createLamp = function () {
	BABYLON.SceneLoader.ImportMesh("", lantern.path, lantern.name, scene, function (newMeshes) {
		lantern.mesh = newMeshes[0];
		lantern.mesh.position.copyFrom(lantern.startingPosition);
		lantern.mesh.rotation = lantern.startingOrientation;
		lantern.mesh.scaling = lantern.scale;
		//camera.target 	= hero.mesh;
		
	})
	
}

var scene = createScene(); //Call the createScene function
var light1 = new BABYLON.DirectionalLight("DirectionalLight1", new BABYLON.Vector3(0, -1, 1), scene);
// Make certain surfaces glow
var gl = new BABYLON.GlowLayer("glow", scene);
		

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
	if (hero.mesh != null) {
		hero.AABBmesh.position.y = hero.mesh.position.y + hero.height / 2;
		hero.AABBmesh.position.x = hero.mesh.position.x + .8;
		hero.mesh.moveWithCollisions(down);
	}
	if (day){
		
			// During the day, the direct light is yellow
			light1.diffuse = new BABYLON.Color3(1, 1, 0);
			// No glow
			gl.intensity = 0;
			// light1.setEnabled(false);
			// Changing background colour
			scene.clearColor = new BABYLON.Color3(0.8, 0.8, 1);
			
	} else if (!day){
			
			
			// During the night, the direct light is blue
			light1.diffuse = new BABYLON.Color3(0.2, 0.2, 1);
			// Turn glow on for emissive objects
			gl.intensity = 3;
			// light1.setEnabled(false);
			// Changing the background colour when its night
			scene.clearColor = new BABYLON.Color3(0, 0, 0.2);	
	}	

	if (lightButtonClicked) {
		// Enable the platforms depending on day or night
		enablePlatforms(day);
		lightButtonClicked = false;
	}

});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});
