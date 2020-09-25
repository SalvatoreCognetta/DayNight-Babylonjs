/*****************************************************GUI UTILITY FUNCTION*****************************************************/
var createGameUI = function () {
	// UI
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
	var UiPanel = new BABYLON.GUI.StackPanel();
	UiPanel.width = "220px";
	UiPanel.fontSize = "14px";
	UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	advancedTexture.addControl(UiPanel);

	var menuBtn = BABYLON.GUI.Button.CreateSimpleButton("menuBtn", "Menu");
	menuBtn.paddingTop = "10px";
	menuBtn.width = "100px";
	menuBtn.height = "50px";
	menuBtn.color = "white";
	menuBtn.background = "grey";
	menuBtn.onPointerDownObservable.add(() => {
		menuSelect.play();
		hero.pause = true;
		if (gameMenu == null)
			createGameMenuUI();
	});
	UiPanel.addControl(menuBtn);
}

var createGameMenuUI = function () {
	// UI
	gameMenu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("TutorialUI");
	var UiPanel = new BABYLON.GUI.StackPanel();
	UiPanel.width = "200px";
	UiPanel.height = "400px";
	UiPanel.fontSize = "14px";
	UiPanel.background = "#8c8c8c";
	UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
	gameMenu.addControl(UiPanel);

	var textBlock = new BABYLON.GUI.TextBlock();
	textBlock.paddingTop = "5px";
	textBlock.text = "Menu";
	textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	textBlock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	textBlock.color = "white";
	UiPanel.addControl(textBlock);

	var resumeBtn = BABYLON.GUI.Button.CreateSimpleButton("resumeBtn", "Resume");
	resumeBtn.paddingTop = "30px";
	resumeBtn.width = "100px";
	resumeBtn.height = "80px";
	resumeBtn.color = "white";
	resumeBtn.background = "#8c8c8c";
	resumeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	resumeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	resumeBtn.onPointerDownObservable.add(() => {
		menuSelect.play();
		gameMenu.dispose();
		gameMenu = null;
		hero.pause = false;
	});
	UiPanel.addControl(resumeBtn);

	var mainMenu = BABYLON.GUI.Button.CreateSimpleButton("mainMenu", "Exit to Main Menu");
	mainMenu.paddingTop = "30px";
	mainMenu.width = "100px";
	mainMenu.height = "80px";
	mainMenu.color = "white";
	mainMenu.background = "#8c8c8c";
	mainMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	mainMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	mainMenu.onPointerDownObservable.add(() => {
		menuSelect.play();
		window.location.replace("../../html/start_menu.html");
	});
	UiPanel.addControl(mainMenu);

	var controls = BABYLON.GUI.Button.CreateSimpleButton("controls", "Controls");
	controls.paddingTop = "30px";
	controls.width = "100px";
	controls.height = "80px";
	controls.color = "white";
	controls.background = "#8c8c8c";
	controls.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	controls.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	controls.onPointerDownObservable.add(() => {
		menuSelect.play();
		createControlsUI();
	});
	UiPanel.addControl(controls);


	var headerBackground = new BABYLON.GUI.TextBlock();
	headerBackground.text = "Music volume: " + parseInt(backgroundVolume * 100) + "%";
	headerBackground.height = "40px";
	headerBackground.color = "white";
	headerBackground.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	headerBackground.paddingTop = "10px";
	UiPanel.addControl(headerBackground);

	var sliderBackground = new BABYLON.GUI.Slider();
	sliderBackground.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	sliderBackground.minimum = 0;
	sliderBackground.maximum = 1;
	sliderBackground.color = "#cccccc";
	sliderBackground.value = backgroundVolume;
	sliderBackground.height = "20px";
	sliderBackground.width = "205px";
	UiPanel.addControl(sliderBackground);
	sliderBackground.onValueChangedObservable.add((value) => {
		headerBackground.text = "Music volume: " + parseInt(backgroundVolume * 100) + "%";
		backgroundVolume = value;
		setVolume();
	});

	var headerEffect = new BABYLON.GUI.TextBlock();
	headerEffect.text = "Sound effect volume: " + parseInt(soundEffectVolume * 100) + "%";
	headerEffect.height = "40px";
	headerEffect.color = "white";
	headerEffect.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	headerEffect.paddingTop = "10px";
	UiPanel.addControl(headerEffect);

	var sliderEffect = new BABYLON.GUI.Slider();
	sliderEffect.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	sliderEffect.minimum = 0;
	sliderEffect.maximum = 1;
	sliderEffect.color = "#cccccc";
	sliderEffect.value = soundEffectVolume;
	sliderEffect.height = "20px";
	sliderEffect.width = "205px";
	UiPanel.addControl(sliderEffect);
	sliderEffect.onValueChangedObservable.add((value) => {
		headerEffect.text = "Sound effect volume: " + parseInt(soundEffectVolume * 100) + "%";
		soundEffectVolume = value;
		setVolume();
	});
}

