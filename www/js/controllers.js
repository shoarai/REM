angular.module('starter.controllers', ['ngStorage'])

.controller('MenuCtrl', function($scope, $state, $localStorage) {
  // $localStorage.$reset();

  $scope.$storage = $localStorage.$default({
    current: { level: 1 },
    levels: [{ point: 0 }, { point: 0 }]
  });

  var levels = $scope.$storage.levels;

  if (levels[levels.length - 1].point >= 20) {
    levels.push({ point: 0 })
  }

  $scope.onclickStart = function() {
    $state.go('showing', {waitCount: $scope.$storage.current.level});
  }
})

.controller('BoardCtrl', function($scope, $stateParams, $state, $localStorage, $timeout, $interval, BoardManager) {
  $scope.$storage = $localStorage;

  var level = $stateParams.waitCount | 0;

  $scope.waitCount = $stateParams.waitCount | 0;
  $scope.point = 0;

  $scope.isEnd = false;

  BoardManager.init($scope.waitCount + 1);

  var calcIndex = function() {
    BoardManager.calcIndex();
    $scope.currentIndex = BoardManager.getCurrentIndex();
    $scope.correctIndex = BoardManager.getCorrectIndex();
  };

  $scope.selectedIndex = -1;

  $scope.onclickRestart = function() {
    $state.reload();
  };

  $scope.onclickCell = function(index) {
    if ($scope.waitCount > 0) {
      return;
    }
    if ($scope.selectedIndex !== -1) {
      return;
    }
    $scope.selectedIndex = index;
  };

  $interval(function() {
    if ($scope.isEnd) { return; };

    if ($scope.waitCount > 0) {
      $scope.waitCount--;
      calcIndex();
      return;
    }

    if ($scope.selectedIndex === $scope.correctIndex) {
      $scope.selectedIndex = -1;
      $scope.point++;
      var oldLevel = $scope.$storage.levels[level];
      if ($scope.point > oldLevel.point) {
        oldLevel.point = $scope.point;
      }
      calcIndex();
    } else {
      $scope.isEnd = true;
    }
  }, 650);

  calcIndex();
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
        var buttons = element.find('button');
        angular.element(buttons).removeClass('correct');
        angular.element(buttons[scope.correctIndex]).addClass('correct');

        angular.element(buttons).removeClass('selected');
      });

      scope.$watch('selectedIndex', function() {
        if (scope.selectedIndex < 0) {
          return;
        }
        var buttons = element.find('button');
        // angular.element(buttons).removeClass('selected');
        angular.element(buttons[scope.selectedIndex]).addClass('selected');
      });
    }
  };
})

;
