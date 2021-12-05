var winSound;
var menuSelect;
var backgroundMusic;
var menuBackgroundMusic;
var walkSound;
var jumpSound;
var groundImpactSound;
var lightSwitch;

function createSounds(scene) {
    winSound = new BABYLON.Sound("winSound", "../music/win.wav", scene, null, { volume: soundEffectVolume });
    menuSelect = new BABYLON.Sound("menuSelect", "../music/menu_select.wav", scene, null, { volume: soundEffectVolume });
    backgroundMusic = new BABYLON.Sound("backgroundMusic", "../music/background_music.wav", scene, null, {
        volume: backgroundVolume,
        loop: true
    });
    walkSound = new BABYLON.Sound("walkSound", "../music/footstep.wav", scene, null, {
        volume: soundEffectVolume,
        playbackRate: 0.9
    });
    jumpSound = new BABYLON.Sound("jumpSound", "../music/jump.wav", scene, null, { volume: soundEffectVolume });
    groundImpactSound = new BABYLON.Sound("groundImpactSound", "../music/ground_impact.wav", scene, null, { volume: soundEffectVolume });
    lightSwitch = new BABYLON.Sound("lightSwitch", "../music/light_switch.wav", scene, null, { volume: soundEffectVolume });
}

function setVolume() {
    winSound.setVolume(soundEffectVolume);
    menuSelect.setVolume(soundEffectVolume);
    backgroundMusic.setVolume(backgroundVolume);
    walkSound.setVolume(soundEffectVolume);
    jumpSound.setVolume(soundEffectVolume);
    lightSwitch.setVolume(soundEffectVolume);

}

function createMenuSounds(scene){

    menuSelect = new BABYLON.Sound("menuSelect", "../music/menu_select.wav", scene, null, { volume: soundEffectVolume });
    // music taken from https://freesound.org/people/Clacksberg/sounds/506324/ 
    menuBackgroundMusic = new BABYLON.Sound("menuBackgroundMusic", "../music/menu_background_music.wav", scene, null, {
        volume: backgroundVolume,
        autoplay: true,
        loop:true
    });

}

function setMenuVolume(){
    menuSelect.setVolume(soundEffectVolume);
    menuBackgroundMusic.setVolume(backgroundVolume);
}