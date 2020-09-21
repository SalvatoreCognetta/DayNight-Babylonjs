var canvas;
var engine;
var camera;

var framerate = 60;
var down = new BABYLON.Vector3(0,-.8,0);

var torsoRotation;

var rotationToWalkEnded = false;

var direction = 1; // Direction of the hero (1: right, -1: left)