angular.module('starter.controllers', [])

.controller('BoardCtrl', function($scope, $stateParams, $state, $timeout, $interval, boardManager) {
  $scope.waitCount = $stateParams.waitCount | 0;
  $scope.point = 0;

  $scope.isEnd = false;

  boardManager.init($scope.waitCount + 1);

  var calcIndex = function() {
    boardManager.calcIndex();
    $scope.currentIndex = boardManager.getCurrentIndex();
    $scope.correctIndex = boardManager.getCorrectIndex();
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
