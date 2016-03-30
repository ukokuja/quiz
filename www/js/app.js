// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.contrib.ui.cards', 'ionic-material', 'ion-gallery','ngCordova','ngAnimate','tabSlideBox'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    window.plugins.OneSignal.init("f2c32097-fc4a-48cc-af9f-904dbe3b431f",
    {googleProjectNumber: "1053785437369", autoRegister: true},
    function(){console.log('e')});
    window.plugins.OneSignal.registerForPushNotifications();
    window.plugins.OneSignal.getIds(function(ids) {
      localStorage.setItem("pushId", ids.userId);
    });
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-lter
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('session', {
    cache: false,
    url: '/session',
    abstract: true,
    templateUrl: 'templates/session.html',
    controller: 'SessionCtrl'
  })
  // setup an abstract state for the tabs directive
  .state('session.game', {
    cache: false,
    url: '/game/:gameId/:gameRetarId/:id/:name/:category/:m/:a/:c/:aa/:b/:i',
    templateUrl: 'templates/game.html',
    controller: 'GameCtrl'
  })
  .state('session.menu', {
    cache: false,
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('session.create', {
    cache: false,
    url: '/create',
    templateUrl: 'templates/create.html',
    controller: 'CreateCtrl'
  })
  .state('session.roulette', {
    cache: false,
    url: '/roulette/:gameId/:gameRetarId/:name/:id/:m/:a/:c/:aa/:b/:i',
    templateUrl: 'templates/roulette.html',
    controller: 'RouletteCtrl'
  })
  .state('gallery', {
    cache: false,
    url: '/gallery',
    templateUrl: 'templates/gallery.html',
    controller: 'GalleryCtrl'
  })
  .state('session.finish', {
    cache: false,
    url: '/finish',
    templateUrl: 'templates/finish.html',
    controller: 'FinishCtrl'
  })
  .state('tab', {
    cache: false,
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    cache: false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
    cache: false,
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  .state('tab.chat-detail', {
    cache: false,
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    cache: false,
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('session/menu');
});
