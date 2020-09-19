// Player
var character = null;

var animating = true;

// Ground 
var groundPosition 	= new BABYLON.Vector3(0, -0.9, 0);
var groundWidth 	= 200; 


// Platforms
var platforms = [];

// zPosition of the platforms
var zPosition = 5;

var platformDepth 	= 30;
var platformHeight 	= 2;
var platformWidthSmall 	= 5;
var platformWidthMedium = 20;
var platformWidthBig 	= 50;


var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {
	// Create the scene space
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 1, 1);

	//Adding a light
	var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 1, 0), scene);

	// Add a camera to the scene and attach it to the canvas
	var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 10, -120), scene);
	camera.attachControl(canvas, true);

	// Add ground and walls to the scene
	createRoom();

	// Add main character to the scene
	createMainCharacter(camera);
	
	return scene;
};
/******* End of the create scene function ******/



/**
 * Create the walls and ground of the room-level 
 */
var createRoom = function() {	
	// Ground
    addPlatform(null, groundWidth, groundPosition, false);
	// Left wall
	addPlatform(null, platformWidthBig*2, new BABYLON.Vector3(-(groundWidth-platformHeight)/2, platformWidthBig, 0), true);
	// Right wall
	addPlatform(null, platformWidthBig*2, new BABYLON.Vector3((groundWidth-platformHeight)/2, platformWidthBig, 0), true);
}

/**
 * Create the main character of the game
 * @camera camera of the scene
 */
var createMainCharacter = function(camera) {
	// The first parameter can be used to specify which mesh to import. Here we import all meshes
	BABYLON.SceneLoader.ImportMesh("", "../models/character/", "stone.gltf", scene, function (newMeshes) {
		character = newMeshes[0];
		camera.target = character;

		// var decalMaterial = new BABYLON.StandardMaterial("decalMat", scene);
		// var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 300, height: 15 }, scene);
		// ground.material = decalMaterial;
	});
}


/**
 * Add platform to the scene with specified material, width and position
 * @param {BABYLON.MultiMaterial} material - Material to apply to the platform
 * @param {number} platformWidth - platformWidthSmall, platformWidthMedium or platformWidthBig
 * @param {boolean} [rotate = false] - if true rotate the platform by 90 degrees
 */
function addPlatform(material, platformWidth, position, rotate=false) {
    var mesh = BABYLON.MeshBuilder.CreateBox('mesh', {width: platformWidth, height: platformHeight, depth: platformDepth}, scene);
    mesh.position = position;
	if(rotate) 
		mesh.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    mesh.checkCollisions = true;
	
	// mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, position);

	// mesh.material = material;
	
    // mesh.subMeshes = [];
    // var verticesCount = mesh.getTotalVertices();
    // new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, mesh);
    // new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, mesh);
    // new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, mesh);
    // new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, mesh);
    // new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, mesh);
	// new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, mesh);
	//TODO Add more vertices

    platforms.push(mesh);
}




var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});
