canvas = document.getElementById("menuCanvas"); // Get the canvas element
engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function(){  

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-4, 0, -10), scene);
    
    camera.setTarget(BABYLON.Vector3.Zero());

    var background = new BABYLON.Layer("back", "../images/temp_menu_image.jpg", scene);
	background.isBackground = true;
	background.texture.level = 0;
	
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var UiPanel = new BABYLON.GUI.StackPanel();
    UiPanel.width = "220px";
    UiPanel.fontSize = "14px";
    UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(UiPanel);

    // creating the button for the Level 1 link
    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Tutorial");
    button1.paddingTop = "10px";
    button1.width = "100px";
    button1.height = "50px";
    button1.color = "white";
    button1.background = "gray";
    button1.onPointerDownObservable.add(()=> {
        //menuSelect.play(); // <-- The page changes too quickly to be able to hear the button click
        window.location.href = './level1.html';
    });
    UiPanel.addControl(button1);

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Level 1");
    button2.paddingTop = "10px";
    button2.width = "100px";
    button2.height = "50px";
    button2.color = "white";
    button2.background = "gray";
    button2.onPointerDownObservable.add(()=> {
        menuSelect.play(); // <-- The page changes too quickly to be able to hear the button click
        // window.location.href = './level1.html'; // TODO change reference to level 2, once completed
    });
    UiPanel.addControl(button2);

    var button3 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Settings");
    button3.paddingTop = "10px";
    button3.width = "100px";
    button3.height = "50px";
    button3.color = "white";
    button3.background = "gray";
    button3.onPointerDownObservable.add(()=> {
        menuSelect.play(); // <-- The page changes too quickly to be able to hear the button click
        // window.location.href = './level1.html'; // TODO change reference to level 2, once completed
    });
    UiPanel.addControl(button3);

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
