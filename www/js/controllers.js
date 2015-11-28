angular.module('starter.controllers', [])

.controller('BoardCtrl', function($scope, $stateParams, $state, $timeout, $interval, boardManager) {
  $scope.waitCount = $stateParams.waitCount | 0;

  $scope.isEnd = false;

  $scope.point = 0;

  boardManager.init($scope.waitCount + 1);

  var calcIndex = function() {
    boardManager.calcIndex();
    $scope.currentIndex = boardManager.getCurrentIndex();
    $scope.correctIndex = boardManager.getCorrectIndex();
  };

  // var timeId = 0;
  //
  // var showNext = function(index) {
  //   if ($scope.isEnd) { return; };
  //
  //   if ($scope.waitCount > 0) {
  //     $scope.waitCount--;
  //     calcIndex();
  //     timeId = $timeout(function() {
  //       showNext(-1);
  //     }, 600);
  //     return;
  //   }
  //
  //   if (index === $scope.correctIndex) {
  //     $scope.point++;
  //     calcIndex();
  //     timeId = $timeout(function() {
  //       showNext(-1);
  //     }, 600);
  //   } else {
  //     $scope.isEnd = true;
  //   }
  // };

  $scope.onclickRestart = function() {
    $state.reload();
  };

  var selectedIndex = -1;

  $scope.onclickCell = function(index) {
    // showNext(index);
    selectedIndex = index;
  };

  $interval(function() {
    if ($scope.isEnd) { return; };

    if ($scope.waitCount > 0) {
      $scope.waitCount--;
      calcIndex();
      return;
    }

    if (selectedIndex === $scope.correctIndex) {
      $scope.point++;
      calcIndex();
    } else {
      $scope.isEnd = true;
    }
  }, 600);

  calcIndex();
  // timeId = $timeout(function() {
  //   showNext(-1);
  // }, 1000);



  // $interval(calcIndex, 1000)

  // $timeout(function() {
  //   $scope.isCorrect = true;
  // }, 800);
  //
  // var showNext = function() {
  //   $timeout(function() {
  //     $scope.waitingCount--;
  //   }, 800);
  // }
  //
  // $scope.$watch('waitingCount', function() {
  //   calcIndex();
  // });


  // $scope.currentPoint = 0;
  // $scope.currentCount = 1;
  // $scope.isCorrect = false;
  //
  // $scope.isShowBoard = true;
  // isShowEnd = false;
  //
  // var countId = $interval(function() {
  //   if ($scope.isShowBoard && $scope.preCount > 0) {
  //     $scope.preCount--;
  //     $scope.isCorrect = true;
  //   }
  //
  //   if ($scope.isShowBoard && !$scope.isCorrect) {
  //     $scope.currentCount--;
  //     if ($scope.currentCount <= 0) {
  //       return;
  //     }
  //   }
  //   $scope.isCorrect = false;
  //   $scope.isShowBoard = !$scope.isShowBoard;
  //
  //   if (!$scope.isShowBoard) {
  //     $scope.currentPoint++;
  //   }
  // }, 600);
  //
  // $scope.$watch('currentCount', function() {
  //   if ($scope.currentCount <= 0) {
  //     $interval.cancel(countId);
  //     $scope.isShowEnd = true;
  //   }
  // });
})

.directive('board', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      scope.$watch('currentIndex', function() {
        var buttons = element.find('button');
        angular.element(buttons).removeClass('current');
        angular.element(buttons[scope.currentIndex]).addClass('current');
      });

      scope.$watch('correctIndex', function() {
        if (scope.correctIndex < 0) {
          return;
        }
        return;
        var buttons = element.find('button');
        angular.element(buttons).removeClass('correct');
        angular.element(buttons[scope.correctIndex]).addClass('correct');
      });
      return;

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
          // console.log(scope.indexQue, scope.currentIndex);
          angular.element(elem.find('button')[scope.currentIndex]).addClass('lightCircle');
          // console.log(num, scope.currentIndex);
        } else {
          var buttons = angular.element(elem.find('button'));
          buttons.text('');
          angular.element(elem.find('button')).removeClass('button-assertive lightCircle');
        }
      });
    }
  };
})

.directive('cell', function() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      return;

      element.on('touchstart', function() {
        if (element.hasClass('correct')) {
          scope.isCorrect = true;
        } else {
          scope.isCorrect = false;
        }
        console.log(scope.isCorrect);
      });

      return;

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
