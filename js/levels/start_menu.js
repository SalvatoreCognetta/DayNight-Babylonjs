canvas = document.getElementById("menuCanvas"); // Get the canvas element
engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function(){  

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-4, 0, -10), scene);
    
    camera.setTarget(BABYLON.Vector3.Zero());

    var background = new BABYLON.Layer("back", "../images/temp_menu_image.jpg", scene);
	background.isBackground = true;
    background.texture.level = 0;
    
    createStartMenuUI();

    createMenuSounds(scene);

    return scene;
}

var scene = createScene();

engine.runRenderLoop(function () {
	scene.render();
	
});

window.addEventListener("resize", function () {
	engine.resize();
});