var createNextLevelUI = function () {
	// UI
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
	var UiPanel = new BABYLON.GUI.StackPanel();
	UiPanel.width = "220px";
	UiPanel.fontSize = "14px";
	UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
	advancedTexture.addControl(UiPanel);

	var menuBtn = BABYLON.GUI.Button.CreateSimpleButton("menuBtn", "Next Level");
	menuBtn.paddingTop = "10px";
	menuBtn.width = "100px";
	menuBtn.height = "50px";
	menuBtn.color = "white";
	menuBtn.background = "grey";
	menuBtn.onPointerDownObservable.add(() => {
		menuSelect.play();
		switch (hero.level) {
			case 0:
				window.location.replace("../../html/level1.html");
				break;

			case 1:
				window.location.replace("../../html/level2.html");
				break;

			default:
				break;
		}
	});
	UiPanel.addControl(menuBtn);
}

var createSettingsUI = function () {
	// UI
	settingsTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("TutorialUI");
	var UiPanel = new BABYLON.GUI.StackPanel();
	UiPanel.width = "200px";
	UiPanel.height = "230px";
	UiPanel.fontSize = "14px";
	UiPanel.background = "#8c8c8c";
	UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
	settingsTexture.addControl(UiPanel);

	var textBlock = new BABYLON.GUI.TextBlock();
	textBlock.paddingTop = "5px";
	textBlock.text = "Settings";
	textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	textBlock.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	textBlock.color = "white";
	UiPanel.addControl(textBlock);

	var backBtn = BABYLON.GUI.Button.CreateSimpleButton("backBtn", "Back");
	backBtn.paddingTop = "30px";
	backBtn.width = "100px";
	backBtn.height = "80px";
	backBtn.color = "white";
	backBtn.background = "#8c8c8c";
	backBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	backBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	backBtn.onPointerDownObservable.add(() => {
		menuSelect.play();
		settingsTexture.dispose();
		createStartMenuUI();
	});
	UiPanel.addControl(backBtn);

	var headerBackground = new BABYLON.GUI.TextBlock();
	headerBackground.text = "Music volume: " + parseInt(backgroundVolume * 100) + "%";
	headerBackground.height = "40px";
	headerBackground.color = "white";
	headerBackground.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	headerBackground.paddingTop = "10px";
	UiPanel.addControl(headerBackground);

	var sliderBackground = new BABYLON.GUI.Slider();
	sliderBackground.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	sliderBackground.minimum = 0;
	sliderBackground.maximum = 1;
	sliderBackground.color = "#cccccc";
	sliderBackground.value = backgroundVolume;
	sliderBackground.height = "20px";
	sliderBackground.width = "205px";
	UiPanel.addControl(sliderBackground);
	sliderBackground.onValueChangedObservable.add((value) => {
		headerBackground.text = "Music volume: " + parseInt(backgroundVolume * 100) + "%";
		backgroundVolume = value;
		setMenuVolume();
	});

	var headerEffect = new BABYLON.GUI.TextBlock();
	headerEffect.text = "Sound effect volume: " + parseInt(soundEffectVolume * 100) + "%";
	headerEffect.height = "40px";
	headerEffect.color = "white";
	headerEffect.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	headerEffect.paddingTop = "10px";
	UiPanel.addControl(headerEffect);

	var sliderEffect = new BABYLON.GUI.Slider();
	sliderEffect.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	sliderEffect.minimum = 0;
	sliderEffect.maximum = 1;
	sliderEffect.color = "#cccccc";
	sliderEffect.value = soundEffectVolume;
	sliderEffect.height = "20px";
	sliderEffect.width = "205px";
	UiPanel.addControl(sliderEffect);
	sliderEffect.onValueChangedObservable.add((value) => {
		headerEffect.text = "Sound effect volume: " + parseInt(soundEffectVolume * 100) + "%";
		soundEffectVolume = value;
		setMenuVolume();
	});
}

