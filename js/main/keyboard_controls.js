// Keyboard events
var inputMap = {};
scene.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));


if (hero.mesh != null)
    var startingPosition = hero.mesh.position.y;
//Rendering loop (executed for everyframe)
scene.onBeforeRenderObservable.add(() => {
    var keydown = false;
    //Manage the movements of the character (e.g. position, direction)
    if (inputMap["w"] || inputMap["W"] || inputMap[" "]) {
        // Jump
        if (hero.mesh.position.y < startingPosition + hero.maximumJumpHeight && hero.grounded && !hero.headCollision) {
            hero.mesh.moveWithCollisions(new BABYLON.Vector3(0, 1.5, 0));
            checkHeadCollision();
        } else
            hero.grounded = false;
        keydown = true;
    }
    if (inputMap["s"]) {
        // hero.moveWithCollisions(hero.forward.scaleInPlace(-1));
        keydown = true;
    }
    if (inputMap["a"] || inputMap["A"]) {
        checkLateralCollision(-1);
        if (hero.walkDirecton == 1)
            animating = false;
        // Walk left
        if (!hero.lateralCollision)
            hero.mesh.moveWithCollisions(new BABYLON.Vector3(-1, 0, 0));

        // Check if the hero is facing the right direction
        var torsoRotation = scene.getNodeByName('torso').rotation;
        if (hero.currentAnimation == animation.WALK && torsoRotation.y != BABYLON.Tools.ToRadians(-90))
            torsoRotation.y = BABYLON.Tools.ToRadians(-90);

        keydown = true;
    }
    if (inputMap["d"] || inputMap["D"]) {
        checkLateralCollision(1);
        if (hero.walkDirecton == -1)
            animating = false;
        //Walk right
        if (!hero.lateralCollision)
            hero.mesh.moveWithCollisions(new BABYLON.Vector3(1, 0, 0));

        // Check if the hero is facing the right direction
        var torsoRotation = scene.getNodeByName('torso').rotation;
        if (hero.currentAnimation == animation.WALK && torsoRotation.y != BABYLON.Tools.ToRadians(90))
            torsoRotation.y = BABYLON.Tools.ToRadians(90);

        keydown = true;
    }
    if (inputMap["l"] || inputMap["L"]) {
        keydown = true;
    }

    if (hero.mesh != null && !keydown)
        startingPosition = hero.mesh.position.y;

    //Manage animations to be played  
    if (keydown) {
        if (!animating) {
            animating = true;
            if (inputMap["d"] || inputMap["D"]) {
                //Walk 
                hero.walkDirecton = 1;
                createRotateToWalkAnimation();
                if (!rotationToWalkEnded) {
                    hero.currentAnimation = animation.IDLETOWALK;
                    rotateToWalkAnimationGroup.play(); // At the end of the IdleToWalk animation is called the walk animation itself
                }

                keydown = true;
            } else if (inputMap["a"] || inputMap["A"]) {
                console.log("test");
                hero.walkDirecton = -1;
                createRotateToWalkAnimation();
                if (!rotationToWalkEnded) {
                    hero.currentAnimation = animation.IDLETOWALK;
                    rotateToWalkAnimationGroup.play();
                }
            } else if (inputMap["l"] || inputMap["L"]) {
                day = !day;
            }
        }
    } else {
        hero.grounded = false;
        hero.headCollision = false;
        hero.lateralCollision = false;
        if (hero.mesh != null && animating) {
            if (hero.currentAnimation != animation.IDLE) {
                hero.currentAnimation = animation.WALKTOIDLE;
                createRotateToIdleAnimation();
                walkAnimationGroup.stop();
                rotateToWalkAnimationGroup.stop();
                rotateToIdleAnimationGroup.play();
            }
            else {
                //Default animation is idle when no key is down     
                idleAnimationGroup.reset();
                idleAnimationGroup.start(true, 1.0, idleAnimationGroup.from, idleAnimationGroup.to, false);

            }
            // //Stop all animations besides Idle Anim when no key is down
            // walkAnimationGroup.reset();
            // walkAnimationGroup.stop();

            //Ensure animation are played only once per rendering loop
            animating = false;

            rotationToWalkEnded = false;
        }

        if (rotateToIdleAnimationGroup != null) {
            // rotateToIdleAnimationGroup.play();
        }
    }
});


