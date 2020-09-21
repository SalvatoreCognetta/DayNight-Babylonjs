// Keyboard events
var inputMap = {};
scene.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));

var startingPosition = 0;
var touchGround = false;
//Rendering loop (executed for everyframe)
scene.onBeforeRenderObservable.add(() => {
    var keydown = false;
    //Manage the movements of the character (e.g. position, direction)
    if (inputMap["w"]) {
        if (hero.mesh.position.y < startingPosition + 45 && hero.grounded) {
            hero.mesh.moveWithCollisions(new BABYLON.Vector3(0, 1, 0));
            // hero.mesh.position.y = hero.AABBmesh.position.y-5;
        } else
            touchGround = true;
        keydown = true;
    }
    if (inputMap["s"]) {
        // hero.moveWithCollisions(hero.forward.scaleInPlace(-1));
        keydown = true;
    }
    if (inputMap["a"] || inputMap["A"]) {
        // hero.walkDirecton = -1;
        // if (!rotationToWalkEnded) {
        //     hero.currentAnimation = animation.IDLETOWALK;
        //     rotateToWalkAnimationGroup.play();
        // } else {
        //     hero.mesh.moveWithCollisions(new BABYLON.Vector3(-1,0,0));
        //     walkAnimationGroup.play();
        // }

        hero.mesh.moveWithCollisions(new BABYLON.Vector3(-1, 0, 0));
        keydown = true;
    }
    if (inputMap["d"] || inputMap["D"]) {
        //Walk 
        // hero.walkDirecton = 1;
        // if (!rotationToWalkEnded) {
        //     hero.currentAnimation = animation.IDLETOWALK;
        //     rotateToWalkAnimationGroup.play();
        // } else {
        //     // hero.AABBmesh.moveWithCollisions(new BABYLON.Vector3(1,0,0));
        //     hero.mesh.moveWithCollisions(new BABYLON.Vector3(1,0,0));
        //     walkAnimationGroup.play();
        // }

        hero.mesh.moveWithCollisions(new BABYLON.Vector3(1, 0, 0));
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
                } else {
                    // hero.currentAnimation = animation.WALK;
                    // walkAnimationGroup.play(true);
                }

                keydown = true;
            } else if (inputMap["a"] || inputMap["A"]) {
                hero.walkDirecton = -1;
                createRotateToWalkAnimation();
                if (!rotationToWalkEnded) {
                    hero.currentAnimation = animation.IDLETOWALK;
                    rotateToWalkAnimationGroup.play();
                } 
            }
        }
    } else {
        hero.grounded = false;
        if (hero.mesh != null && animating) {
            console.log("test");
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


