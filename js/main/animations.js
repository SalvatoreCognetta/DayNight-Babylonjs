/**
 * Create a list of keys of dimension values.size, 
 * with the specified values
 * @param {Array} values array of values
 */
var createAnimationKeys = function(values) {
    var keys = [];
    var num_values = values.size-1;

    for (var i = 0; i < values.size; i++) {
        keys.push({
            frame: i*framerate/num_values, // We subdivide the framerate in n part, each of which has it's own value
            value: values[i] // The value of the animation
        });
    }

    return keys;
}



// An AnimationGroup allows you to link together animations and meshes and play them, pause them and stop them as a group.

// To create an animation we follow the doc: https://doc.babylonjs.com/babylon101/animations
// Create walk animation
var walkAnimationGroup = new BABYLON.AnimationGroup("walkGroup");

// Left leg
var walkLegLeft = new BABYLON.Animation("walkLegLeft", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var keys = createAnimationKeys([Vec3Radx(0), Vec3x(15), Vec3x(30), Vec3x(15), Vec3x(0)]); // An array with all animation keys
walkLegLeft.setKeys(keys); // Adding the animation array to the animation object
// Use the addTargetedAnimation method to link the animations with the meshes and add these to the groups
walkAnimationGroup.addTargetedAnimation(walkLegLeft, scene.getNodeByName('leg_left'));
