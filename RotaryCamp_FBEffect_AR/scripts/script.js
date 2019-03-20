/*
Welcome to scripting in Spark AR Studio!
From making things move to triggering audio clips,
reactive programming can help you achieve your scripting goals.

Helpful links:

Scripting Basics - https://fb.me/spark-scripting-basics
Reactive Programming - https://fb.me/spark-reactive-programming
Changelogs - https://fb.me/spark-changelog

Note: Feel free to delete the contents of this script and start from scratch.
*/

// How to load in modules, complete list - https://fb.me/spark-scripting-reference
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Materials = require('Materials')
const Textures = require('Textures');
const Audio = require('Audio')
const Reactive = require('Reactive')

// How to access scene objects
const viewOne = Scene.root.find('plane0')
const playbackController = Audio.getPlaybackController('Rotary_Audio');
const videoMaterial = Materials.get('video')
const videoTexture = Textures.get('why_we_love_camp_vid')
const planeTracker = Scene.root.find('planeTracker');

playbackController.loop();

let savedVideoTextureURL = 'https://video.wixstatic.com/video/53058a_5099117a97e746c4ba794b93eaf76cc5/360p/mp4/file.mp4';

planeTracker.confidence.eq('HIGH').onOn({fireOnInitialValue: true}).subscribe(function() {
    videoTexture.url = Reactive.val(savedVideoTextureURL);
});

planeTracker.confidence.eq('HIGH').onOff({fireOnInitialValue: true}).subscribe(function() {
  savedVideoTextureURL = videoTexture.url.pinLastValue();
  videoTexture.url = '';
});

// How to log values to the console
Diagnostics.log('I am a console message logged from the script');


