var hero = {
    path : "../models/character/",
    name : "stone.gltf",
    mesh : null,
    startingPosition : new BABYLON.Vector3(-20, 10, -6),

    currentAnimation : animation.IDLE,

    grounded : true, // Says if the hero is grounded

    walkDirecton : 1,

    AABBmesh        : null,
    AABBdimension   : 12,
    AABBposition    : new BABYLON.Vector3(0, 12/2, 0)

};