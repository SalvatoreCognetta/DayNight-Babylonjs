/**
 * Create a list of keys of dimension values.size, 
 * with the specified values
 * @param {Array} values array of values
 */
var createAnimationKeys = function(values) {
	var keys = [];
	var num_values = values.length-1;

	for (var i = 0; i < values.length; i++) {
		keys.push({
			frame: i*framerate/num_values, // We subdivide the framerate in n part, each of which has it's own value
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

function initializeGroupsAnimation() {
	walkAnimationGroup = new BABYLON.AnimationGroup("walkGroup");
	idleAnimationGroup = new BABYLON.AnimationGroup("idleGroup");
	rotateToWalkAnimationGroup = new BABYLON.AnimationGroup("rotateToWalkGroup");
	rotateToIdleAnimationGroup = new BABYLON.AnimationGroup("rotateToIdleGroup");
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
		new BABYLON.Vector3(armLeftUpperRotation.x - BABYLON.Tools.ToRadians(15)), 
		armLeftUpperRotation, 
		new BABYLON.Vector3(armLeftUpperRotation.x + BABYLON.Tools.ToRadians(15)),
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
		new BABYLON.Vector3(armRightUpperRotation.x + BABYLON.Tools.ToRadians(15)), 
		armRightUpperRotation,
		new BABYLON.Vector3(armRightUpperRotation.x - BABYLON.Tools.ToRadians(15)), 
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
		new BABYLON.Vector3(legLeftRotation.x + BABYLON.Tools.ToRadians(50)), 
		legLeftRotation,
		new BABYLON.Vector3(legLeftRotation.x - BABYLON.Tools.ToRadians(50)), 
		legLeftRotation
	]); // An array with all animation keys
	walkLegLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkLegLeft, scene.getNodeByName('leg_left'));

	//**********************RIGHT LEG**********************//
	var walkLegRight = new BABYLON.Animation("walkLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotation = scene.getNodeByName('leg_right').rotation.clone();
	var keys = createAnimationKeys([
		legRightRotation,
		new BABYLON.Vector3(legRightRotation.x - BABYLON.Tools.ToRadians(50)), 
		legRightRotation, 
		new BABYLON.Vector3(legRightRotation.x + BABYLON.Tools.ToRadians(50)), 
		legRightRotation
	]); // An array with all animation keys
	walkLegRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	walkAnimationGroup.addTargetedAnimation(walkLegRight, scene.getNodeByName('leg_right'));
}

// Create idle animation
function createIdleAnimation() {
	//**********************HEAD**********************//
	//Position of left arm to compute an up and down animation
	var startPosHead	= scene.getNodeByName('head').position.y;

	var idleHead = new BABYLON.Animation("idleHead", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosHead, startPosHead - .05, startPosHead, startPosHead + .05, startPosHead]); // An array with all animation keys
	idleHead.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	idleAnimationGroup.addTargetedAnimation(idleHead, scene.getNodeByName('head'));

	//**********************LEFT ARM**********************//
	//Position of left arm to compute an up and down animation
	var startPosL	= scene.getNodeByName('arm_left_upper.001').position.y;

	var idleArmLeft = new BABYLON.Animation("idleArmLeft", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosL, startPosL - .05, startPosL, startPosL + .05, startPosL]); // An array with all animation keys
	idleArmLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	idleAnimationGroup.addTargetedAnimation(idleArmLeft, scene.getNodeByName('arm_left_upper.001'));
	
	//**********************RIGHT ARM**********************//
	//Position of right arm to compute an up and down animation
	var startPosR	= scene.getNodeByName('arm_right_upper.001').position.y;

	var idleArmRight = new BABYLON.Animation("idleArmRight", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosR, startPosR - .05, startPosR, startPosR + .05, startPosR]); // An array with all animation keys
	idleArmRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	idleAnimationGroup.addTargetedAnimation(idleArmRight, scene.getNodeByName('arm_right_upper.001'));

}


