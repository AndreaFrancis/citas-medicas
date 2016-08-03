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
  });
