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