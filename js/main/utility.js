/*****************************************************ENVIRONMENT UTILITY FUNCTION*****************************************************/
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


var createLamp = function (position = lantern.startingPosition) {
	BABYLON.SceneLoader.ImportMesh("", lantern.path, lantern.name, scene, function (newMeshes) {
		lantern.mesh = newMeshes[0];
		lantern.mesh.position.copyFrom(position);
		lantern.mesh.rotation = lantern.startingOrientation;
		lantern.mesh.scaling = lantern.scale;
		initializeLampAnimations();
	})

}

/**
 * Add platform to the scene with specified material, width and position
 * @param {BABYLON.MultiMaterial} material - Material to apply to the platform
 * @param {BABYLON.Vector3} platformDimension - Dimension of the platform
 * @param {finish} [finish = false] - tells if the platform is the finish or not
 */
function addPlatform(material, platformDimension, position, showGroup = objShow.ALWAYS, finish = false) {

	var mesh = BABYLON.MeshBuilder.CreateBox('mesh', { width: platformDimension.x, height: platformDimension.y, depth: platformDimension.z }, scene);
	mesh.position = position;
	mesh.checkCollisions = true;
	mesh.material = material;

	if (finish) {
		BABYLON.SceneLoader.ImportMesh("", finishGoal.path, finishGoal.name, scene, function (newMeshes) {
			finishGoal.mesh = newMeshes[0];
			finishGoal.mesh.position = mesh.position;
			finishGoal.mesh.scaling = finishGoal.scaleFactor;
		});
	}

	// if (ground) {
	// // Create ground collider
	// mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);	
	// }

	var platform = new Platform(mesh, showGroup);
	platforms.push(platform);
}


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