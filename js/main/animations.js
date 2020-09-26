/**
 * Create a list of keys of dimension values.size, 
 * with the specified values
 * @param {Array} values array of values
 */
var createAnimationKeys = function (values) {
	var keys = [];
	var num_values = values.length - 1;

	for (var i = 0; i < values.length; i++) {
		keys.push({
			frame: i * framerate / num_values, // We subdivide the framerate in n part, each of which has it's own value
			value: values[i] // The value of the animation
		});
	}

	return keys;
}



// An AnimationGroup allows you to link together animations and meshes and play them, pause them and stop them as a group.

// To create an animation we follow the doc: https://doc.babylonjs.com/babylon101/animations
var walkAnimationGroup;
var idleAnimationGroup;
var rotateToWalkAnimationGroup;
var rotateToIdleAnimationGroup;
var jumpAnimationGroup;
var danceAnimationGroup;
var lanternAnimationGroup;
var flagAnimationGroup;

function initializeGroupsAnimation() {
	walkAnimationGroup = new BABYLON.AnimationGroup("walkGroup");
	idleAnimationGroup = new BABYLON.AnimationGroup("idleGroup");
	rotateToWalkAnimationGroup = new BABYLON.AnimationGroup("rotateToWalkGroup");
	rotateToIdleAnimationGroup = new BABYLON.AnimationGroup("rotateToIdleGroup");
	jumpAnimationGroup = new BABYLON.AnimationGroup("jumpGroup");
	danceAnimationGroup = new BABYLON.AnimationGroup("danceGroup");
	lanternAnimationGroup = new BABYLON.AnimationGroup("lanternSwing");
	flagAnimationGroup = new BABYLON.AnimationGroup("flagSwing");
}

