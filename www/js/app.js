// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic', 'pascalprecht.translate', 'starter.controllers'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'js/lang/',
    suffix: '.json'
  });
  
  var defaultLng = 'en';
  var getLang = function() {
    try {
      return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2)
    } catch (e) {
      return defaultLng;
    }
  }
  $translateProvider.preferredLanguage(getLang());
  $translateProvider.fallbackLanguage(defaultLng);
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'templates/menu.html',
      controller: 'MenuCtrl'
    })
    .state('showing', {
      url: '/showing:waitCount',
      templateUrl: 'templates/board.html',
      controller: 'BoardCtrl'
    });


  // $stateProvider
  //   .state('index', {
  //     url: '/',
  //     templateUrl: 'templates/tab-dash.html',
  //   });
    // .state('tab.chats', {
    //   url: '/chats',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/tab-chats.html',
    //       controller: 'ChatsCtrl'
    //     }
    //   }
    // })
    // .state('tab.chat-detail', {
    //   url: '/chats/:chatId',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })
    // .state('tab.account', {
    //   url: '/account',
    //   views: {
    //     'tab-account': {
    //       templateUrl: 'templates/tab-account.html',
    //       controller: 'AccountCtrl'
    //     }
    //   }
    // });
});
