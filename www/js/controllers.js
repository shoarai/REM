angular.module('starter.controllers', [])

.controller('BoardCtrl', function($scope, $stateParams, $interval) {
  $scope.preCount = 3;

  $scope.currentPoint = 0;
  $scope.currentCount = 1;
  $scope.isCorrect = false;

  $scope.isShowBoard = true;
  isShowEnd = false;

  var countId = $interval(function() {
    if ($scope.isShowBoard && $scope.preCount > 0) {
      $scope.preCount--;
      $scope.isCorrect = true;
    }

    if ($scope.isShowBoard && !$scope.isCorrect) {
      $scope.currentCount--;
      if ($scope.currentCount <= 0) {
        return;
      }
    }
    $scope.isCorrect = false;
    $scope.isShowBoard = !$scope.isShowBoard;

    if (!$scope.isShowBoard) {
      $scope.currentPoint++;
    }
  }, 600);

  $scope.$watch('currentCount', function() {
    if ($scope.currentCount <= 0) {
      $interval.cancel(countId);
      $scope.isShowEnd = true;
    }
  });
})

.directive('board', function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      scope.indexQue = [];
      scope.currentIndex = 4;
      var index = 0;
      scope.$watch('isShowBoard', function() {
        if (scope.isShowBoard) {
          var maxNum = 9;

          // Add and show new cel
          var num = Math.floor(Math.random() * maxNum);
          scope.indexQue.push(num);
          angular.element(elem.find('button')[num]).addClass('button-assertive');

          if (scope.preCount > 0) {
            return;
          }
          scope.currentIndex = scope.indexQue.shift();
          console.log(scope.indexQue, scope.currentIndex);
          angular.element(elem.find('button')[scope.currentIndex]).addClass('lightCircle');
          console.log(num, scope.currentIndex);
        } else {
          var buttons = angular.element(elem.find('button'));
          buttons.text('');
          angular.element(elem.find('button')).removeClass('button-assertive lightCircle');
        }
      });
    }
  };
})

.directive('circle', function() {
  return {
    restrict: 'C',
    link: function(scope, elem) {
      elem.on('touchstart', function() {
        if (elem.hasClass('lightCircle')) {
          scope.isCorrect = true;
          elem.text('◯');
        } else {
          scope.currentCount--;
          elem.text('×');
        }
      });
    }
  };
})

;
