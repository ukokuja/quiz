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
  .controller('GalleryCtrl', function($scope, $timeout) {
    $scope.galleryRef = new Firebase('https://maccabi.firebaseio.com/gallery');
    $scope.items = {};
    $scope.galleryRef.once('value', function(gallerySnap){
      $timeout(function(){
        $scope.items = gallerySnap.val();
      })
    })
  })
  .controller('MenuCtrl', function($scope, $location) {
    $scope.to = function(to){
      $location.path(to);
    }

  })
  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('GameCtrl', function($scope, $ionicSwipeCardDelegate, $timeout) {
    $scope.questionsRef = new Firebase('https://maccabi.firebaseio.com/questions');
    $scope.cards = {};
    $scope.selected = 0;
    $scope.cardSwiped = function(index) {
      $scope.questionsRef.limitToFirst(8).once('value', function(qSnap){
        $timeout(function(){
          var cards = qSnap.val();
          var i =1;
          angular.forEach(cards, function(val){
            val.key = i;
            var rand = Math.floor(Math.random() * 3);
            val.answers.splice(rand, 0, val.correct);
            val.correct = rand;
            i++;
          })
          $scope.cards = cards;
        })
      });
    };
    $scope.giveMeStyle = function(){
      var cw = $('.image-question img').width();
      $('.image-question img').css({'max-height':cw*0.70+'px'});
      return {
        "-webkit-filter": "blur(10px) grayscale(100%)",
        "filter": "blur(10px) grayscale(100%)"
      };
    }
    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
      //$scope.goAway(true, true);
    };

    $scope.howmuch = 10;
    $scope.goAway = function (countCall, swiped, index, correct) {
      $scope.howmuch--;
      $scope.seconds = $scope.saveSeconds;

      if (!swiped) {
        clearTimeout($scope.timeOut);
        $({blurRadius: 10}).animate({blurRadius: 0}, {
          duration: 500,
          easing: 'swing', // or "linear"
                           // use jQuery UI or Easing plugin for more options
          step: function () {
            console.log(this.blurRadius);
            $('.image-question img').css({
              "-webkit-filter": "blur(" + this.blurRadius + "px)",
              "filter": "blur(" + this.blurRadius + "px)"
            });
          }
        });
        $timeout(function () {
          $ionicSwipeCardDelegate.popCard($scope, true);
          if (!countCall) {
            countdown();
          }
          return $scope.howmuch > 0;
        }, 1500);
      }
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
          var again = $scope.goAway(false, false);
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

      var deg = Math.round(360*($scope.seconds/$scope.startTime), percent = calculatePercent());

      if (percent > ($scope.startTime/2)) {
        $('.progress-pie-chart').addClass('gt-50');
      } else {
        $('.progress-pie-chart').removeClass('gt-50');
      }
      $('.ppc-progress-fill').css('transform', "rotate("+deg+"deg)");

      $('.ppc-percents span').html(percent);
    }
    // start the countdown
    $scope.gameStarted = false;
    $scope.initCounter = function(){
      $scope.gameStarted = true;
      countdown();
    }

  })
