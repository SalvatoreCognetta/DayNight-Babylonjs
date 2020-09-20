// Keyboard events
var inputMap = {};
scene.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));

//Rendering loop (executed for everyframe)
scene.onBeforeRenderObservable.add(() => {
    var keydown = false;
    //Manage the movements of the character (e.g. position, direction)
    if (inputMap["w"]) {
        hero.moveWithCollisions(hero.right.scaleInPlace(2));
        keydown = true;
    }
    if (inputMap["s"]) {
        hero.moveWithCollisions(hero.forward.scaleInPlace(-1));
        keydown = true;
    }
    if (inputMap["a"]) {
        hero.moveWithCollisions(hero.right.scaleInPlace(2));
        walkAnimationGroup.play(true);
        keydown = true;
    }
    if (inputMap["d"]) {
        hero.moveWithCollisions(hero.right.scaleInPlace(-1));
        rotateToWalkAnimationGroup.play();
        walkAnimationGroup.play(true);
        keydown = true;
    }
    if (inputMap["b"]) {
        keydown = true;
    }

    // //Manage animations to be played  
    // if (keydown) {
    //     if (!animating) {
    //         animating = true;
    //         if (inputMap["s"]) {
    //             //Walk backwards
    //             walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
    //         }
    //         else if
    //             (inputMap["b"]) {
    //             //Samba!
    //             sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
    //         }
    //         else {
    //             //Walk
    //             walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
    //         }
    //     }
    // }
    // else {

    //     if (animating) {
    //         //Default animation is idle when no key is down     
    //         idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

    //         //Stop all animations besides Idle Anim when no key is down
    //         sambaAnim.stop();
    //         walkAnim.stop();
    //         walkBackAnim.stop();

    //         //Ensure animation are played only once per rendering loop
    //         animating = false;
    //     }
    // }
});


