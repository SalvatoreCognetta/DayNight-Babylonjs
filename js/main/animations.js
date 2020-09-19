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

function createWalkAnimation() {
    // Create walk animation
    walkAnimationGroup = new BABYLON.AnimationGroup("walkGroup");

    // Torso
    var walkLegRight = new BABYLON.Animation("walkTorsoRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = createAnimationKeys([Vec3DegToRady(0), Vec3DegToRady(-3), Vec3DegToRady(0), Vec3DegToRady(3), Vec3DegToRady(0)]); // An array with all animation keys
    walkLegRight.setKeys(keys); // Adding the animation array to the animation object
    // Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
    walkAnimationGroup.addTargetedAnimation(walkLegRight, scene.getNodeByName('torso'));

    // Left arm
    var walkArmLeft = new BABYLON.Animation("walkArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(-15), Vec3DegToRadx(0), Vec3DegToRadx(15), Vec3DegToRadx(0)]); // An array with all animation keys
    walkArmLeft.setKeys(keys); // Adding the animation array to the animation object
    // Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
    walkAnimationGroup.addTargetedAnimation(walkArmLeft, scene.getNodeByName('arm_left_upper.001'));

    // Right arm
    var walkArmRight = new BABYLON.Animation("walkArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(15), Vec3DegToRadx(0), Vec3DegToRadx(-15), Vec3DegToRadx(0)]); // An array with all animation keys
    walkArmRight.setKeys(keys); // Adding the animation array to the animation object
    // Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
    walkAnimationGroup.addTargetedAnimation(walkArmRight, scene.getNodeByName('arm_right_upper.001'));

    // Left leg
    var walkLegLeft = new BABYLON.Animation("walkLegLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(15), Vec3DegToRadx(0), Vec3DegToRadx(-15), Vec3DegToRadx(0)]); // An array with all animation keys
    walkLegLeft.setKeys(keys); // Adding the animation array to the animation object
    // Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
    walkAnimationGroup.addTargetedAnimation(walkLegLeft, scene.getNodeByName('leg_left'));

    // Right leg
    var walkLegRight = new BABYLON.Animation("walkLegRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = createAnimationKeys([Vec3DegToRadx(0), Vec3DegToRadx(-15), Vec3DegToRadx(0), Vec3DegToRadx(15), Vec3DegToRadx(0)]); // An array with all animation keys
    walkLegRight.setKeys(keys); // Adding the animation array to the animation object
    // Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
    walkAnimationGroup.addTargetedAnimation(walkLegRight, scene.getNodeByName('leg_right'));

}


function initializeAnimations() { 
    createWalkAnimation();
}