var createStartMenuUI = function(){
	
	startTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var UiPanel = new BABYLON.GUI.StackPanel();
    UiPanel.width = "220px";
    UiPanel.fontSize = "14px";
    UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    startTexture.addControl(UiPanel);

    // creating the button for the Tutorial link
    var tutorialBtn = BABYLON.GUI.Button.CreateSimpleButton("tutorialBtn", "Tutorial");
    tutorialBtn.paddingTop = "10px";
    tutorialBtn.width = "100px";
    tutorialBtn.height = "50px";
    tutorialBtn.color = "white";
    tutorialBtn.background = "gray";
    tutorialBtn.onPointerDownObservable.add(()=> {
        //menuSelect.play(); // <-- The page changes too quickly to be able to hear the button click
        window.location.href = './tutorial.html';
    });
	UiPanel.addControl(tutorialBtn);
	
	// creating the button for the Level 1 link
    var playBtn = BABYLON.GUI.Button.CreateSimpleButton("playBtn", "Play");
    playBtn.paddingTop = "10px";
    playBtn.width = "100px";
    playBtn.height = "50px";
    playBtn.color = "white";
    playBtn.background = "gray";
    playBtn.onPointerDownObservable.add(()=> {
        //menuSelect.play(); // <-- The page changes too quickly to be able to hear the button click
        window.location.href = './level1.html';
    });
    UiPanel.addControl(playBtn);

    var ctrlBtn = BABYLON.GUI.Button.CreateSimpleButton("ctrlBtn", "Controls");
    ctrlBtn.paddingTop = "10px";
    ctrlBtn.width = "100px";
    ctrlBtn.height = "50px";
    ctrlBtn.color = "white";
    ctrlBtn.background = "gray";
    ctrlBtn.onPointerDownObservable.add(()=> {
        menuSelect.play(); // <-- The page changes too quickly to be able to hear the button click
		createControlsUI();
    });
    UiPanel.addControl(ctrlBtn);

    var settingsBtn = BABYLON.GUI.Button.CreateSimpleButton("settingsBtn", "Settings");
    settingsBtn.paddingTop = "10px";
    settingsBtn.width = "100px";
    settingsBtn.height = "50px";
    settingsBtn.color = "white";
    settingsBtn.background = "gray";
    settingsBtn.onPointerDownObservable.add(()=> {
		menuSelect.play(); 
		// Hides the initial buttons so that the user cannot accidentally click them through the menu
		startTexture.dispose();
		createSettingsUI();
		
	});	
    UiPanel.addControl(settingsBtn);
}

var createControlsUI = function(){
	controlsTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ControlsUI");
	var UiPanel = new BABYLON.GUI.StackPanel();
	UiPanel.width = .3;
	UiPanel.height = .4;
	UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
	UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	controlsTexture.addControl(UiPanel);

	var image = new BABYLON.GUI.Image("info", "../../images/info.jpg");
	UiPanel.addControl(image);

	var closeBtn = BABYLON.GUI.Button.CreateSimpleButton("closeBtn", "X");
	closeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	closeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
	closeBtn.paddingRight = "10px";
	closeBtn.paddingTop = "10px";
	closeBtn.width = "50px";
	closeBtn.height = "50px";
	closeBtn.color = "white";
	closeBtn.background = "grey";
	closeBtn.onPointerDownObservable.add(() => {
		menuSelect.play();
		controlsTexture.dispose();
	});
	UiPanel.addControl(closeBtn);	
}


/**
 * Creates a simple generic UI with a text
 * and a button. You can specify the actions 
 * on button click
 * @param {Text} text Text shown in the UI
 * @param {Text} btnText Text inside the button
 * @param {function} btnActions Function that contains all the actions to be done on button click
 */
