/*****************************************************ENVIRONMENT UTILITY FUNCTION*****************************************************/
/**
 * Add platform to the scene with specified material, width and position
 * @param {BABYLON.MultiMaterial} material - Material to apply to the platform
 * @param {number} platformWidth - platformWidthSmall, platformWidthMedium or platformWidthBig
 * @param {boolean} [rotate = false] - if true rotate the platform by 90 degrees
 */
function addPlatform(material, platformWidth, position, showGroup = objShow.ALWAYS, ground = false, rotate = false) {
	var mesh = BABYLON.MeshBuilder.CreateBox('mesh', { width: platformWidth, height: platformHeight, depth: platformDepth }, scene);
	mesh.position = position;
	if (rotate)
		mesh.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI / 2);
	mesh.checkCollisions = true;

	if (ground) {
		// // Create ground collider
		// mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);	
	}

	var platform = new Platform(mesh, showGroup);
	platforms.push(platform);
}
/*****************************************************ENVIRONMENT UTILITY FUNCTION*****************************************************/



/**
 * Create a Babylon vector with only the x-component
 * @param {*} value x-value of the vec3
 */
var Vec3x = function(value) {
    return new BABYLON.Vector3(value,0,0);
}

/**
 * Create a Babylon vector with only the x-component,
 * transforming it in radians
 * @param {*} value x-value of the vec3 in degree
 */
var Vec3DegToRadx = function(value) {
    return Vec3x(BABYLON.Tools.ToRadians(value));
}

/**
 * Create a Babylon vector with only the y-component
 * @param {*} value y-value of the vec3
 */
var Vec3y = function(value) {
    return new BABYLON.Vector3(0,value,0);
}

/**
 * Create a Babylon vector with only the y-component,
 * transforming it in radians
 * @param {*} value y-value of the vec3 in degree
 */
var Vec3DegToRady = function(value) {
    return Vec3y(BABYLON.Tools.ToRadians(value));
}

/**
 * Create a Babylon vector with only the z-component
 * @param {*} value z-value of the vec3
 */
var Vec3z = function(value) {
    return new BABYLON.Vector3(0,0,value);
}

/**
 * Create a Babylon vector with only the z-component,
 * transforming it in radians
 * @param {*} value z-value of the vec3 in degree
 */
var Vec3DegToRadz = function(value) {
    return Vec3z(BABYLON.Tools.ToRadians(value));
}