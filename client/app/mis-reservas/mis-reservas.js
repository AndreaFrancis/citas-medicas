'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mis-reservas', {
        url: '/mis-reservas',
        template: '<mis-reservas></mis-reservas>'
      });
  });
