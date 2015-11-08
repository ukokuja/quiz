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
    .controller('GalleryCtrl', function($scope, $timeout, $ionicLoading) {
      $scope.galleryRef = new Firebase('https://maccabi.firebaseio.com/gallery');
      $scope.rech = {}
      $scope.rech.dale = false;
      $scope.items = [ { src: 'img/gallery/10492073_10153087601535395_6282485737070116281_n.jpg',
        sub: '' },
        { src: 'img/gallery/11062546_875010699261517_4296025867144836316_n.jpg',
          sub: '' },
        { src: 'img/gallery/11146481_10153226488330395_8965087585469271163_n.jpg',
          sub: '' },
        { src: 'img/gallery/11215073_875011115928142_6042707004021100544_n.jpg',
          sub: '' },
        { src: 'img/gallery/11401575_835311303231457_8712566815991512934_n.jpg',
          sub: '' },
        { src: 'img/gallery/11796371_865276853568235_2666524976856272392_n.jpg',
          sub: '' },
        { src: 'img/gallery/11800067_865276543568266_892944751179488803_n.jpg',
          sub: '' },
        { src: 'img/gallery/11873517_874476905981563_6496746409834188607_n.jpg',
          sub: '' },
        { src: 'img/gallery/11880492_878034292292491_2847043050630422714_n.jpg',
          sub: '' },
        { src: 'img/gallery/11898583_878599448902642_5462356826823204575_n.jpg',
          sub: '' },
        { src: 'img/gallery/11898838_879627702133150_1228446079707050104_n.jpg',
          sub: '' },
        { src: 'img/gallery/11921668_878599272235993_227561187230109928_n.jpg',
          sub: '' },
        { src: 'img/gallery/11959960_882005745228679_5582815796906951832_n.jpg',
          sub: '' },
        { src: 'img/gallery/11960124_878599305569323_229040967641914819_n.jpg',
          sub: '' },
        { src: 'img/gallery/12003177_891790387583548_3052812113594028451_n.jpg',
          sub: '' },
        { src: 'img/gallery/12009659_891790640916856_7582728529025902047_n.jpg',
          sub: '' },
        { src: 'img/gallery/12036762_891786000917320_7640440646887116102_n.jpg',
          sub: '' },
        { src: 'img/gallery/12038104_1052431394767633_5659586875080123727_n.jpg',
          sub: '' },
        { src: 'img/gallery/12144769_1058387110845965_4621543065613689725_n.jpg',
          sub: '' },
        { src: 'img/gallery/IMG-20151001-WA0006.jpg', sub: '' },
        { src: 'img/gallery/IMG-20151001-WA0007.jpg', sub: '' },
        { src: 'img/gallery/IMG-20151001-WA0008.jpg', sub: '' },
        { src: 'img/gallery/IMG-20151001-WA0011.jpg', sub: '' },
        { src: 'img/gallery/IMG-20151001-WA0015.jpg', sub: '' },
        { src: 'img/gallery/IMG-20151026-WA0044.jpg', sub: '' },
        { src: 'img/gallery/IMG-20151027-WA0014.jpg', sub: '' },
        { src: 'img/gallery/IMG-20151027-WA0022.jpg', sub: '' },
        { src: 'img/gallery/IMG_1129.JPG', sub: '' },
        { src: 'img/gallery/IMG_1133.JPG', sub: '' },
        { src: 'img/gallery/IMG_1137.JPG', sub: '' },
        { src: 'img/gallery/IMG_1154.JPG', sub: '' },
        { src: 'img/gallery/IMG_1215.JPG', sub: '' },
        { src: 'img/gallery/IMG_1236.JPG', sub: '' },
        { src: 'img/gallery/be.JPG', sub: '' } ];
      $scope.galleryRef.once('value', function(snapshot){
        $timeout(function(){
          $ionicLoading.show({
            template: 'Loading...',
            duration: 2000
          });
          $scope.items = snapshot.val();
          $scope.rech.dale = true;
        })
      })
    })
    .controller('MenuCtrl', function($scope, $location) {
      $scope.to = function(to){
        $location.path(to);
      }

    })
    .controller('FinishCtrl', function($scope, $location) {
      $scope.to = function(to){
        $location.path(to);
      }

    })
    .controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends: true
      };
    })
    .controller('GameCtrl', function($scope, $ionicSwipeCardDelegate, $timeout ,$location, $ionicLoading) {
      $scope.questionsRef = new Firebase('https://maccabi.firebaseio.com/questions');
      $scope.cards = {};
      $scope.selected = 0;
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
      $scope.howmuch = 15;
      $scope.cardSwiped = function(index) {
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.questionsRef.once('value', function(qSnap){
          $timeout(function(){
            $ionicLoading.hide();
            $scope.initCounter();
            var cards = qSnap.val();
            var i = 1;
            angular.forEach(cards, function(val){
                val.key = i;
                var rand = Math.floor(Math.random() * 3);
                val.answers.splice(rand, 0, val.correct);
                val.correct = rand;
                i++;
            });
            cards = shuffle(cards);
            var j = 0;
            angular.forEach(cards, function(){
              if(j>$scope.howmuch){
                cards.splice(j,i);
              }
              j++;
            });
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
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      $scope.giveMeQuestion = function(text){
        if(!text) return '';
        if(text.indexOf('?')<0)
        text = text+"?";
        text = text.toLowerCase().trim();
        return capitalizeFirstLetter(text);
      }
      $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        //$scope.goAway(true, true);
      };
      $scope.didntAnswer = true;
      $scope.goAway = function (countCall, swiped, index, correct) {
        if($scope.didntAnswer){
          $scope.howmuch--;

          $scope.didntAnswer = false;
          $scope.seconds = $scope.saveSeconds;

          if (!swiped) {
            clearTimeout($scope.timeOut);
            $({blurRadius: 10}).animate({blurRadius: 0}, {
              duration: 500,
              easing: 'swing', // or "linear"
                               // use jQuery UI or Easing plugin for more options
              step: function () {
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
              $scope.didntAnswer = true;
              if(!$scope.howmuch > 0){
                $location.path('finish');
              }
              return $scope.howmuch > 0;
            }, 1500);
          }
        }
      };
      $scope.seconds = $('.progress-pie-chart').data('percent');
      $scope.startTime = $('.progress-pie-chart').data('start-time');
      $scope.saveSeconds = $scope.seconds;
      function countdown() {
        function tick() {
          $scope.seconds--;
          $('.progress-pie-chart').data('percent', $scope.seconds);


          drawCircle();
          if( $scope.seconds > 0 ) {
            $scope.timeOut = setTimeout(tick, 100);
          } else {
            var again = $scope.goAway(false, false);
            if(again)
              $scope.timeOut = setTimeout(tick, 100);
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
