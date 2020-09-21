var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engi

var createScene = function () {
    

    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0, 1, 1);

	//Adding a light
	//var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 1, 0), scene);

	// Add a camera to the scene and attach it to the canvas
	var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 10, -120), scene);
    camera.attachControl(canvas, true);
    
    var plane1 = BABYLON.Mesh.CreatePlane('plane1', 20, scene);
    plane1.position = new BABYLON.Vector3(0, 0, 0);

    var planOBB = BABYLON.Mesh.CreateBox("OBB", 20, scene);
    planOBB.scaling = new BABYLON.Vector3(1, 1, 0.05);
    planOBB.parent = plane1;

    var stone = BABYLON.SceneLoader.ImportMesh("", "../models/character/", "stone.gltf", scene, function (newMeshes) {
		character = newMeshes[0];
		camera.target = character;
		initializeAnimations();

		// var decalMaterial = new BABYLON.StandardMaterial("decalMat", scene);
		// var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 300, height: 15 }, scene);
		// ground.material = decalMaterial;
    });
    
    scene.registerBeforeRender(function() {
        if (stone.intersectsMesh(plane1, true)){
            stone.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        }else 
            stone.material.emissiveColor = new BABYLON.Color4(1, 1, 1);
    })


    
    return scene;
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