// Create walk animation
function createWalkAnimation() {
	//**********************TORSO**********************//
	var walkTorso = new BABYLON.Animation("walkTorso", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var torsoRotation = scene.getNodeByName('torso').rotation.clone();
	var keys = createAnimationKeys([
		torsoRotation,
		new BABYLON.Vector3(torsoRotation.x, torsoRotation.y - BABYLON.Tools.ToRadians(3), torsoRotation.z),
		torsoRotation,
		new BABYLON.Vector3(torsoRotation.x, torsoRotation.y + BABYLON.Tools.ToRadians(3), torsoRotation.z),
		torsoRotation
	]); // An array with all animation keys
	walkTorso.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkTorso, scene.getNodeByName('torso'));

	//**********************LEFT ARM**********************//
	var walkArmLeft = new BABYLON.Animation("walkArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armLeftUpperRotation = scene.getNodeByName('arm_left_upper.001').rotation.clone();
	var keys = createAnimationKeys([
		armLeftUpperRotation,
		new BABYLON.Vector3(armLeftUpperRotation.x - BABYLON.Tools.ToRadians(15), armLeftUpperRotation.y, armLeftUpperRotation.z),
		armLeftUpperRotation,
		new BABYLON.Vector3(armLeftUpperRotation.x + BABYLON.Tools.ToRadians(15), armLeftUpperRotation.y, armLeftUpperRotation.z),
		armLeftUpperRotation
	]); // An array with all animation keys
	walkArmLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkArmLeft, scene.getNodeByName('arm_left_upper.001'));
	rotateToWalkAnimationGroup.addTargetedAnimation(walkArmLeft, scene.getNodeByName('arm_left_upper.001')); // We reuse the animation for rotate to walk and idle

	//**********************RIGHT ARM**********************//
	var walkArmRight = new BABYLON.Animation("walkArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armRightUpperRotation = scene.getNodeByName('arm_right_upper.001').rotation.clone();
	var keys = createAnimationKeys([
		armRightUpperRotation,
		new BABYLON.Vector3(armRightUpperRotation.x + BABYLON.Tools.ToRadians(15), armRightUpperRotation.y, armRightUpperRotation.z),
		armRightUpperRotation,
		new BABYLON.Vector3(armRightUpperRotation.x - BABYLON.Tools.ToRadians(15), armRightUpperRotation.y, armRightUpperRotation.z),
		armRightUpperRotation
	]); // An array with all animation keys
	walkArmRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkArmRight, scene.getNodeByName('arm_right_upper.001'));

	//**********************LEFT LEG**********************//
	var walkLegLeft = new BABYLON.Animation("walkLegLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legLeftRotation = scene.getNodeByName('leg_left').rotation.clone();
	var keys = createAnimationKeys([
		legLeftRotation,
		new BABYLON.Vector3(legLeftRotation.x + BABYLON.Tools.ToRadians(50), legLeftRotation.y, legLeftRotation.z),
		legLeftRotation,
		new BABYLON.Vector3(legLeftRotation.x - BABYLON.Tools.ToRadians(50), legLeftRotation.y, legLeftRotation.z),
		legLeftRotation
	]); // An array with all animation keys
	walkLegLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkLegLeft, scene.getNodeByName('leg_left'));

	//**********************LEFT LEG LOWER**********************//
	var walkLegLeftLower = new BABYLON.Animation("walkLegLeftLower", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legLeftRotationLower = scene.getNodeByName('leg_left_lower').rotation.clone();
	var keys = createAnimationKeys([
		legLeftRotationLower,
		new BABYLON.Vector3(legLeftRotationLower.x + BABYLON.Tools.ToRadians(10), legLeftRotationLower.y, legLeftRotationLower.z),
		legLeftRotationLower,
		new BABYLON.Vector3(legLeftRotationLower.x - BABYLON.Tools.ToRadians(10), legLeftRotationLower.y, legLeftRotationLower.z),
		legLeftRotationLower
	]); // An array with all animation keys
	walkLegLeftLower.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkLegLeftLower, scene.getNodeByName('leg_left_lower'));

	//**********************RIGHT LEG**********************//
	var walkLegRight = new BABYLON.Animation("walkLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotation = scene.getNodeByName('leg_right').rotation.clone();
	var keys = createAnimationKeys([
		legRightRotation,
		new BABYLON.Vector3(legRightRotation.x - BABYLON.Tools.ToRadians(50), legRightRotation.y, legRightRotation.z),
		legRightRotation,
		new BABYLON.Vector3(legRightRotation.x + BABYLON.Tools.ToRadians(50), legRightRotation.y, legRightRotation.z),
		legRightRotation
	]); // An array with all animation keys
	walkLegRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkLegRight, scene.getNodeByName('leg_right'));

	//**********************RIGHT LEG LOWER**********************//
	var walkLegRightLower = new BABYLON.Animation("walkLegRightLower", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotationLower = scene.getNodeByName('leg_right_lower').rotation.clone();
	var keys = createAnimationKeys([
		legRightRotationLower,
		new BABYLON.Vector3(legRightRotationLower.x + BABYLON.Tools.ToRadians(10), legRightRotationLower.y, legRightRotationLower.z),
		legRightRotationLower,
		new BABYLON.Vector3(legRightRotationLower.x - BABYLON.Tools.ToRadians(10), legRightRotationLower.y, legRightRotationLower.z),
		legRightRotationLower
	]); // An array with all animation keys
	walkLegRightLower.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkLegRightLower, scene.getNodeByName('leg_right_lower'));
}

// Create idle animation
function createIdleAnimation() {
	//**********************HEAD**********************//
	//Position of left arm to compute an up and down animation
	var startPosHead = scene.getNodeByName('head').position.y;

	var idleHead = new BABYLON.Animation("idleHead", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosHead, startPosHead - .05, startPosHead, startPosHead + .05, startPosHead]); // An array with all animation keys
	idleHead.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	idleAnimationGroup.addTargetedAnimation(idleHead, scene.getNodeByName('head'));

	//**********************LEFT ARM**********************//
	//Position of left arm to compute an up and down animation
	var startPosL = scene.getNodeByName('arm_left_upper.001').position.y;

	var idleArmLeft = new BABYLON.Animation("idleArmLeft", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosL, startPosL - .1, startPosL, startPosL + .1, startPosL]); // An array with all animation keys
	idleArmLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	idleAnimationGroup.addTargetedAnimation(idleArmLeft, scene.getNodeByName('arm_left_upper.001'));

	//**********************RIGHT ARM**********************//
	//Position of right arm to compute an up and down animation
	var startPosR = scene.getNodeByName('arm_right_upper.001').position.y;

	var idleArmRight = new BABYLON.Animation("idleArmRight", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosR, startPosR - .1, startPosR, startPosR + .1, startPosR]); // An array with all animation keys
	idleArmRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	idleAnimationGroup.addTargetedAnimation(idleArmRight, scene.getNodeByName('arm_right_upper.001'));

}


