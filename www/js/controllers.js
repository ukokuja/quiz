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
      /*$scope.galleryRef.once('value', function(snapshot){
       $timeout(function(){
       $scope.items = snapshot.val();
       $scope.rech.dale = true;
       })
       })*/
    })
    .controller('MenuCtrl', function($scope, $location, $timeout, $ionicModal) {
      $scope.to = function(to){
        $location.path(to);
      }
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
    .controller('FinishCtrl', function($scope, $location, $state) {
      $scope.macRef = new Firebase('https://maccabi.firebaseio.com/session/');
      $scope.macaRef = new Firebase('https://maccabi.firebaseio.com/');
      $scope.user = {};
      $scope.to = function(to){
        $location.path(to);
      }
      $scope.sacarFoto = function(){
        navigator.camera.getPicture(onSuccess, null, { quality: 50,
          destinationType: Camera.DestinationType.DATA_URL
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
          $scope.macRef.once('value', function(sessionSnap){
            $scope.user.session = sessionSnap.val().actual;
            $scope.user.key = $scope.macaRef.child('sessions').child($scope.user.session).push($scope.user).key();
            localStorage.setItem('user', JSON.stringify($scope.user));
            $scope.to('game');
          })
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
    .controller('GameCtrl', function($scope, $ionicSwipeCardDelegate, $timeout ,$location, $ionicLoading) {
      $scope.questionsRef = new Firebase('https://maccabi.firebaseio.com/');
      $scope.questionsPls = {};
      $scope.questionsRef.on('value', function(qS){
        $timeout(function(){
          $scope.questionsPls = qS.val();
        })
      })
      $scope.acierto = new Media("/android_asset/www/sounds/acierto.wav");
      $scope.error = new Media("/android_asset/www/sounds/error1.wav");
      $scope.user = JSON.parse(localStorage.getItem('user'));
      $scope.howmuch = 15;
      $scope.giveQuesStyle = function(){
        return {'font-size':(window.innerWidth / 23 ) + 'px'};
      };
      /*$scope.questionsRef.child('howmuch').once('value', function(howmuch){
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
      $scope.onlineCards = [];
      $scope.cardSwiped = function(index) {
        swal({type: "info",title: "Cargando preguntas..",   text: "",   timer: 2000,   showConfirmButton: false });
        /*$scope.questionsRef.child('questions').once('value', function(qSnap){
         $timeout(function(){
         $scope.onlineCards = qSnap.val();
         })
         });*/
        $timeout(function(){
          if(!$scope.onlineCards || !$scope.onlineCards.length>0){
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
          }else{
            var cards = $scope.onlineCards;
          }
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
        },2000)
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
      $scope.i = 0;
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
          $scope.questionsRef.child('sessions').child($scope.user.session).child($scope.user.key).child('answers')
              .child($scope.i).set({
                'time': $scope.seconds,
                'correct':correct
              });
          if(card){
            $scope.questionsRef.child('questions').child(question).child('reply').child(replied)
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

          $scope.i++;
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
              swal({
                title: "Haz terminado",
                text: "Vas a ver tu puntaje en unos minutos!",
                type: "success",
                showCancelButton: false,
                confirmButtonText: "Ok",
                showConfirmButton: false,
                timer: 2500,
              });
              $timeout(function(){
                $scope.user = {};
                $scope = {};
                $location.path('menu');
              }, 2500)
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