var createGenericUI = function (text, btnText, btnActions) {
	// UI
	genericTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("TutorialUI");
	var UiPanel = new BABYLON.GUI.StackPanel();
	UiPanel.width = "30%";
	UiPanel.height = "20%";
	UiPanel.fontSize = "14px";
	UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
	genericTexture.addControl(UiPanel);

	var rectangle = new BABYLON.GUI.Rectangle("rect");
	rectangle.background = "grey";
	rectangle.color = "black";
	rectangle.width = "100%";
	rectangle.height = "100%";

	var textBlock = new BABYLON.GUI.TextBlock();
	textBlock.width = "100%";
	textBlock.text = text;
	textBlock.color = "white";
	rectangle.addControl(textBlock);

	var exitBtn = BABYLON.GUI.Button.CreateSimpleButton("exitBtn", btnText);
	exitBtn.paddingTop = "10px";
	exitBtn.paddingBottom = "10px";
	exitBtn.paddingRight = "10px";
	exitBtn.width = "100px";
	exitBtn.height = "50px";
	exitBtn.color = "white";
	exitBtn.background = "grey";
	exitBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
	exitBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
	exitBtn.onPointerDownObservable.add(() => btnActions());
	rectangle.addControl(exitBtn);
	UiPanel.addControl(rectangle);
}
/*****************************************************GUI UTILITY FUNCTION*****************************************************/

/*****************************************************ENVIRONMENT UTILITY FUNCTION*****************************************************/
/**
 * Create the walls and ground of the room-level 
 */
var createRoom = function (groundDimension, wallDimension) {
	// Ground
	var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	var groundTexture = new BABYLON.Texture("../../images/ground.png", scene);
	groundTexture.vScale = 10;
	groundMaterial.diffuseTexture = groundTexture;
	addPlatform(groundMaterial, groundDimension, groundPosition, objShow.ALWAYS);
	// Left wall
	addPlatform(groundMaterial, wallDimension, new BABYLON.Vector3(-(groundDimension.x - groundDimension.y) / 2, (groundDimension.x + groundDimension.y) / 2, 0), objShow.ALWAYS);
	// Right wall
	addPlatform(groundMaterial, wallDimension, new BABYLON.Vector3((groundDimension.x - groundDimension.y) / 2, (groundDimension.x + groundDimension.y) / 2, 0), objShow.ALWAYS);

	// Skybox
	createSkybox(scene);
}

/**
 * Create the main character of the game
 * @param camera camera of the scene
 * @param {BABYLON.Vector3} position  Vector that specifies the init position of the hero
 */
var createHero = function (camera, position = hero.startingPosition, goalPosition, level = 0) {
	// The first parameter can be used to specify which mesh to import. Here we import all meshes
	BABYLON.SceneLoader.ImportMesh("", hero.path, hero.name, scene, function (newMeshes) {
		hero.mesh = newMeshes[0];
		camera.target = hero.mesh;

		hero.mesh.position.copyFrom(position);
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
				// if (!hero.grounded && !groundImpactSound.isPlaying)
				// 	groundImpactSound.play();
				hero.grounded = true;
			} else {
				hero.grounded = false;
			}
		}

		hero.goalPosition = goalPosition;
		hero.level = level;

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
	});
}

/**
 * Create the background sky of the game
 * @param {boolean} day  Says if the sky should be day or night
 * @param {*} scene The BABYLON scene 
 */
var createSkybox = function (scene) {
	// Skybox
	skyboxDay = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
	var skyboxMaterialDay = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterialDay.backFaceCulling = false;
	skyboxMaterialDay.reflectionTexture = new BABYLON.Texture("../../images/skyboxDay.png", scene, true);
	skyboxMaterialDay.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
	skyboxMaterialDay.disableLighting = true;
	skyboxDay.material = skyboxMaterialDay;

	skyboxNight = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
	var skyboxMaterialNight = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterialNight.backFaceCulling = false;
	skyboxMaterialNight.reflectionTexture = new BABYLON.Texture("../../images/skyboxNight.png", scene, true);
	skyboxMaterialNight.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
	skyboxMaterialNight.disableLighting = true;
	skyboxNight.material = skyboxMaterialNight;
	skyboxNight.setEnabled(false);
}