// Create rotate to walk animation
function createRotateToWalkAnimation() {
	//**********************TORSO**********************//
	var rotateTorso = new BABYLON.Animation("rotateToWalkTorso", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRady(0), Vec3DegToRady(hero.walkDirecton * 15), Vec3DegToRady(hero.walkDirecton * 30), Vec3DegToRady(hero.walkDirecton * 45), Vec3DegToRady(hero.walkDirecton * 60), Vec3DegToRady(hero.walkDirecton * 75), Vec3DegToRady(hero.walkDirecton * 90)]); // An array with all animation keys
	rotateTorso.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateTorso, scene.getNodeByName('torso'));

	//**********************LEFT ARM**********************//
	var rotateArmLeft = new BABYLON.Animation("rotateArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armLeftUpperRotation = scene.getNodeByName('arm_left_upper.001').rotation.clone();
	var keys = createAnimationKeys([armLeftUpperRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateArmLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateArmLeft, scene.getNodeByName('arm_left_upper.001'));

	//**********************RIGHT ARM**********************//
	var rotateArmRight = new BABYLON.Animation("rotateArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armRightUpperRotation = scene.getNodeByName('arm_right_upper.001').rotation.clone();
	var keys = createAnimationKeys([armRightUpperRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateArmRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateArmRight, scene.getNodeByName('arm_right_upper.001'));

	//**********************LEFT LEG**********************//
	var rotateLegLeft = new BABYLON.Animation("rotateLegLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legLeftRotation = scene.getNodeByName('leg_left').rotation.clone();
	var keys = createAnimationKeys([legLeftRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateLegLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateLegLeft, scene.getNodeByName('leg_left'));

	//**********************RIGHT LEG**********************//
	var rotateLegRight = new BABYLON.Animation("rotateLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotation = scene.getNodeByName('leg_right').rotation.clone();
	var keys = createAnimationKeys([legRightRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateLegRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateLegRight, scene.getNodeByName('leg_right'));

	rotateToWalkAnimationGroup.speedRatio = 5;
}

// Create rotate to idle animation
function createRotateToIdleAnimation() {
	//**********************TORSO**********************//
	var rotateTorso = new BABYLON.Animation("rotateToIdleTorso", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRady(hero.walkDirecton * 90), Vec3DegToRady(hero.walkDirecton * 75), Vec3DegToRady(hero.walkDirecton * 60), Vec3DegToRady(hero.walkDirecton * 45), Vec3DegToRady(hero.walkDirecton * 30), Vec3DegToRady(hero.walkDirecton * 15), Vec3DegToRady(0)]); // An array with all animation keys
	rotateTorso.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateTorso, scene.getNodeByName('torso'));

	//**********************LEFT ARM**********************//
	var rotateArmLeft = new BABYLON.Animation("rotateArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armLeftUpperRotation = scene.getNodeByName('arm_left_upper.001').rotation.clone();
	var keys = createAnimationKeys([armLeftUpperRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateArmLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateArmLeft, scene.getNodeByName('arm_left_upper.001'));

	//**********************RIGHT ARM**********************//
	var rotateArmRight = new BABYLON.Animation("rotateArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armRightUpperRotation = scene.getNodeByName('arm_right_upper.001').rotation.clone();
	var keys = createAnimationKeys([armRightUpperRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateArmRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateArmRight, scene.getNodeByName('arm_right_upper.001'));

	//**********************LEFT LEG**********************//
	var rotateLegLeft = new BABYLON.Animation("rotateLegLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legLeftRotation = scene.getNodeByName('leg_left').rotation.clone();
	var keys = createAnimationKeys([legLeftRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateLegLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateLegLeft, scene.getNodeByName('leg_left'));

	//**********************RIGHT LEG**********************//
	var rotateLegRight = new BABYLON.Animation("rotateLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotation = scene.getNodeByName('leg_right').rotation.clone();
	var keys = createAnimationKeys([legRightRotation, new BABYLON.Vector3(0, 0, 0)]); // An array with all animation keys
	rotateLegRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateLegRight, scene.getNodeByName('leg_right'));

	rotateToIdleAnimationGroup.speedRatio = 5;
}

function createJumpAnimation() {
	//**********************LEFT UPPER ARM**********************//
	var jumpLeftArm = new BABYLON.Animation("jumpLeftArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var leftArmRotation = scene.getNodeByName('arm_left_upper.001').rotation.clone();
	var keys = createAnimationKeys([
		leftArmRotation,
		new BABYLON.Vector3(leftArmRotation.x + BABYLON.Tools.ToRadians(45), leftArmRotation.y, leftArmRotation.z),
		new BABYLON.Vector3(leftArmRotation.x + BABYLON.Tools.ToRadians(90), leftArmRotation.y, leftArmRotation.z),
		new BABYLON.Vector3(leftArmRotation.x + BABYLON.Tools.ToRadians(45), leftArmRotation.y, leftArmRotation.z),
		leftArmRotation
	]); // An array with all animation keys
	jumpLeftArm.setKeys(keys);
	jumpAnimationGroup.addTargetedAnimation(jumpLeftArm, scene.getNodeByName('arm_left_upper.001'));

	//**********************RIGHT UPPER ARM**********************//
	var jumpRightArm = new BABYLON.Animation("jumpRightArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var rightArmRotation = scene.getNodeByName('arm_right_upper.001').rotation.clone();
	var keys = createAnimationKeys([
		rightArmRotation,
		new BABYLON.Vector3(rightArmRotation.x + BABYLON.Tools.ToRadians(45), rightArmRotation.y, rightArmRotation.z),
		new BABYLON.Vector3(rightArmRotation.x + BABYLON.Tools.ToRadians(90), rightArmRotation.y, rightArmRotation.z),
		new BABYLON.Vector3(rightArmRotation.x + BABYLON.Tools.ToRadians(45), rightArmRotation.y, rightArmRotation.z),
		rightArmRotation
	]); // An array with all animation keys
	jumpRightArm.setKeys(keys);
	jumpAnimationGroup.addTargetedAnimation(jumpRightArm, scene.getNodeByName('arm_right_upper.001'));

	//**********************LEFT LOWER ARM**********************//
	var jumpLeftLowerArm = new BABYLON.Animation("jumpLeftLowerArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var leftLowerArmRotation = scene.getNodeByName('arm_left_lower').rotation.clone();
	var keys = createAnimationKeys([
		leftLowerArmRotation,
		new BABYLON.Vector3(leftLowerArmRotation.x + BABYLON.Tools.ToRadians(45), leftLowerArmRotation.y, leftLowerArmRotation.z),
		new BABYLON.Vector3(leftLowerArmRotation.x + BABYLON.Tools.ToRadians(90), leftLowerArmRotation.y, leftLowerArmRotation.z),
		new BABYLON.Vector3(leftLowerArmRotation.x + BABYLON.Tools.ToRadians(45), leftLowerArmRotation.y, leftLowerArmRotation.z),
		leftLowerArmRotation
	]); // An array with all animation keys
	jumpLeftLowerArm.setKeys(keys);
	jumpAnimationGroup.addTargetedAnimation(jumpLeftLowerArm, scene.getNodeByName('arm_left_lower'));

	//**********************RIGHT LOWER ARM**********************//
	var jumpRightLowerArm = new BABYLON.Animation("jumpRightLowerArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var rightLowerArmRotation = scene.getNodeByName('arm_right_lower').rotation.clone();
	var keys = createAnimationKeys([
		rightLowerArmRotation,
		new BABYLON.Vector3(rightLowerArmRotation.x + BABYLON.Tools.ToRadians(45), rightLowerArmRotation.y, rightLowerArmRotation.z),
		new BABYLON.Vector3(rightLowerArmRotation.x + BABYLON.Tools.ToRadians(90), rightLowerArmRotation.y, rightLowerArmRotation.z),
		new BABYLON.Vector3(rightLowerArmRotation.x + BABYLON.Tools.ToRadians(45), rightLowerArmRotation.y, rightLowerArmRotation.z),
		rightLowerArmRotation
	]); // An array with all animation keys
	jumpRightLowerArm.setKeys(keys);
	jumpAnimationGroup.addTargetedAnimation(jumpRightLowerArm, scene.getNodeByName('arm_right_lower'));

	//**********************LEFT LEG**********************//
	var jumpLegLeft = new BABYLON.Animation("jumpLegLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legLeftRotation = scene.getNodeByName('leg_left').rotation.clone();
	var keys = createAnimationKeys([
		legLeftRotation,
		new BABYLON.Vector3(legLeftRotation.x, legLeftRotation.y, legLeftRotation.z - BABYLON.Tools.ToRadians(20)),
		new BABYLON.Vector3(legLeftRotation.x, legLeftRotation.y, legLeftRotation.z - BABYLON.Tools.ToRadians(40)),
		new BABYLON.Vector3(legLeftRotation.x, legLeftRotation.y, legLeftRotation.z - BABYLON.Tools.ToRadians(20)),
		legLeftRotation
	]); // An array with all animation keys
	jumpLegLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	jumpAnimationGroup.addTargetedAnimation(jumpLegLeft, scene.getNodeByName('leg_left'));

	//**********************RIGHT LEG**********************//
	var jumpLegRight = new BABYLON.Animation("jumpLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotation = scene.getNodeByName('leg_right').rotation.clone();var keys = createAnimationKeys([
		legRightRotation,
		new BABYLON.Vector3(legRightRotation.x, legRightRotation.y, legRightRotation.z + BABYLON.Tools.ToRadians(20)),
		new BABYLON.Vector3(legRightRotation.x, legRightRotation.y, legRightRotation.z + BABYLON.Tools.ToRadians(40)),
		new BABYLON.Vector3(legRightRotation.x, legRightRotation.y, legRightRotation.z + BABYLON.Tools.ToRadians(20)),
		legRightRotation
	]); // An array with all animation keys
	jumpLegRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	jumpAnimationGroup.addTargetedAnimation(jumpLegRight, scene.getNodeByName('leg_right'));
}

function createDanceAnimation() {
	danceAnimationGroup = new BABYLON.AnimationGroup("danceGroup");

	// Left Upper Arm
	var danceLeftArm = new BABYLON.Animation("danceLeftArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(80), Vec3DegToRadx(160), Vec3DegToRadx(80), Vec3DegToRadx(0)]);
	danceLeftArm.setKeys(keys);
	danceAnimationGroup.addTargetedAnimation(danceLeftArm, scene.getNodeByName('arm_left_upper.001'));

	// Right Upper Arm
	var danceRightArm = new BABYLON.Animation("danceRightArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(80), Vec3DegToRadx(160), Vec3DegToRadx(80), Vec3DegToRadx(0)]);
	danceRightArm.setKeys(keys);
	danceAnimationGroup.addTargetedAnimation(danceRightArm, scene.getNodeByName('arm_right_upper.001'));

	// Left Lower Arm
	var danceLeftLowerArm = new BABYLON.Animation("danceLeftLowerArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(30), Vec3DegToRadx(60), Vec3DegToRadx(30), Vec3DegToRadx(0)]);
	danceLeftLowerArm.setKeys(keys);
	danceAnimationGroup.addTargetedAnimation(danceLeftLowerArm, scene.getNodeByName('arm_left_lower'));

	// Right Lower Arm
	var danceRightLowerArm = new BABYLON.Animation("danceRightLowerArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(30), Vec3DegToRadx(60), Vec3DegToRadx(30), Vec3DegToRadx(0)]);
	danceRightLowerArm.setKeys(keys);
	danceAnimationGroup.addTargetedAnimation(danceRightLowerArm, scene.getNodeByName('arm_right_lower'));

	// Defining the torso positions at each key frame
	var startPosTorso = scene.getNodeByName("torso").position;
	var upTorsoPos = new BABYLON.Vector3(startPosTorso.x, startPosTorso.y + 0.5, startPosTorso.z);
	var upTorsoPos2 = new BABYLON.Vector3(startPosTorso.x, startPosTorso.y + 1, startPosTorso.z);

	// Torso dance animation
	var danceTorso = new BABYLON.Animation("danceTorso", "position", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosTorso, upTorsoPos, upTorsoPos2, upTorsoPos, startPosTorso]); // An array with all animation keys
	danceTorso.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	danceAnimationGroup.addTargetedAnimation(danceTorso, scene.getNodeByName('torso'));
}

function createLanternAnimation() {
	//**********************UPPER CHAIN**********************//
	var chain1Swing = new BABYLON.Animation("chain1Swing", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(10), Vec3DegToRadx(0), Vec3DegToRadx(-10), Vec3DegToRadx(0)]);
	chain1Swing.setKeys(keys);
	lanternAnimationGroup.addTargetedAnimation(chain1Swing, scene.getNodeByName('chain1'));

	//**********************LOWER CHAIN**********************//
	var chain2Swing = new BABYLON.Animation("chain2Swing", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(10), Vec3DegToRadx(0), Vec3DegToRadx(-10), Vec3DegToRadx(0)]);
	chain2Swing.setKeys(keys);
	lanternAnimationGroup.addTargetedAnimation(chain2Swing, scene.getNodeByName('chain2'));

	//**********************LAMP**********************//
	var lanternSwing = new BABYLON.Animation("lanternSwing", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(8), Vec3DegToRadx(0), Vec3DegToRadx(-8), Vec3DegToRadx(0)]);
	lanternSwing.setKeys(keys);
	lanternAnimationGroup.addTargetedAnimation(lanternSwing, scene.getNodeByName('lantern'));

}

function createFlagAnimation() {
	//**********************FLAG BASE**********************//
	var baseFlagSwing = new BABYLON.Animation("baseFlagSwing", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	scene.getNodeByName('flag').rotation = flagGoal.rotation;
	var baseFlagRotation = scene.getNodeByName('flag').rotation.clone();
	var keys = createAnimationKeys([
		baseFlagRotation,
		new BABYLON.Vector3(baseFlagRotation.x, baseFlagRotation.y + BABYLON.Tools.ToRadians(15), baseFlagRotation.z),
		baseFlagRotation,
		new BABYLON.Vector3(baseFlagRotation.x, baseFlagRotation.y - BABYLON.Tools.ToRadians(15), baseFlagRotation.z),
		baseFlagRotation
	]);
	baseFlagSwing.setKeys(keys);
	flagAnimationGroup.addTargetedAnimation(baseFlagSwing, scene.getNodeByName('flag'));

	//**********************UPPER FLAG**********************//
	var upperFlagSwing = new BABYLON.Animation("upperFlagSwing", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadz(0), Vec3DegToRadz(10), Vec3DegToRadz(0), Vec3DegToRadz(-10), Vec3DegToRadz(0)]);
	upperFlagSwing.setKeys(keys);
	flagAnimationGroup.addTargetedAnimation(upperFlagSwing, scene.getNodeByName('flag.001'));

	//**********************LOWER FLAG**********************//
	var lowerFlagSwing = new BABYLON.Animation("lowerFlagSwing", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRadz(0), Vec3DegToRadz(8), Vec3DegToRadz(0), Vec3DegToRadz(-8), Vec3DegToRadz(0)]);
	lowerFlagSwing.setKeys(keys);
	flagAnimationGroup.addTargetedAnimation(lowerFlagSwing, scene.getNodeByName('flag.002'));

}


function initializeHeroAnimations() {
	// Create animations
	createIdleAnimation();
	createWalkAnimation();

	createRotateToWalkAnimation();
	rotateToWalkAnimationGroup.onAnimationEndObservable.add(function () {
		if (hero.currentAnimation != animation.WALK) {
			console.log("Rotate to walk ended");
			createWalkAnimation();
			rotationToWalkEnded = true;
			// animating = false;
			hero.currentAnimation = animation.WALK;
			walkAnimationGroup.play(true);
		}
	});

	createRotateToIdleAnimation();
	rotateToIdleAnimationGroup.onAnimationEndObservable.add(function () {
		if (hero.currentAnimation != animation.IDLE) {
			console.log("Rotate to idle ended");
			// rotateToIdleAnimationGroup.reset();
			rotationToIdleEnded = true;

			//Stop all animations besides Idle Anim when no key is down
			walkAnimationGroup.reset();
			walkAnimationGroup.stop();

			hero.currentAnimation = animation.IDLE;
			idleAnimationGroup.start();
		}
	});

	createJumpAnimation();

	createDanceAnimation();
}

function initializeLampAnimations() {
	createLanternAnimation();
}

function initializeFlagAnimations() {
	createFlagAnimation();
}

function stopAllHeroAnimations() {
	idleAnimationGroup.stop();
	walkAnimationGroup.reset();
	walkAnimationGroup.stop();
	rotateToIdleAnimationGroup.reset();
	rotateToIdleAnimationGroup.stop();
	rotateToWalkAnimationGroup.reset();
	rotateToWalkAnimationGroup.stop();
}