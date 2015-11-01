angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })
  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('GameCtrl', function($scope, $ionicSwipeCardDelegate) {
    $scope.selected = 0;
    var cardTypes = [{ title: 'Swipe down to clear the card', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic.png' },
      { title: 'Where is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic.png' },
      { title: 'What kind of grass is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic2.png' },
      { title: 'What beach is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic3.png' },
      { title: 'What kind of clouds are these?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic4.png' }];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

    $scope.cardSwiped = function(index) {
      $scope.addCard();
    };

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
    $scope.howmuch = 10;
    $scope.goAway = function(countCall) {
      $ionicSwipeCardDelegate.popCard($scope, true);
      $scope.howmuch--;
      $scope.seconds = $scope.saveSeconds;
      if(!countCall){
        clearTimeout($scope.timeOut);
        countdown();
      }
      return $scope.howmuch > 0;
    };
    $scope.seconds = $('.progress-pie-chart').data('percent');
    $scope.startTime = $('.progress-pie-chart').data('start-time');
    $scope.saveSeconds = $scope.seconds;
    function countdown() {
      console.log("calling");
      function tick() {
        $scope.seconds--;
        $('.progress-pie-chart').data('percent', $scope.seconds);

        console.log($scope.seconds);

        drawCircle();
        if( $scope.seconds > 0 ) {
          $scope.timeOut = setTimeout(tick, 1000);
        } else {
          var again = $scope.goAway(true);
          if(again)
            $scope.timeOut = setTimeout(tick, 1000);
        }
      }
      tick();
    }

    function calculatePercent() {
      return parseInt($('.progress-pie-chart').data('percent'));
    }

    function drawCircle() {

      var deg = 360*($scope.seconds/$scope.startTime), percent = calculatePercent();

      if (percent > ($scope.startTime/2)) {
        $('.progress-pie-chart').addClass('gt-50');
      } else {
        $('.progress-pie-chart').removeClass('gt-50');
      }

      $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');

      $('.ppc-percents span').html(percent);
    }
    // start the countdown
    $scope.gameStarted = false;
    $scope.initCounter = function(){
      $scope.gameStarted = true;
      countdown();
    }

  })
