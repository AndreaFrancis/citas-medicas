'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('usuario', {
        url: '/usuario',
        template: '<usuario></usuario>'
      });
  });
