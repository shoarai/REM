angular.module('starter.controllers', ['ngStorage', 'ngCordova'])

.controller('MenuCtrl', function($scope, $state, $localStorage) {
  // $localStorage.$reset();

  $scope.$storage = $localStorage.$default({
    current: { level: 1 },
    levels: [{ score: 0 }, { score: 0 }]
  });

  var levels = $scope.$storage.levels;

  if (levels[levels.length - 1].score >= 20) {
    levels.push({ score: 0 })
  }

  $scope.onclickStart = function() {
    $state.go('showing', {waitCount: $scope.$storage.current.level});
  }
})

.controller('BoardCtrl', function(
  $scope, $stateParams, $state, $timeout, $interval,
  $localStorage, $cordovaMedia, $cordovaNativeAudio,
  BoardManager, AudioManager) {

  var boardInterval = 650;

  $scope.$storage = $localStorage;
  $scope.$state = $state;

  var level = $stateParams.waitCount | 0;

  $scope.waitCount = $stateParams.waitCount | 0;
  $scope.score = 0;

  $scope.isEnd = false;

  BoardManager.init($scope.waitCount + 1);
  AudioManager.init($cordovaMedia);

  var calcIndex = function() {
    BoardManager.calcIndex();
    $scope.currentIndex = BoardManager.getCurrentIndex();
    $scope.correctIndex = BoardManager.getCorrectIndex();

    if ($scope.waitCount > 0) {
      AudioManager.playRoutine();
    } else {
      AudioManager.playWait();
    }
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
    if ($scope.isEnd) { return; }

    if ($scope.waitCount > 0) {
      $scope.waitCount--;
      calcIndex();
      return;
    }

    if ($scope.selectedIndex === $scope.correctIndex) {
      $scope.selectedIndex = -1;
      $scope.score++;
      var oldLevel = $scope.$storage.levels[level];
      if ($scope.score > oldLevel.score) {
        oldLevel.score = $scope.score;
      }
      calcIndex();
    } else {
      $scope.isEnd = true;
      AudioManager.playEnd();
    }
  }, boardInterval);

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

        // if (!scope.isEnd) { return; }
        // angular.element(buttons[scope.selectedIndex]).text('Menu')
        //   .on('click', function() {
        //     scope.$state.go('index');
        //   });
      });

      scope.$watch('isEnd', function() {
        if (!scope.isEnd) { return; }

        var buttons = element.find('button');
        angular.element(buttons[scope.correctIndex]).text('Game Over');

        // angular.element(buttons[scope.selectedIndex]).text('Menu')
        //   .on('click', function() {
        //     scope.$state.go('index');
        //   });
        // angular.element(buttons[scope.currentIndex]).text('Retry')
        //   .on('click', function() {
        //     scope.$state.reload();
        //   });
      });
    }
  };
})

;