/**
 * Change the background sky of the game
 * depending on the day boolean, and remove the old skybox
 * @param {boolean} day  Says if the sky should be day or night
 */
var changeSkybox = function (day) {
	if (day) {
		skyboxDay.setEnabled(true)
		skyboxNight.setEnabled(false);
	} else {
		skyboxDay.setEnabled(false);
		skyboxNight.setEnabled(true);
	}
}

var createLamp = function (position = lantern.startingPosition) {
	BABYLON.SceneLoader.ImportMesh("", lantern.path, lantern.name, scene, function (newMeshes) {
		lantern.mesh = newMeshes[0];
		lantern.mesh.position.copyFrom(position);
		lantern.mesh.rotation = lantern.startingOrientation;
		lantern.mesh.scaling = lantern.scale;

		var matBB = new BABYLON.StandardMaterial("matBB", scene);
		matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
		matBB.wireframe = true;
		if (!debug)
			matBB.alpha = 0;

		// AABB - Axis aligned bounding box
		lantern.AABBmesh = BABYLON.Mesh.CreateBox("AABB", lantern.AABBdimension, scene);
		lantern.AABBmesh.material = matBB;
		lantern.AABBmesh.ellipsoid = new BABYLON.Vector3(lantern.AABBdimension / 2, lantern.AABBdimension / 2 - 1, 10);
		lantern.AABBmesh.position = lantern.mesh.position.clone();
		lantern.AABBmesh.position.y += lantern.AABBdimension;
		lantern.AABBmesh.scaling = new BABYLON.Vector3(.8, 2, 2);

		initializeLampAnimations();
	});
}

/**
 * If the hero intersect the lamp
 * it show a tutorial on lights
 */
var checkLampTutorial = function () {
	if (hero.AABBmesh.intersectsMesh(lantern.AABBmesh, false) && !lantern.tutorialPlayed) {
		console.log("hello");
		hero.pause = true;
		lantern.tutorialPlayed = true;
		var text = "Some platforms are visible only during the night\n and others only in daytime.\n To change to night or day press the key L";
		createGenericUI(text, "Exit", function () {
			menuSelect.play();
			genericTexture.dispose();
			hero.pause = false;
		});

	}
}

/**
 * Add platform to the scene with specified material, width and position
 * @param {BABYLON.MultiMaterial} material - Material to apply to the platform
 * @param {BABYLON.Vector3} platformDimension - Dimension of the platform
 * @param {BABYLON.Vector3} position - Position of the platform
 * @param {objShow} showGroup - Tells if the platform should be shown on day/night or alway
 * @param {boolean} [finish = false] - Tells if the platform is the finish or not
 */
function addPlatform(material, platformDimension, position, showGroup = objShow.ALWAYS, finish = false) {

	var mesh = BABYLON.MeshBuilder.CreateBox('mesh', { width: platformDimension.x, height: platformDimension.y, depth: platformDimension.z }, scene);
	mesh.position = position;
	mesh.checkCollisions = true;
	mesh.material = material;

	if (finish) {
		addFlag(mesh);
	}

	var platform = new Platform(mesh, showGroup);
	platforms.push(platform);
}

/**
 * Add the flag model to a specified platform mesh
 * @param {*} platform Mesh of the platform where we put the flag
 */
function addFlag(platform) {
	BABYLON.SceneLoader.ImportMesh("", flagGoal.path, flagGoal.name, scene, function (newMeshes) {
		flagGoal.mesh = newMeshes[0];
		flagGoal.mesh.position = platform.position;
		flagGoal.mesh.scaling = flagGoal.scaleFactor;

		var matBB = new BABYLON.StandardMaterial("matBB", scene);
		matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
		matBB.wireframe = true;
		if (!debug)
			matBB.alpha = 0;

		// AABB - Axis aligned bounding box
		flagGoal.AABBmesh = BABYLON.Mesh.CreateBox("AABB", flagGoal.AABBdimension, scene);
		flagGoal.AABBmesh.material = matBB;
		flagGoal.AABBmesh.ellipsoid = new BABYLON.Vector3(flagGoal.AABBdimension / 2, flagGoal.AABBdimension / 2 - 1, 10);
		flagGoal.AABBmesh.position = flagGoal.mesh.position.clone();
		flagGoal.AABBmesh.position.y += flagGoal.AABBdimension;
		flagGoal.AABBmesh.scaling = new BABYLON.Vector3(1, 2, 1);

		initializeFlagAnimations();
		flagAnimationGroup.play(true);
	});
}

