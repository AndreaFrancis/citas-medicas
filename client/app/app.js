'use strict';

angular.module('cosmilApp', ['cosmilApp.constants', 'ngCookies', 'ngResource', 'ngSanitize',
    'ui.router', 'ui.bootstrap'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .filter('range', function(){
    return function(input, total) {
      total = parseInt(total);
      for (var i=0; i<total; i++)
        input.push(i);
      return input;
    };
  })
  .run(run)
  .constant('ROLES', {
    ADMIN:'ADMIN',
    ASEGURADO:'ASEGURADO',
    RECEP:'RECEPCIONISTA',
    BIO:'BIOESTADISTCO'
  });


  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state'];
      function run($rootScope, $location, $cookieStore, $http, $state) {

          $rootScope.globals = $cookieStore.get('globals') || {};
          console.log($rootScope.globals);
          if ($rootScope.globals.currentUser) {
            $state.go('main');
              //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
          } else {
            $state.go('login');
          }
          $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log("PAGINA ACTUAL: ", $location.path());
              var ubicacionActual = $location.path();
              var restrictedPage = ubicacionActual != '/login' && ubicacionActual != '/';
              var loggedIn = $rootScope.globals.currentUser;
              if (restrictedPage && !loggedIn) {
                  //$location.path('/login');
                $state.go('login');
              }
          });
      }
