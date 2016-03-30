angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('RouletteCtrl', function($scope, $stateParams,$timeout,$state) {
  $scope.contrincante = {}
  if(!$scope.userGameRef.on){
    $scope.userGameRef = $scope.userRef.child('games').child($stateParams.gameId);
  }
  if(!$scope.retarGameRef.on){
    $scope.retarGameRef = $scope.macRef.child($stateParams.id).child('games').child($stateParams.gameRetarId);
  }
  $scope.retarGameRef.on('value', function(game){
    $timeout(function(){
      $scope.contrincante = game.val();
    })
  });
  $scope.params = $stateParams;
  $scope.userGameRef.update($scope.params);
  if($scope.params.i && $scope.params.i != ''){
    $scope.retarGameRef.update({retarFinished:true});
  }
  $scope.categories = [
    {description:'historia', img:'history.png'},
    {description:'geografía', img:'geography.png'},
    {description:'política', img:'politics.png'},
    {description:'deporte', img:'sports.png'},
    {description:'cultura', img:'culture.png'},
    {description:'hebreo', img:'hebrew.png'},
  ];
  $scope.giveMacabiStyle = function(q){
    if(!q)
    q = 0;
    return {'opacity': q};
  };
  var stop = Math.floor((Math.random() * $scope.categories.length-1) + 1);
  $scope.isRoading = false;
  $scope.choosedCategory = -1;
  var option = {
    speed : 20,
    duration : 2,
    items: 5,
    stopImageNumber : stop,
    stopCallback : function() {
      $timeout(function(){
        $scope.isRoading = false;
        $scope.choosedCategory = stop;
      })
    }
  };
  $scope.ready = false;
  $timeout(function(){
    var rouletter = $('div.roulette');
    rouletter.roulette(option);
    $scope.ready = true;
    $scope.start = function(){
      if(!$scope.isRoading && $scope.choosedCategory < 0){
        rouletter.roulette('start');
      }
      $scope.isRoading = true;
    }
  },100)
  $scope.continuar = function(){
    var extend = angular.extend($stateParams, {category: $scope.choosedCategory});
    $state.go('session.game', extend);
  }
})
.controller('SessionCtrl', function($scope, $cordovaFacebook, $state, $timeout,$http) {
  $scope.macRef = new Firebase('https://maccabi.firebaseio.com/');
  $scope.userRef = {};
  $scope.userGameRef = {};
  $scope.retarRef = {};
  $scope.retarGameRef = {};
  $scope.back = function(){
    $scope.userGameRef = {};
    $scope.retarRef = {};
    $scope.retarGameRef = {};
  }
  $scope.facebookLogin = function(){
    $timeout(function(){
      $cordovaFacebook.getLoginStatus()
      .then(function(success) {
        if(success.status === "connected"){
          createUser(success.authResponse.userID);
        }else{
          $cordovaFacebook.login(["public_profile", "email", "user_friends"])
          .then(function(success) {
            createUser(success.authResponse.userID);
          }, function (error) {
            console.log(JSON.stringify(error));
            // error
          });
        }
      }, function (error) {
        console.log(JSON.stringify(error));
        // error
      });
    })
  }
  $scope.facebookReLogin = function(){
    $timeout(function(){
      $cordovaFacebook.getLoginStatus()
      .then(function(success) {
        if(success.status === "connected"){
          createUser(success.authResponse.userID);
        }
      }, function (error) {
        console.log(JSON.stringify(error));
        // error
      });
    })
  }
  $scope.retar = function(user){

    swal({
      text: "Queres desafiar a " + user.name + "?",
      title: "Nueva partida",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: true
    }, function() {
      $scope.userGameRef = $scope.userRef.child('games').push({
        id:user.id,
        name: user.name || {},
        date: Firebase.ServerValue.TIMESTAMP,
        read: true,
        starter: true
      });
      $scope.retarRef = new Firebase('https://maccabi.firebaseio.com/users/'+user.id);
      $scope.retarGameRef = $scope.retarRef.child('games').push({
        id:$scope.usuario.id,
        name: $scope.usuario.name || {},
        date: Firebase.ServerValue.TIMESTAMP
      });
      $scope.retarGameRef.update({gameId: $scope.retarGameRef.key(), gameRetarId: $scope.userGameRef.key()})
      $scope.userGameRef.update({gameRetarId: $scope.retarGameRef.key(), gameId: $scope.userGameRef.key()})
      $scope.retarRef.once('value', function(snapRetar){
        var m = {
          message: $scope.usuario.first_name + " te ha retado. Lo venceras?",
          title: "Nueva partida",
          user: user.id,
          pushId: snapRetar.val().pushId,
          image: ''
        };
        var k = $scope.macRef.child('message').push(m);
        $http.get("https://zapier.com/hooks/catch/651706/2cr4zf/"+toUrlParams(m)).then(function(success){
          k.update({success:success.data});
        });
        $state.go('session.roulette', {gameId: $scope.userGameRef.key(),gameRetarId: $scope.retarGameRef.key(),name:user.name ,id:user.id})
      })
    });
  }
  $scope.to = function(to){
    $state.go(to);
  }
  $scope.getFromNow = function(p){
    return moment(p).locale("es").fromNow();
  }
  function createUser(id){
    $scope.usuario = {};
    $scope.userRef = new Firebase('https://maccabi.firebaseio.com/users/'+id);
    $scope.userRef.onDisconnect().update({last: Firebase.ServerValue.TIMESTAMP});
    $scope.userRef.update({
      pushId: localStorage.getItem("pushId"),
      id: id
    });
    $scope.userRef.once('value', function(us){
      $scope.usuario = us.val();
      localStorage.setItem('usuario', JSON.stringify($scope.usuario));
    });

    $scope.to('session.create');
  }
  $scope.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
})
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
.controller('GalleryCtrl', function($scope, $timeout, $ionicLoading, $http) {
  $scope.rech = {}
  $scope.rech.dale = false;
  var url1 = "https://graph.facebook.com/oauth/access_token?client_id=301006363311722&client_secret=8dc1cddd7f4d028582d8eac74db18348&grant_type=client_credentials";
  var url2 = "https://graph.facebook.com/v2.2/191030644326196/feed?access_token=";
  $scope.items = {};
  $http.get(url1)
  .then(function(success){
    console.log(success);
    $http.get(url2+(success.data.substr(13)+"&type=uploaded&fields=full_picture,message&limit=51"))
    .then(function(success3){
      $timeout(function(){$scope.items = success3.data.data});
    });
  });
})
.controller('MenuCtrl', function($scope, $state, $timeout, $ionicModal, $cordovaFacebook) {
  $scope.gallery = function(){
    $state.go('gallery');
  }
  $scope.facebookReLogin();
  $ionicModal.fromTemplateUrl('templates/modal-video.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  $scope.openYoutube = function(){
    $scope.openModal();
  }
  $timeout(function(){
    var owl = $("#owl-demo");

    owl.owlCarousel({
      items : 10, //10 items above 1000px browser width
      itemsTablet: [700,7],
      itemsMobile : [450,5], // itemsMobile disabled - inherit from itemsTablet option
      autoPlay: 1200,
      slideSpeed: 50,
      paginationSpeed: 400,
      rewindSpeed: 500
    });
  });
  $scope.getHeight = function(){
    return window.innerHeight;
  }

})
.controller('FinishCtrl', function($scope, $state, $cordovaFacebook, $rootScope) {
  $scope.user = {};
  $cordovaFacebook.api("me", ["email"])
  .then(function(success) {
    $scope.user.name = success.name;
    $scope.user.email = success.mail;
  }, function (error) {
  });
  $scope.sacarFoto = function(){
    navigator.camera.getPicture(onSuccess, null, { quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      targetHeight: 100,
      targetWidth: 100,
      allowEdit : true,
      correctOrientation: 1
    });
    function onSuccess(imageData) {
      $scope.$apply(function(){
        $scope.user.image = "data:image/jpeg;base64," + imageData;
      })
    }
  };
  $scope.toGame = function(){
    var faltaUser = !$scope.user.name ? 'Por favor completa el nombre,' : 'Por favor completa';
    var faltaMail = !$scope.user.mail ? ' el email' : '';
    var faltaImagen  = '';
    if(!$scope.user.image){
      if (!$scope.user.name && !$scope.user.mail){
        faltaImagen = ' y la imagen';
      }else{
        faltaImagen = ' la imagen.';
      }
    }
    if($scope.user.name && $scope.user.mail && $scope.user.image){
      angular.extend($scope.usuario, $scope.user);
      $scope.to('session.create');
    }else{
      swal({type: "info",title: faltaUser+faltaMail+faltaImagen,   text: "",   timer: 2000,   showConfirmButton: false });
    }
  };
})
.controller('CreateCtrl', function($scope,$state, $cordovaFacebook,$ionicSlideBoxDelegate, $timeout, $http) {
  var url1 = "https://graph.facebook.com/oauth/access_token?client_id=301006363311722&client_secret=8dc1cddd7f4d028582d8eac74db18348&grant_type=client_credentials";
  var url2 = "https://graph.facebook.com/v2.2/191030644326196/feed?access_token=";
  var url3 = "https://graph.facebook.com/v2.2/191030644326196/photos?access_token=";
  $scope.maccabi = {};
  $http.get(url1)
  .then(function(success){
    $http.get(url2+(success.data.substr(13)+"&fields=full_picture,message,from"))
    .then(function(success2){
      $timeout(function(){$scope.maccabi.feed = success2.data.data});
    });
    $http.get(url3+(success.data.substr(13)))
    .then(function(success3){
      console.log(success3.data.data);
      $timeout(function(){$scope.maccabi.info = success3.data.data});
    });
  });
  $timeout(function(){$ionicSlideBoxDelegate.slide(1);}, 2000);
  var inner  = window.innerHeight/ 2.5;
  $scope.friendsStyle = {
    height: inner+'px',
    'max-height':inner+50+'px',
    overflow: 'auto'
  };
  $scope.loadingFriends = true;
  $cordovaFacebook.api("me/friends", [])
  .then(function(success) {
    $scope.loadingFriends = false;
    $cordovaFacebook.api("me/?fields=id,email,first_name,last_name,location,timezone,gender,locale,name", ["email"])
    .then(function(success2) {
      console.log(JSON.stringify(success2));
      $scope.userRef.update({
        id: success2.id,
        name: success2.name,
        mail: (success2.mail || {}),
        gender: success2.gender || {},
        timezone: success2.timezone || {},
        verified: success2.verified || {},
        first_name: success2.first_name,
        last_name: success2.last_name,
        locale: success2.locale,
      });
    }, function (error) {
    });
    var friends = success.data;
    $scope.userRef.update({friends: friends||{}});
    function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }

    $scope.friends = chunk(friends, 3);
  }, function (error) {
    // error
  });
  $scope.notifications = {};
  $scope.userRef.once('value', function(userSnap){
    var val = userSnap.val();
    $scope.notifications = val.games || {};
  });
  $scope.isNew = function(date){
    return $scope.usuario.last ? $scope.usuario.last < date :true;
  }
  $scope.sawNotifications = function(){
    $scope.userRef.update({last: Firebase.ServerValue.TIMESTAMP});
  }
  $scope.notificationClick = function(n){
    if(n.starter && n.retarFinished){
      $state.go('session.game',n);
    }else{
      $state.go('session.roulette',n);
    }
  }
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('GameCtrl', function($scope, $ionicSwipeCardDelegate, $timeout ,$location, $stateParams, $state,$ionicLoading) {
  $scope.$on('$destroy', function iVeBeenDismissed() {
    $scope = {};
  })
  $scope.categories = [
    {description:'historia', img:'history.png'},
    {description:'geografía', img:'geography.png'},
    {description:'política', img:'politics.png'},
    {description:'deporte', img:'sports.png'},
    {description:'cultura', img:'culture.png'},
    {description:'hebreo', img:'hebrew.png'},
  ];

  $scope = angular.extend($scope, $stateParams);
  $scope.questionsPls = {};
  $scope.macRef.on('value', function(qS){
    $timeout(function(){
      $scope.questionsPls = qS.val();
    })
  })
  $scope.acierto = new Media("/android_asset/www/sounds/acierto.wav");
  $scope.error = new Media("/android_asset/www/sounds/error1.wav");
  $scope.user = {session: 1, key: 1};
  //$scope.user = JSON.parse(localStorage.getItem('user'));
  $scope.howmuch = 5;
  $scope.giveQuesStyle = function(){
    return {
      'font-size':(window.innerWidth / 30 ) + 'px',
      'line-height': '90%;'};
    };
    /*$scope.macRef.child('howmuch').once('value', function(howmuch){
    $timeout(function(){
    $scope.howmuch = howmuch.val();
  })
})*/
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
$scope.clickedFirst = false;
$scope.onlineCards = [];
$scope.cardSwiped = function(index) {
  $scope.clickedFirst = true;
  $ionicLoading.show({
    template: 'Loading...'
  });
  //swal({type: "info",title: "Cargando preguntas..",   text: "",   timer: 1000,   showConfirmButton: false });
  $scope.macRef.child('questions').once('value', function(qSnap){
    $ionicLoading.hide();
    var cards = qSnap.val();
    console.log(cards.length);
    $scope.initCounter();
    var i = 1;
    angular.forEach(cards, function(val){
      if(val.answers){
        val.key = i;
        var rand = Math.floor(Math.random() * 3);
        val.real = val.answers;
        val.answers.splice(rand, 0, val.correct);
        val.correct = rand;
        i++;
      }else{
        cards.splice(i,1);
      }
    });
    cards = shuffle(cards);
    $timeout(function(){
      $scope.cards = cards;
    });
    //$scope.onlineCards = qSnap.val();
  });
};
$scope.giveMeStyle = function(){
  var cw = $('.image-question img').width();
  $('.image-question img').css({'max-height':cw*0.70+'px'});
  return {
    //"-webkit-filter": "blur(10px) grayscale(100%)",
    //"filter": "blur(10px) grayscale(100%)"
  };
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
$scope.ayudin = '';
$scope.ayuda = function(){
  if(!$scope.user.ayuda){
    $scope.user.ayuda = true;
    var card = $scope.cards[$scope.selected];
    var cual = card.correct == 0 ? 1 : 0;
    $scope.ayudin = cual + '-' + $scope.selected;
    console.log($scope.ayudin);
  }
};
$scope.concatHelp = function(a,b){
  console.log(a,b);
  console.log($scope.ayudin);
  return $scope.ayudin == a+"-"+b;
}
$scope.companeros = function(){
  if(!$scope.user.companeros){
    $scope.user.companeros = true;
    var card = $scope.cards[$scope.selected];
    var cardHlp = $scope.questionsPls.questions[card.key-1];
    var total = 0;
    angular.forEach(cardHlp.reply, function(v){
      total +=v;
    });
    var zero = cardHlp.reply[0] ? "("+parseInt(cardHlp.reply[0]/total * 100)+ "%)" : "(0%)";
    var one = cardHlp.reply[1] ? "("+parseInt(cardHlp.reply[1]/total * 100)+ "%)" : "(0%)";
    var two = cardHlp.reply[2] ? "("+parseInt(cardHlp.reply[2]/total * 100)+ "%)" : "(0%)";
    $("#help-"+card.correct+"-"+card.key).text(two);
    if(card.correct == 2){
      $("#help-0-"+card.key).text(zero);
      $("#help-1-"+card.key).text(one);
    }
    if(card.correct == 1){
      $("#help-0-"+card.key).text(zero);
      $("#help-2-"+card.key).text(one);
    }
    if(card.correct == 0){
      $("#help-1-"+card.key).text(zero);
      $("#help-2-"+card.key).text(one);
    }
  }
};
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
$scope.iii = 0;
$scope.corrects = 0;
var done = false;
$scope.goAway = function (countCall, card, reply, ble, question) {
  $scope.ayudin = '';
  done = false;
  if($scope.didntAnswer || ble){
    $scope.howmuch--;
    $scope.didntAnswer = false;
    var correct = false;
    var replied = reply;
    if(card) {
      if (card.correct == 0) {
        if (replied == 0)
        replied = 2;
        else
        replied--;
      } else if (card.correct == 1) {
        if (replied == 1)
        replied = 2;
        else if (reply != 0)
        replied--
      }
      correct = card.correct == reply;
      if (correct) {
        $scope.corrects++;
        $scope.acierto.play();
        $timeout(function(){
          $scope.acierto.stop();
          $scope.acierto = null;
          $scope.acierto = new Media("/android_asset/www/sounds/acierto.wav");
        }, 3000);
      }else{
        $scope.error.play();
        $timeout(function(){
          $scope.error.stop();
          $scope.error = null;
          $scope.error = new Media("/android_asset/www/sounds/error1.wav");
        }, 500);
      }
    }else{
      $scope.error.play();
      $timeout(function(){
        $scope.error.stop();
        $scope.error = null;
        $scope.error = new Media("/android_asset/www/sounds/error1.wav");
      }, 500);
    }
    if(card){
      $scope.macRef.child('questions').child(question).child('reply').child(replied)
      .transaction(function(currentData) {
        if(currentData===null){
          return 1;
        }else{
          currentData++;
          return currentData;
        }
      }
    );
  }

  $scope.iii++;
  $scope.seconds = $scope.saveSeconds;
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
      if($stateParams.m){
        if($stateParams.a){
          if($stateParams.c){
            if($stateParams.aa){
              if($stateParams.b){
                if(!$stateParams.i){
                  $stateParams.i = $scope.corrects/5;
                }
              }else{
                $stateParams.b = $scope.corrects/5;
              }
            }else{
              $stateParams.aa = $scope.corrects/5;
            }
          }else{
            $stateParams.c = $scope.corrects/5;
          }
        }else{
          $stateParams.a = $scope.corrects/5;
        }
      }else{
        $stateParams.m = $scope.corrects/5;
      }
      $timeout(function(){
        $state.go('session.roulette',$stateParams);
      }, 500);
    }
    return $scope.howmuch > 0;
  }, 1500);
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
      var again = $scope.goAway(false, null,3, true);
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
