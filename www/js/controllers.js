angular.module('starter.controllers', [])

.controller('BoardCtrl', function($scope, $stateParams, $interval) {
  $scope.currentPoint = 0;
  $scope.currentCount = 1;
  $scope.isCorrect = false;

  $scope.isShowBoard = true;
  $scope.isShowEnd = false;

  var preCount = 2;

  var countId = $interval(function() {
    if ($scope.isShowBoard && preCount > 0) {
      preCount--;
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
  }, 800);

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
      scope.indexQue = [4];
      scope.currentIndex = [4];
      var index = 0;
      scope.$watch('isShowBoard', function() {
        if (scope.isShowBoard) {
          var maxNum = 9;
          var num = Math.floor(Math.random() * maxNum);
          scope.indexQue.push(num);
          scope.currentIndex = scope.indexQue.pop();
          angular.element(elem.find('button')[scope.currentIndex]).addClass('button-assertive lightCircle');
        } else {
          var buttons = angular.element(elem.find('button'));
          buttons.text('');
          angular.element(buttons[scope.currentIndex]).removeClass('button-assertive lightCircle');
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
