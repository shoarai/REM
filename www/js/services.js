angular.module('starter')

// .service('StorageManager', function() {
//
// })

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
