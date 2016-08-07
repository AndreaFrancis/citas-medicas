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
  .run(run);


  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state'];
      function run($rootScope, $location, $cookieStore, $http, $state) {

          //$rootScope.globals = $cookieStore.get('globals') || {};
          /*if ($rootScope.globals.currentUser) {
              //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
          }*/
          $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log("GLOBALS: ", $rootScope.globals);
            console.log("PAGINA ACTUAL: ", $location.path());
              // redirect to login page if not logged in and trying to access a restricted page
              //var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
              var ubicacionActual = $location.path();
              var restrictedPage = ubicacionActual != '/login' && ubicacionActual != '/';

              var loggedIn = $rootScope.globals.currentUser;
              //var loggedIn = false;
              if (restrictedPage && !loggedIn) {
                  //$location.path('/login');
                $state.go('login');
              }
          });
      }
