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
	platforms.forEach(function (platform) {
		if (platform.mesh.position.y > hero.mesh.position.y) {
			if (platform.show == objShow.ALWAYS ||
				(day && platform.show == objShow.DAY) ||
				(!day && platform.show == objShow.NIGHT)) {
				if (platform.mesh.intersectsMesh(hero.AABBmesh, false)) {
					console.log("Head collision");
					hero.headCollision = true;
				}
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
	var collisionDetected = false;
	platforms.forEach(function (platform) {
		if ((hero.mesh.position.x < platform.mesh.position.x && direction == 1) ||
			(hero.mesh.position.x > platform.mesh.position.x && direction == -1)) {
			// console.log("hero pos: ", hero.mesh.position.x);
			// console.log("plat pos: ", platform.mesh.position.x);
			// console.log("plat show: ", platform.show);
			// console.log("day: ", day);
			if (platform.show == objShow.ALWAYS ||
				(day && platform.show == objShow.DAY) ||
				(!day && platform.show == objShow.NIGHT)) {
				if (platform.mesh.intersectsMesh(hero.AABBmesh, false)) {
					console.log("Lateral collision");
					hero.lateralCollision = true;
					collisionDetected = true;
					// console.log("Collision detected: ", collisionDetected);
					// console.log("Collision hero: ", hero.lateralCollision);
					// hero.headCollision = true;
				}
			}
		}

	});
	// Reset the lateral collision boolean 
	if (!collisionDetected) {
		hero.lateralCollision = false;
		console.log("changing lateral collision");
	}
}