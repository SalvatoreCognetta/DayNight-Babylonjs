var lantern = {
    path : "../models/lamp/",
    name : "lantern.gltf",
    mesh : null,
    startingPosition : new BABYLON.Vector3(-80, 1, 8),
    startingOrientation : new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0),
    scale : new BABYLON.Vector3(10, 10, 10),

    tutorialPlayed : false,

    AABBmesh        : null,
    AABBdimension   : 12

};