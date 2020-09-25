// Ground 
var groundPosition = new BABYLON.Vector3(0, 0, 0);
var groundDimension = new BABYLON.Vector3(300, 5, 30);
var wallDimension = new BABYLON.Vector3(5, 300, 30);

// Platforms
var platformDimensionSmall = new BABYLON.Vector3(platformWidthSmall, platformHeight, platformDepth);
var platformDimensionBig = new BABYLON.Vector3(platformWidthBig, platformHeight, platformDepth);

var goalPosition = new BABYLON.Vector3(-60, 120, 0);

var lampPosition = new BABYLON.Vector3(0, 60, 8);


canvas = document.getElementById("renderCanvas"); // Get the canvas element
engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine


/******* Create scene function ******/
var createScene = function () {
    engine.displayLoadingUI();
    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 1, 1);

    //Adding some ambient light
    var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    light.intensity = 0.5;

    lightNight = new BABYLON.DirectionalLight("DirectionalLightNight", new BABYLON.Vector3(0, -1, 1), scene);

    // Add a camera to the scene and attach it to the canvas
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 10, -120), scene);
    // camera.attachControl(canvas, true);

    // Enable collision
    enableCollision(scene, camera);

    // Creates all the animation groups
    initializeGroupsAnimation();

    // Create Menu buttons
    createGameUI();

    // Create sounds
    createSounds(scene);

    // Add ground and walls to the scene
    createRoom(groundDimension, wallDimension);

    // Add platforms to the scene
    createPlatforms();

    // Add main character to the scene
    var startHeroPos = hero.startingPosition.clone();
    startHeroPos.x = -startHeroPos.x - 30;
    createHero(camera, startHeroPos, goalPosition, 1);

    // Add lamp to the scene
    createLamp(lampPosition);

    // Enable physics
    scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.AmmoJSPlugin());

    return scene;
};
/******* End of the create scene function ******/

/**
 * Creates the platforms of the scene
 */
var createPlatforms = function () {
    // Always display platform texture
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    var groundTexture = new BABYLON.Texture("../../images/ground.png", scene);
    groundMaterial.diffuseTexture = groundTexture;
    var platformPosition = lampPosition.clone();
    platformPosition.z = 0;
    addPlatform(groundMaterial, platformDimensionSmall, platformPosition, objShow.ALWAYS);
    addPlatform(groundMaterial, platformDimensionSmall, new BABYLON.Vector3(-80, 60, 0), objShow.ALWAYS);
    addPlatform(groundMaterial, platformDimensionSmall, new BABYLON.Vector3(0, 20, 0), objShow.ALWAYS);
    addPlatform(groundMaterial, platformDimensionBig, goalPosition, objShow.ALWAYS, true);
    addPlatform(groundMaterial, platformDimensionBig, new BABYLON.Vector3(30, 120, 0), objShow.ALWAYS, false);
    
    // Day platform texture
    var platformMaterialDay = new BABYLON.StandardMaterial("platformMaterialDay", scene);
    var platformTextureDay = new BABYLON.Texture("../../images/PlatformDay.jpg", scene);
    platformMaterialDay.diffuseTexture = platformTextureDay;
	platformMaterialDay.diffuseColor = new BABYLON.Color3(1, 0, 1);
	platformMaterialDay.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
	platformMaterialDay.emissiveColor = new BABYLON.Color3(1, 1, 1);
	platformMaterialDay.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    // Day Platforms
    addPlatform(platformMaterialDay, platformDimensionSmall, new BABYLON.Vector3(-50, 40, platformDepth), objShow.DAY);
    addPlatform(platformMaterialDay, platformDimensionSmall, new BABYLON.Vector3(40, 80, 0), objShow.DAY);
    addPlatform(platformMaterialDay, platformDimensionSmall, new BABYLON.Vector3(80, 100, 0), objShow.DAY);
    
    // Night platform texture
    var platformMaterialNight = new BABYLON.StandardMaterial("platformMaterialNight", scene);
    var platformTextureNight = new BABYLON.Texture("../../images/PlatformClose.jpg", scene);
    platformMaterialNight.diffuseTexture = platformTextureNight;
	platformMaterialNight.diffuseColor = new BABYLON.Color3(0.8, 0, 0.7);
	platformMaterialNight.specularColor = new BABYLON.Color3(1, 1, 1);
	platformMaterialNight.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // Night Platforms
    addPlatform(platformMaterialNight, platformDimensionSmall, new BABYLON.Vector3(40, 40, 0), objShow.NIGHT);
    addPlatform(platformMaterialNight, platformDimensionSmall, new BABYLON.Vector3(-10, 120, 0), objShow.NIGHT);


}


var scene = createScene(); //Call the createScene function

// Make certain surfaces glow
var gl = new BABYLON.GlowLayer("glow", scene);


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
    if (hero.mesh != null && lantern.mesh != null && flagGoal.mesh != null && !backgroundMusic.isPlaying) {
        engine.hideLoadingUI();
        backgroundMusic.play();
    }

    if (hero.mesh != null) {
        hero.AABBmesh.position.y = hero.mesh.position.y + hero.height / 2;
        hero.AABBmesh.position.x = hero.mesh.position.x + .8;
        hero.mesh.moveWithCollisions(down);
    }
    if (day) {
        // During the day, the direct light is yellow
        lightNight.diffuse = new BABYLON.Color3(0.8, 0.8, 0);
        lightNight.intensity = 0.5;
        // No glow
        gl.intensity = 0;
        // Changing background colour
        scene.clearColor = new BABYLON.Color3(0.8, 0.8, 1);
    } else if (!day) {
        // During the night, the direct light is blue
        lightNight.diffuse = new BABYLON.Color3(0.2, 0.2, 1);
        lightNight.intensity = 1;
        // Turn glow on for emissive objects
        gl.intensity = 3;
        // Changing the background colour when its night
        scene.clearColor = new BABYLON.Color3(0, 0, 0.2);
    }

    if (lightButtonClicked) {
        // Enable the platforms depending on day or night
        enablePlatforms(day);
        changeSkybox(day);
        lightButtonClicked = false;
    }
	checkGoal();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
