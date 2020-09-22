function enableCollision(scene, camera) {
	//Set gravity for the scene (G force like, on Y-axis)
	scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

	// Enable Collisions
	scene.collisionsEnabled = true;

	//Then apply collisions and gravity to the active camera
	camera.checkCollisions = true;
	camera.applyGravity = true;

	//Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    
}

/**
 * Check if the main character head (the AABB Bounding Box around him)
 * collide with a platform on top
 */
function checkHeadCollision() {
	platforms.forEach(function(platform) {
		if (platform.mesh.position.y > hero.mesh.position.y) {
			if (platform.mesh.intersectsMesh(hero.AABBmesh, false)) {
				console.log("Head collision");
				hero.headCollision = true;
			}
		}
	});
}

/**
 * Check if the main character head (the AABB Bounding Box around him)
 * collide with a platform on his side
 * @param {number} direction  of the character (1 for right, -1 for left)
 */
function checkLateralCollision(direction) {
	platforms.forEach(function(platform) {
		var collisionDetected = false;
		if (direction * platform.mesh.position.x > 0) {
			if (platform.mesh.intersectsMesh(hero.AABBmesh, false)) {
				console.log("Lateral collision");
				hero.lateralCollision = true;
				collisionDetected = true;
				// hero.headCollision = true;
			}
		}

		// Reset the lateral collision boolean 
		if (!collisionDetected)
			hero.lateralCollision = false;
	});
}