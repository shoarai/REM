angular.module('starter')

.service('BoardManager', function() {
  var maxIndex = 8;
  var queLength = 0;
  var indexQue = [];

  this.init = function(length) {
    queLength = length;
    indexQue = [];
  };

  this.calcIndex = function() {
    if (!this.isWaiting()) {
      indexQue.shift();
    }
    var random = Math.floor(Math.random() * (maxIndex + 1));
    indexQue.push(random);
  };

  this.isWaiting = function() {
    return indexQue.length < queLength;
  };

  this.getCurrentIndex = function() {
    if (indexQue.length > 0) {
      return indexQue[indexQue.length - 1];
    }
  };

  this.getCorrectIndex = function() {
    if (this.isWaiting()) {
      return -1;
    }
    return indexQue[0];
  };
})

.service('AudioManager', function() {
  var dir = 'audio/';
  var waitSrc = dir + 'button04a.mp3';
  var rotineSrc = dir + 'button03a.mp3';
  var endSrc = dir + 'button05.mp3';

  var path = (function () {
    var str = location.pathname;
    var i = str.lastIndexOf('/');
    return str.substring(0,i+1);
  }());

  var createAudio = function(src, success, error) {
    try {
      return new Media(path + src, success, error);
    } catch (e) {
      return new Audio(src, success, error);
    }
  }

  var mediaStatusCallback = function(status) {
    console.log('mediaStatusCallback', status);
  };

  var waitAudio = createAudio(waitSrc, null, null);
  var rotineAudio = createAudio(rotineSrc, null, null);
  var endAudio = createAudio(endSrc, null, null);
  var media;
  var cordova;

  this.init = function(cordovaMedia) {
    // media = cordovaMedia.newMedia(src);
    cordova = cordovaMedia;

    // $cordovaNativeAudio
    //   .preloadSimple('music', 'audio/button02a.mp3')
    //   .then(function (msg) {
    //     console.log(msg);
    //   }, function (error) {
    //     console.error(error);
    //   });
  };

  this.playWait = function() {
    cordova.play(waitAudio);
  };

  this.playRoutine = function() {
    // media.play();
    cordova.play(rotineAudio);
  };

  this.playEnd = function() {
    cordova.play(endAudio);
  };
})

;
