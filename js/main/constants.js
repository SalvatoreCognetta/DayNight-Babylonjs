var canvas;
var engine;
var camera;

var framerate = 60;
var down = new BABYLON.Vector3(0,-.5,0);

// Animations
var animating = true;

const animation = {
    IDLE        : 0,
    IDLETOWALK  : 1,
    WALK        : 2,
    WAKJTOIDLE  : 3
}

var torsoRotation;

var rotationToWalkEnded = false;
var rotationToIdleEnded = false;

var direction = 1; // Direction of the hero (1: right, -1: left)

// Light
var lightDay;
var lightNight;
var day = true;
var lightButtonClicked = true;

// Skybox
var skyboxDay = null;
var skyboxNight = null;

// Platforms
var platforms = [];

const objShow = {
    ALWAYS  : 0,
    DAY     : 1,
    NIGHT   : 2
}

var platformDepth = 30;
var platformHeight = 5;
var platformWidthSmall = 20;
var platformWidthBig = 35;

// Game
var backgroundVolume = 0.1;
var soundEffectVolume = 0.5;

// UI
var advancedTexture = null;
var gameMenu = null;

var debug = false;