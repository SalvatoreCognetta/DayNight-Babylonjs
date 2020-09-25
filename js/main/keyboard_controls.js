// Keyboard events
var inputMap = {};
var inputUpMap = {};
scene.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    inputUpMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keyup";
}));
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    inputUpMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keyup";
}));

var walkSoundTimer = null;

if (hero.mesh != null)
    var startingPosition = hero.mesh.position.y;
//Rendering loop (executed for everyframe)
scene.onBeforeRenderObservable.add(() => {
    var keydown = false;
    if (!hero.goalReached && !hero.pause) {
        //Manage the movements of the character (e.g. position, direction)
        if (inputMap["w"] || inputMap["W"]) {
            // Jump
            if (hero.mesh.position.y < startingPosition + hero.maximumJumpHeight && hero.grounded && !hero.headCollision) {
                hero.mesh.moveWithCollisions(new BABYLON.Vector3(0, 2, 0));
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
            lightButtonClicked = true;
            keydown = true;
        }

        // The hero cannot jump while in the air and the 
        // w key is released
        if (inputUpMap["w"] || inputUpMap["W"]) {
            hero.grounded = false;
        }

        if (hero.mesh != null && !keydown)
            startingPosition = hero.mesh.position.y;
    }

    //Manage animations to be played  
    if (keydown) {
        if (!animating) {
            animating = true;
            if (inputMap["d"] || inputMap["D"]) {
                //Walk Right
                if (walkSoundTimer == null) {
                    walkSound.play();
                    walkSoundTimer = setInterval(function () { walkSound.play(); }, 500);
                    console.log(walkSoundTimer);
                }

                hero.walkDirecton = 1;
                createRotateToWalkAnimation();
                if (!rotationToWalkEnded) {
                    hero.currentAnimation = animation.IDLETOWALK;
                    rotateToWalkAnimationGroup.play(); // At the end of the IdleToWalk animation is called the walk animation itself
                }

                keydown = true;
            } else if (inputMap["a"] || inputMap["A"]) {
                //Walk Left
                if (walkSoundTimer == null) {
                    walkSound.play();
                    walkSoundTimer = setInterval(function () { walkSound.play(); }, 500);
                }

                hero.walkDirecton = -1;
                createRotateToWalkAnimation();
                if (!rotationToWalkEnded) {
                    hero.currentAnimation = animation.IDLETOWALK;
                    rotateToWalkAnimationGroup.play();
                }
            }
            if (inputMap["l"] || inputMap["L"]) {
                lightSwitch.play();
                day = !day;
                if (day) {
                    lanternAnimationGroup.reset();
                    lanternAnimationGroup.stop();
                } else {
                    lanternAnimationGroup.play(true);
                }
            }

            if ((inputMap["w"] || inputMap["W"]) && hero.grounded) {
                jumpAnimationGroup.play();
                jumpSound.play();
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
            } else {
                //Default animation is idle when no key is down     
                idleAnimationGroup.reset();
                idleAnimationGroup.start(true, 1.0, idleAnimationGroup.from, idleAnimationGroup.to, false);

            }
            //Stop all animations besides Idle Anim when no key is down
            walkAnimationGroup.reset();
            walkAnimationGroup.stop();

            //Ensure animation are played only once per rendering loop
            animating = false;

            rotationToWalkEnded = false;
            checkIdle();
        }

        if (walkSoundTimer != null) {
            clearInterval(walkSoundTimer);
            walkSoundTimer = null;
        }
    }

});


/**
 * Check if there are no keys pressed
 * and if the hero is not in idle animation
 * changes to that animation
 */
function checkIdle() {
    if (hero.currentAnimation != animation.IDLE) {
        var moving = false;
        var keys = Object.keys(inputMap);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key == "w" || key == "W" || key == "a" || key == "A" || key == "s" || key == "S") {
                if (inputMap[key]) {
                    console.log("Key:"+ key);
                    moving = true;
                }
            }
        }
        if (!moving && hero.currentAnimation != animation.IDLE) {
            console.log("Starting idle")
            idleAnimationGroup.start(true, 1.0, idleAnimationGroup.from, idleAnimationGroup.to, false);
        }
    }
}