var winSound = new BABYLON.Sound("winSound", "../../music/win.wav", scene, null, { volume: 0.5 });
var menuSelect = new BABYLON.Sound("menuSelect", "../../music/menu_select.wav", scene, null, { volume: 0.5 });
var walkSound = new BABYLON.Sound("walkSound", "../../music/footstep.wav", scene, null, {
    volume: 0.5,
    loop: true,
    playbackRate: 0.9
});