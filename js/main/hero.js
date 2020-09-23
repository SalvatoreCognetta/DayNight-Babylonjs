var hero = {
    path : "../models/character/",
    name : "stone.gltf",
    mesh : null,
    startingPosition : new BABYLON.Vector3(-130, 20, -6),

    height : 10.899000000000001,
    headCollision : false,
    lateralCollision : false,

    currentAnimation : animation.IDLE,

    maximumJumpHeight: 35,
    grounded : true, // Says if the hero is grounded

    walkDirecton : 1,

    AABBmesh        : null,
    AABBdimension   : 12,
    AABBposition    : new BABYLON.Vector3(0, 12/2, 0)

};