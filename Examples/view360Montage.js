//Author: Bob Read, University of Liverpool
//Last update: July 2020

//Variables
if (!startFrame) {
	var startFrame = 0;
}
var currentFrame = startFrame;

if (!startZoom) {
	var startZoom = 1;
} else {
	startZoom = clamp(startZoom, 1, 4);
}
var currentZoom = startZoom;

if (!startXOffset) {
	var startXOffset = 0;
} else {
	startXOffset = clamp(startXOffset, 0, startZoom - 1);
}
var currentXOffset = startXOffset;

if (!startYOffset) {
	var startYOffset = 0;
} else {
	startYOffset = clamp(startYOffset, 0, startZoom - 1);
}
var currentYOffset = startYOffset;

if (!rotateSensitivity) {
	var rotateSensitivity = 0.25;
}
if (!zoomSensitivity) {
	var zoomSensitivity = 0.005;
}
if (!panSensitivity) {
	var panSensitivity = 0.002;
}

var totalFrames = xImages * yImages;
var startPosX, startPosY, startFrameX, startFrameY;

var viewer = document.getElementById("viewer");
var shftKey = false;
var ctrlKey = false;

//Initialize viewer window
updateView = function() {
	var imgX = (currentFrame % xImages * currentZoom + currentXOffset) * scale * xImagePixels;
	var imgY = (Math.floor(currentFrame / xImages) * currentZoom + currentYOffset) * scale * yImagePixels;
	viewer.style.backgroundPosition = "-" + imgX + "px -" + imgY + "px";
}
resize = function() {
	viewer.style.width = xImagePixels * scale + "px";
	viewer.style.height = yImagePixels * scale + "px";
	viewer.style.backgroundSize = (xImagePixels * xImages) * scale * currentZoom + "px " + (yImagePixels * yImages) * scale * currentZoom + "px";
	updateView();
}
if (!scale) {
	var scaleX = window.innerWidth/xImagePixels;
	var scaleY = window.innerHeight/yImagePixels;
	var scale = scaleX < scaleY ? scaleX : scaleY;
	window.addEventListener("resize", function() {
		scaleX = window.innerWidth/xImagePixels;
		scaleY = window.innerHeight/yImagePixels;
		scale = scaleX < scaleY ? scaleX : scaleY;
		resize();
	});
}
viewer.style.background = "url('" + montageSrc + "')";
viewer.style.cursor = "ew-resize";
resize();

//Add mouse events
viewer.onmousedown = function(e) {
	document.addEventListener("mouseup", mouseUp);
	document.addEventListener("mousemove", mouseMove);
	startFrame = currentFrame;
	startZoom = currentZoom;
	startXOffset = currentXOffset;
	startYOffset = currentYOffset;
	startPosX = e.offsetX;
	startPosY = e.offsetY;
	startFrameX = (startPosX/(scale*xImagePixels)+startXOffset)/startZoom;
	startFrameY = (startPosY/(scale*yImagePixels)+startYOffset)/startZoom;
}
mouseUp = function() {
	document.removeEventListener("mouseup", mouseUp);
	document.removeEventListener("mousemove", mouseMove);
}
mouseMove = function(e) {
	var mouseDeltaX, mouseDeltaY;
	if (shftKey) {
		mouseDeltaY = (e.offsetY - startPosY) * zoomSensitivity;
		currentZoom = clamp(startZoom + mouseDeltaY, 1, 4);
		viewer.style.backgroundSize = (xImagePixels * xImages) * scale * currentZoom + "px " + (yImagePixels * yImages) * scale * currentZoom + "px";
		currentXOffset = clamp(startXOffset + (currentZoom - startZoom) * startFrameX, 0, currentZoom - 1);
		currentYOffset = clamp(startYOffset + (currentZoom - startZoom) * startFrameY, 0, currentZoom - 1);
		updateView();
	} else if (ctrlKey) {
		mouseDeltaX = (e.offsetX - startPosX) * panSensitivity;
		mouseDeltaY = (e.offsetY - startPosY) * panSensitivity;
		currentXOffset = clamp(startXOffset - mouseDeltaX, 0, currentZoom - 1);
		currentYOffset = clamp(startYOffset - mouseDeltaY, 0, currentZoom - 1);
		updateView();
	} else {
		mouseDeltaX = (e.offsetX - startPosX) * rotateSensitivity + startFrame;
		currentFrame = modulus(mouseDeltaX, totalFrames);
		updateView();
	}
}
//Add touch events
viewer.ontouchstart = function(e) {
	document.addEventListener("touchend", touchEnd);
	document.addEventListener("touchmove", touchMove);
	startFrame = currentFrame;
	startPosX = e.changedTouches[0].screenX
}
touchEnd = function() {
	document.removeEventListener("touchend", touchEnd);
	document.removeEventListener("touchmove", touchMove);
}
touchMove = function(e) {
	var touchDeltaX = (e.changedTouches[0].screenX - startPosX) * rotateSensitivity + startFrame;
	currentFrame = modulus(touchDeltaX, totalFrames);
	updateView();
}
//Add keyboard events
document.onkeydown = function(e) {
	switch (e.key) {
	case "Shift":
		shftKey = true, ctrlKey = false;
		viewer.style.cursor = "zoom-in";
		break;
	case "Control":
		shftKey = false, ctrlKey = true;
		viewer.style.cursor = "move";
		break;
	}
}
document.onkeyup = function(e) {
	shftKey = false, ctrlKey = false;
	viewer.style.cursor = "ew-resize";
}
//Circular modulus function
function modulus(a, b) {
	var result = a % b;
	if (a < 0) {
		return Math.ceil(result + b) - 1
	} else {
		return Math.floor(result)
	}
}
function clamp(val, min, max) {
	return val > max ? max : val < min ? min : val;
}