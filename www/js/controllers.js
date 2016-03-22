angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
.controller('CreateCtrl', function($scope,$state, $cordovaFacebook,$ionicSlideBoxDelegate, $timeout,ionicMaterialInk,ionicMaterialMotion, $http) {
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
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.ripple();
  $timeout(function(){$ionicSlideBoxDelegate.slide(1);}, 2000);
  var inner  = window.innerHeight/ 2.5;
  $scope.friendsStyle = {
    height: inner+'px',
    'max-height':inner+50+'px',
    overflow: 'auto'
  };
  $cordovaFacebook.api("me/friends", [])
  .then(function(success) {
    $cordovaFacebook.api("me", ["email"])
    .then(function(success) {
      $scope.userRef.update({
        id: success.id,
        name: success.name,
        mail: (success.mail || {}),
        gender: success.gender || {},
        timezone: success.timezone || {},
        verified: success.verified || {},
        first_name: success.first_name,
        last_name: success.last_name,
        locale: success.locale,
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
})
.controller('RouletteCtrl', function($scope, $stateParams,$timeout,$state) {
  $scope.contrincante = {}
  $scope.retarGameRef.on('value', function(game){
    $timeout(function(){
      $scope.contrincante = game.val();
    })
  });
  $scope.params = $stateParams;
  $scope.userGameRef.update($scope.params);
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
.controller('SessionCtrl', function($scope, $cordovaFacebook, $state, $timeout) {
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
            // error
          });
        }
      }, function (error) {
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
        // error
      });
    })
  }
  $scope.retar = function(user){
    console.log(JSON.stringify(user));
    console.log(JSON.stringify($scope.usuario));
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
        date: Firebase.ServerValue.TIMESTAMP,
        read: true,
        starter: true
      });
      $scope.retarRef = new Firebase('https://maccabi.firebaseio.com/users/'+user.id);
      $scope.retarGameRef = $scope.retarRef.child('games').push({
        id:$scope.usuario.id,
        date: Firebase.ServerValue.TIMESTAMP
      });
      $state.go('session.roulette', {name:user.name ,id:user.id})
    });
  }
  $scope.to = function(to){
    $state.go(to);
  }
  $scope.getFromNow = function(p){
    console.log(p);
    return moment(p).fromNow();
  }
  function createUser(id){
    $scope.usuario = {id :id};
    $scope.userRef = new Firebase('https://maccabi.firebaseio.com/users/'+id);
    $scope.userRef.update({
      last: Firebase.ServerValue.TIMESTAMP
    });
    localStorage.setItem('usuario', JSON.stringify($scope.usuario));
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
  if($scope.usuario.name){
    $state.go('session.create');
  }
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
  if($scope.usuario.name){
    $state.go('session.create');
  }
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
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('GameCtrl', function($scope, $ionicSwipeCardDelegate, $timeout ,$location, $stateParams, $state,$ionicLoading) {
  $scope.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
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
  /*$timeout(function(){

  var cards = [
  {
  "answers": [
  " BRASIL",
  " URUGUAY "
],
"correct": " ARGENTINA ",
"text": " EN QUE PAÍS FUE SECUESTRADO ADOLF EICHMANN POR EL MOSSAD ISRAELÍ"
},
{
"answers": [
" FAISAL HUSSEINI ",
" MAHMUD ABÁS "
],
"correct": " YASIR ARAFAT ",
"text": " EL NOMBRE COMPLETO DEL LÍDER PALESTINO QUE FIRMO LOS ACUERDOS DE OSLO CON ISAAC RABIN "
},
{
"answers": [
" LEVI ESHKOL ",
" DAVID BEN GURIÓN "
],
"correct": " MOSHE SHARET ",
"text": " EL NOMBRE DEL PRIMER MINISTRO DE RELACIONES EXTERIORES DE ISRAEL "
},
{
"answers": [
" Ninguna Es Correcta",
" JORDANIA E IRAQ"
],
"correct": " EGIPTO Y SIRIA ",
"text": " QUE PAÍSES ARABES ATACARON A ISRAEL EN LA GUERRA DE IOM KIPPUR "
},
{
"answers": [
" HANDRÉ POLLARD",
" ELI COHEN "
],
"correct": " JONATHAN POLARD ",
"text": " EL NOMBRE DEL ESPÍA ISRAELÍ QUE EEUU VA A LIBERAR DESPUES DE CASI 30 Años QUE ESTUVO PRESO "
},
{
"answers": [
" 10 ",
" 15 "
],
"correct": " 11 ",
"text": " CUANDOS DEPORTISTAS ISRAELÍES FUERON ASESINADOS POR TERRORISTAS PALESTINOS EN LOS JUEGOS OLÍMPICOS DE MUNICH 1972? "
},
{
"answers": [
" SHIMON PERES ",
" ISAAC SHAMIR "
],
"correct": " MENAJEM BEGUIN ",
"text": " EL LÍDER ISRAELÍ QUE FIRMO EL TRATADO DE PAZ CON EGIPTO EN 1979"
},
{
"answers": [
" Kayak ",
" Judo "
],
"correct": " WIND SURF ",
"text": " EN QUE DISCIPLINA ISRAEL GANO SU ÚNICA MEDALLA DE ORO"
},
{
"answers": [
" 3",
" 2 "
],
"correct": " 1 ",
"text": " CUANTAS VECES HA CLASIFICADO LA SELECCIÓN DE FÚTBOL ISRAELÍ AL MUNDIAL "
},
{
"answers": [
" 12",
" 10 "
],
"correct": " 11 ",
"text": " CUANTOS ISRAELÍES HAN GANADO HASTA HOY LOS PREMIOS NOBEL "
},
{
"answers": [
" 1967",
" 1953 "
],
"correct": " 1948",
"text": " LA DECLARACIÓN DE INDEPENDENCIA DE ISRAEL FUE EN...?"
},
{
"answers": [
" HEBRÓN ",
" JENÍN "
],
"correct": " JERICÓ ",
"text": " QUE CIUDAD CISJORDANA ES CONSIDERADO COMO , LA CIUDAD MÁS ANTIGUA DEL MUNDO "
},
{
"answers": [
" 100",
" 75 "
],
"correct": " 120 ",
"text": "CUANTOS PARLAMENTARIOS ESTAN EN LA KNESSET ISRAELI"
},
{
"answers": [
" JUDÍOS Y MUSULMANES ",
" JUDÍOS Y CRISTIANOS "
],
"correct": " PERSONAS DE TODAS LAS RELIGIONES ",
"text": " EL GOBIERNO DE ISRAEL GARANTIZA LA LIBERTAD DE RELIGIÓN PARA "
},
{
"answers": [
" 30",
" 10 "
],
"correct": " 20 ",
"text": " QUÉ PORCENTAJE DE LA POBLACIÓN DE ISRAEL NO ES JUDÍO"
},
{
"answers": [
" EGIPTO ",
" JORDANIA "
],
"correct": " SIRIA ",
"text": " LOS ALTOS DEL GOLÁN FORMA UNA BARRERA NATUAL ENTRE ISRAEL Y ..."
},
{
"answers": [
" ASESINAR A LOS TERRORISTAS ÁRABES ",
" ESPIAR A LOS BRITÁNICOS "
],
"correct": " GESTIONAR LA INMIGRACIÓN ILEGAL ",
"text": " EL MOSSAD FUE CREADO ORIGINALMENTE PARA ..."
},
{
"answers": [
" NINGUNA DE LAS ANTERIORES ",
" UNA COALICIÓN DE ESTADOS MUSULMANES EN EL MEDIO ORIENTE "
],
"correct": " LA LÍNEA DE ARMISTICIO DE 1949 ENTRE ISRAEL Y JORDANIA ",
"text": " LA 'LÍNEA VERDE' SE REFIERE A ..."
},
{
"answers": [
" YITZHAK RABIN ",
" SHIMON PERES "
],
"correct": " TODAS LAS ANTERIORES ",
"text": " QUE LÍDERES ISRAELÍES HAN GANADO EL PREMIO NOBEL DE LA PAZ MUNDIAL? "
},
{
"answers": [
"DOR NINI ",
" YOHAI KALANGEL "
],
"correct": " GUILAD SCHALIT ",
"text": " EL SOLDADO ISRAELI QUE FUE SECOSTRADO POR HAMAS Y LIBERADO EN EL 2011  A CAMBIO DE 1000 TERRORISTAS PALESTINOS  SE LLAMABA …"
},
{
"answers": [
" VELA",
" ATLETISMO "
],
"correct": " JUDO ",
"text": " EN QUE DEPORTE SE HAN GANADO LAS PRIMERAS MEDALLAS ISRAELÍES EN LA HISTORIA"
},
{
"answers": [
" SIRIA ",
" Irán "
],
"correct": " IRAQ ",
"text": " LA PLANTA NUCLEAR DE QUE PAÍS FUE ATACADO Y ELIMINADO POR LA FUERZA AÉREA ISRAELÍ EN EL AÑO 1981"
},
{
"answers": [
" MOSHÉ KATSAV ",
" SHIMON PERES "
],
"correct": " REUVEN RIVLIN ",
"text": "EL NOMBRE COMPLETO DEL PRESIDENTE ACTUAL DEL ESTADO DE ISRAEL? "
},
{
"answers": [
" NINGUNA DE LAS ANTERIORES ",
" BENJAMÍN NETANYAHU "
],
"correct": " SHIMON PERES ",
"text": " QUIEN LE REEMPLAZO A ISAAC RABIN COMO PRIMER MINISTRO DESPUES DEL ASESINATO DE RABIN  EN EL 1995?"
},
{
"answers": [
" YIGAEL YADIN ",
" YAAKOV DORI "
],
"correct": " GADI EIZENKOT ",
"text": " EL NOMBRE DEL JEFE DEL EJERCITO ACTUAL DEL ESTADO DE ISRAEL "
},
{
"answers": [
" IZU ",
" AZI "
],
"correct": " UZI ",
"text": " EL NOMBRE DEL REVOLVER ISRAELÍ QUE SE USABA EN LOS 50 Y LOS 60 POR EL EJERCITO ISRAELÍ "
},
{
"answers": [
" NINGUNA ES CORRECTA ",
" IRANÍ"
],
"correct": " ISRAELÍ",
"text": " DE QUE NACIONALIDAD FUE EL ASESINO DEL PRIMER MINISTRO ISRAELÍ RABIN?  "
},
{
"answers": [
" NINGUNA ES CORRECTA ",
" ABU MUSAB AL ZARQAUI "
],
"correct": " EL REY HUSSEIN ",
"text": " EL NOMBRE DEL LÍDER JORDANO QUE FIRMO EL TRATADO DE PAZ CON ISRAEL EN 1994?"
},
{
"answers": [
" NINGUNA ES CORRECTA ",
" JERUSALÉN "
],
"correct": " HEBRON ",
"text": " EN QUE CIUDAD DE ISRAEL SE ENCUENTRA LA TUMBA DE LOS PATRIARCAS"
},
{
"answers": [
" NINGUNA ES CORRECTA ",
" CARMELO "
],
"correct": " HERMON ",
"text": " EL NOMBRE DEL MONTE MAS ALTO EN ISRAEL "
},
{
"answers": [
" NETANYA",
" TIBERIAS "
],
"correct": " EILAT ",
"text": " EL NOMBRE DE LA CIUDAD QUE SE ENCUENTRA EN EL PUNTO MAS BAJO DEL MAPA DE ISRAEL "
},
{
"answers": [
" EILAT ",
" TIBERIAS "
],
"correct": " METULA ",
"text": " EL NOMBRE DE LA CIUDAD QUE SE ENCUENTRA EN EL PUNTO MAS ALTO DEL MAPA DE ISRAEL "
},
{
"answers": [
" LLUVIAS DE VERANO ",
" FLECHA DEL SUR "
],
"correct": " OPERACIÓN SALOMÓN ",
"text": " EL NOMBRE DEL OPERATIVO EN EL CUAL SE HAN TRAÍDO DURANTE UN DÍA Y MEDIO 14 MIL  JUDÍOS ETÍOPES A ISRAEL "
},
{
"answers": [
" 1981",
" 1985 "
],
"correct": " 1982",
"text": " EN QUE AÑO SE RETIRARON LAS FUERZAS DE TZAHAL DE LA PENÍNSULA DE SINAI?"
},
{
"answers": [
" IRÁN ",
" SIRIA "
],
"correct": " UGANDA ",
"text": " EN QUE PAÍS SE HA LLEVADO ACABO 'OPERACIÓN ENTEBBE' EN 1976? "
},
{
"answers": [
" DAN SHECHTMAN ",
" MICHAEL LEVITT "
],
"correct": " SHAI AGNON ",
"text": " EL PRIMER ISRAELÍ QUE HA GANADO UN PREMIO NOBEL EN EL 1966?"
},
{
"answers": [
" 1965 ",
" 1964 "
],
"correct": " 1967 ",
"text": "DESDE QUE AÑO ESTA UNIFICADA LA CUIDAD DE JERUSALÉN?"
},
{
"answers": [
" ZALMAN SHAZAR",
" YITZJAK BEN-ZVI"
],
"correct": " JAIM WEIZMANN",
"text": " PRIMER PRESIDENTE DEL ESTADO DE ISRAEL?"
},
{
"answers": [
" AL-JIHAD ",
" HAMAS "
],
"correct": " HEZBOLLA ",
"text": " EN LA SEGUNDA GUERRA DEL LÍBANO , CONTRA QUE ORGANIZACIÓN LUCHO ISRAEL?"
},
{
"answers": [
" NINGUNA ES CORRECTA ",
" AYELET SHAKED"
],
"correct": " GOLDA MEIR ",
"text": " PRIMERA MUJER QUE FUE PRIMER MINISTRO DE ISRAEL?"
},
{
"answers": [
" RETIRARSE ",
" QUITAR "
],
"correct": " DESCONEXIÓN ",
"text": " QUE SIGNIFICA EN ESPAÑOL HITNATKUT?"
},
{
"answers": [
" YAIR NETANYAHU ",
" IDDO NETANYAHU "
],
"correct": " YONATAN NETANYAHU",
"text": " HERMANO DEL PRIMER MINISTRO ACTUAL QUE MURIÓ EJERCIENDO EN 1976 EN LA OPERACIÓN DE ENTEBBE?"
},
{
"answers": [
" MIL MI-8",
" CESSNA 172"
],
"correct": " KFIR ",
"text": " AVIÓN FABRICADO EN ISRAEL? "
},
{
"answers": [
" AHORRO ",
" RETIRADA "
],
"correct": " RESERVAS ",
"text": " QUE SIGNIFICA MILUIM?"
},
{
"answers": [
" 1964 ",
" 1962 "
],
"correct": " 1965 ",
"text": " EN QUE AÑO SE ESTABLECIERON RELACIONES DIPLOMÁTICAS CON ALEMANIA?"
},
{
"answers": [
" 1983 ",
" 1981 "
],
"correct": " 1982",
"text": " EN QUE AÑO ESTALLO LA GUERRA DEL LÍBANO "
},
{
"answers": [
" 1953 ",
" 1951 "
],
"correct": " 1949 ",
"text": " EN QUE AÑO LLEGO EL CUERPO DE HETZEL A ISRAEL"
}
];
$scope.initCounter();
var i = 1;
angular.forEach(cards, function(val){
val.key = i;
var rand = Math.floor(Math.random() * 3);
val.real = val.answers;
val.answers.splice(rand, 0, val.correct);
val.correct = rand;
i++;
});
cards = shuffle(cards);
$scope.cards = cards;
},1000)*/
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
    $scope.macRef.child('sessions').child($scope.user.session).child($scope.user.key).child('answers')
    .child($scope.iii).set({
      'time': $scope.seconds,
      'correct':correct
    });
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
