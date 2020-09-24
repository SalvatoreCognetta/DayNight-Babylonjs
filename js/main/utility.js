/*****************************************************ENVIRONMENT UTILITY FUNCTION*****************************************************/
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
		// TODO show menu and stop game

	});
	UiPanel.addControl(menuBtn);
}

/**
 * Create the main character of the game
 * @camera camera of the scene
 * @position {BABYLON.Vector3} Vector that specifies the init position of the hero
 */
var createHero = function (camera, position = hero.startingPosition, goalPosition) {
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
				// if (!hero.grounded && !groundImpactSound.isPlaying)
				// 	groundImpactSound.play();
				hero.grounded = true;
			} else {
				hero.grounded = false;
			}
		}

		hero.goalPosition = goalPosition;

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

var createSkybox = function (day, scene) {
	// Skybox
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	if (day)
		skyboxMaterial.reflectionTexture = new BABYLON.Texture("../../images/skyboxDay.png", scene, true);
	else
		skyboxMaterial.reflectionTexture = new BABYLON.Texture("../../images/skyboxNight.png", scene, true);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;
	return skybox;
}

var changeSkybox = function (skybox, day, scene) {
	var newskybox = createSkybox(day, scene);
	if (skybox != null) {
		skybox.dispose();
		console.log("Dispose skybox");
	}
	return newskybox;
}

var createLamp = function (position = lantern.startingPosition) {
	BABYLON.SceneLoader.ImportMesh("", lantern.path, lantern.name, scene, function (newMeshes) {
		lantern.mesh = newMeshes[0];
		lantern.mesh.position.copyFrom(position);
		lantern.mesh.rotation = lantern.startingOrientation;
		lantern.mesh.scaling = lantern.scale;
		initializeLampAnimations();
	});
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

	}
}

/**
 * When the player wins, ball falls from top
 */
function winPhysincsBalls() {
	for (let i = 0; i < 10; i++) {
		// Babylon built-in 'sphere' shape. Params: name, subdivs, size, scene
		var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene);
		// TODO Change colors/materials

		// Move the sphere upward 1/2 its height
		sphere.position = hero.mesh.position.clone();
		var rng = Math.random() + 1;
		var rngDirection = rng >= 1.5 ? 1 : -1;
		sphere.position.y = hero.mesh.position.y + 30 + rngDirection * rng;
		sphere.position.x += rngDirection * rng * 10;

		sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
	}

	platforms.forEach((platform) => {
		platform.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(platform.mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
	});

	hero.AABBmesh.physicsImpostor = new BABYLON.PhysicsImpostor(hero.AABBmesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

}
/*****************************************************ENVIRONMENT UTILITY FUNCTION*****************************************************/



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