/**
 * Enable all the day or night platforms,
 * depending on the currente light situation
 * @param {bool} day Boolean that says if it's day or night
 */
function enablePlatforms(day) {
	platforms.forEach(function (platform) {
		if (platform.show == objShow.DAY && day) {
			platform.mesh.setEnabled(true);
		}
		if (platform.show == objShow.DAY && !day) {
			platform.mesh.setEnabled(false);
		}
		if (platform.show == objShow.NIGHT && day) {
			platform.mesh.setEnabled(false);
		}
		if (platform.show == objShow.NIGHT && !day) {
			platform.mesh.setEnabled(true);
		}
	});
}
/*****************************************************ENVIRONMENT UTILITY FUNCTION*****************************************************/


/*****************************************************WIN UTILITY FUNCTION*****************************************************/

/**
 * Checks if the hero has reached the goal
 */
function checkGoal() {
	if (hero.mesh != null && flagGoal.AABBmesh.intersectsMesh(hero.AABBmesh, false) && !hero.goalReached) {
		hero.goalReached = true;
		stopAllHeroAnimations();
		danceAnimationGroup.play(true);
		winPhysincsBalls();
		winSound.play();
		day = false;
		lightButtonClicked = true;
		createNextLevelUI();
	}
}

/**
 * When the player wins, ball falls from top
 */
function winPhysincsBalls() {
	for (let i = 0; i < 50; i++) {
		// Babylon built-in 'sphere' shape. Params: name, subdivs, size, scene
		var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene);
		var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);

		sphereMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
		sphereMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
		sphereMaterial.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
		sphereMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
		sphere.material = sphereMaterial

		// Move the sphere upward 1/2 its height
		sphere.position = hero.mesh.position.clone();
		var rng = getRandomInt(-groundDimension.x / 2, groundDimension.x / 2);
		var rngDirection = rng >= 1.5 ? 1 : -1;
		sphere.position.y = hero.mesh.position.y + 30 + rngDirection * rng;
		sphere.position.x = rng;

		sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
	}

	platforms.forEach((platform) => {
		platform.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(platform.mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
	});

	hero.AABBmesh.physicsImpostor = new BABYLON.PhysicsImpostor(hero.AABBmesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

}
/*****************************************************WIN UTILITY FUNCTION*****************************************************/



/*****************************************************MATH UTILITY FUNCTION*****************************************************/
/**
 * Create a Babylon vector with only the x-component
 * @param {*} value x-value of the vec3
 */
var Vec3x = function (value) {
	return new BABYLON.Vector3(value, 0, 0);
}

/**
 * Create a Babylon vector with only the x-component,
 * transforming it in radians
 * @param {*} value x-value of the vec3 in degree
 */
var Vec3DegToRadx = function (value) {
	return Vec3x(BABYLON.Tools.ToRadians(value));
}

/**
 * Create a Babylon vector with only the y-component
 * @param {*} value y-value of the vec3
 */
var Vec3y = function (value) {
	return new BABYLON.Vector3(0, value, 0);
}

/**
 * Create a Babylon vector with only the y-component,
 * transforming it in radians
 * @param {*} value y-value of the vec3 in degree
 */
var Vec3DegToRady = function (value) {
	return Vec3y(BABYLON.Tools.ToRadians(value));
}

/**
 * Create a Babylon vector with only the z-component
 * @param {*} value z-value of the vec3
 */
var Vec3z = function (value) {
	return new BABYLON.Vector3(0, 0, value);
}

/**
 * Create a Babylon vector with only the z-component,
 * transforming it in radians
 * @param {*} value z-value of the vec3 in degree
 */
var Vec3DegToRadz = function (value) {
	return Vec3z(BABYLON.Tools.ToRadians(value));
}

/**
 * Ottenere un numero random tra due valori
 * @param {*} min 
 * @param {*} max 
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}
/*****************************************************MATH UTILITY FUNCTION*****************************************************/