// Create rotate to walk animation
function createRotateToWalkAnimation() {
	//**********************TORSO**********************//
	var rotateTorso = new BABYLON.Animation("rotateToWalkTorso", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRady(0), Vec3DegToRady(hero.walkDirecton*15), Vec3DegToRady(hero.walkDirecton*30), Vec3DegToRady(hero.walkDirecton*45), Vec3DegToRady(hero.walkDirecton*60), Vec3DegToRady(hero.walkDirecton*75), Vec3DegToRady(hero.walkDirecton*90)]); // An array with all animation keys
	rotateTorso.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateTorso, scene.getNodeByName('torso'));

	//**********************LEFT ARM**********************//
	var rotateArmLeft = new BABYLON.Animation("rotateArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armLeftUpperRotation = scene.getNodeByName('arm_left_upper.001').rotation.clone();
	var keys = createAnimationKeys([armLeftUpperRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateArmLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateArmLeft, scene.getNodeByName('arm_left_upper.001'));
	
	//**********************RIGHT ARM**********************//
	var rotateArmRight = new BABYLON.Animation("rotateArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armRightUpperRotation = scene.getNodeByName('arm_right_upper.001').rotation.clone();
	var keys = createAnimationKeys([armRightUpperRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateArmRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateArmRight, scene.getNodeByName('arm_right_upper.001'));
	
	//**********************LEFT LEG**********************//
	var rotateLegLeft = new BABYLON.Animation("rotateLegLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legLeftRotation = scene.getNodeByName('leg_left').rotation.clone();
	var keys = createAnimationKeys([legLeftRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateLegLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateLegLeft, scene.getNodeByName('leg_left'));

	//**********************RIGHT LEG**********************//
	var rotateLegRight = new BABYLON.Animation("rotateLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotation = scene.getNodeByName('leg_right').rotation.clone();
	var keys = createAnimationKeys([legRightRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateLegRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToWalkAnimationGroup.addTargetedAnimation(rotateLegRight, scene.getNodeByName('leg_right'));

	rotateToWalkAnimationGroup.speedRatio = 5;
}

// Create rotate to idle animation
function createRotateToIdleAnimation() {
	//**********************TORSO**********************//
	var rotateTorso = new BABYLON.Animation("rotateToIdleTorso", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([Vec3DegToRady(hero.walkDirecton*90),Vec3DegToRady(hero.walkDirecton*75),Vec3DegToRady(hero.walkDirecton*60),Vec3DegToRady(hero.walkDirecton*45),Vec3DegToRady(hero.walkDirecton*30),Vec3DegToRady(hero.walkDirecton*15),Vec3DegToRady(0)]); // An array with all animation keys
	rotateTorso.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateTorso, scene.getNodeByName('torso'));

	//**********************LEFT ARM**********************//
	var rotateArmLeft = new BABYLON.Animation("rotateArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armLeftUpperRotation = scene.getNodeByName('arm_left_upper.001').rotation.clone();
	var keys = createAnimationKeys([armLeftUpperRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateArmLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateArmLeft, scene.getNodeByName('arm_left_upper.001'));
	
	//**********************RIGHT ARM**********************//
	var rotateArmRight = new BABYLON.Animation("rotateArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var armRightUpperRotation = scene.getNodeByName('arm_right_upper.001').rotation.clone();
	var keys = createAnimationKeys([armRightUpperRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateArmRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateArmRight, scene.getNodeByName('arm_right_upper.001'));
	
	//**********************LEFT LEG**********************//
	var rotateLegLeft = new BABYLON.Animation("rotateLegLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legLeftRotation = scene.getNodeByName('leg_left').rotation.clone();
	var keys = createAnimationKeys([legLeftRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateLegLeft.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateLegLeft, scene.getNodeByName('leg_left'));

	//**********************RIGHT LEG**********************//
	var rotateLegRight = new BABYLON.Animation("rotateLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var legRightRotation = scene.getNodeByName('leg_right').rotation.clone();
	var keys = createAnimationKeys([legRightRotation, new BABYLON.Vector3(0,0,0)]); // An array with all animation keys
	rotateLegRight.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	rotateToIdleAnimationGroup.addTargetedAnimation(rotateLegRight, scene.getNodeByName('leg_right'));


	// scene.getNodeByName('leg_left').rotation = new BABYLON.Vector3(0,0,0);
	// scene.getNodeByName('leg_right').rotation = new BABYLON.Vector3(0,0,0);
	rotateToIdleAnimationGroup.speedRatio = 5;
}


function createJumpAnimation(){

    jumpAnimationGroup = new BABYLON.AnimationGroup("jumpGroup");

    // Left Arm
    var jumpLeftArm = new BABYLON.Animation("jumpLeftArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(80), Vec3DegToRadx(160), Vec3DegToRadx(80), Vec3DegToRadx(0)]);
    jumpLeftArm.setKeys(keys);

    jumpAnimationGroup.addTargetedAnimation(jumpLeftArm, scene.getNodeByName('arm_left_upper.001'));

    //Right Arm
    var jumpRightArm = new BABYLON.Animation("jumpRightArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(80), Vec3DegToRadx(160), Vec3DegToRadx(80), Vec3DegToRadx(0)]);
    jumpRightArm.setKeys(keys);

    jumpAnimationGroup.addTargetedAnimation(jumpRightArm, scene.getNodeByName('arm_right_upper.001'));

    //Defining the torso positions at each key frame
    var startPosTorso = scene.getNodeByName("torso").position;
    var upTorsoPos = new BABYLON.Vector3(startPosTorso.x, startPosTorso.y + 0.5, startPosTorso.z);
    var upTorsoPos2 = new BABYLON.Vector3(startPosTorso.x, startPosTorso.y + 1, startPosTorso.z);
    
    //Torso jump animation
    var jumpTorso = new BABYLON.Animation("jumpTorso", "position", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = createAnimationKeys([startPosTorso, upTorsoPos, upTorsoPos2, upTorsoPos, startPosTorso]); // An array with all animation keys
	jumpTorso.setKeys(keys); // Adding the animation array to the animation object
	// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
	jumpAnimationGroup.addTargetedAnimation(jumpTorso, scene.getNodeByName('torso'));


}

function initializeHeroAnimations() { 
	initializeGroupsAnimation();
	createWalkAnimation();
	createIdleAnimation();

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
}