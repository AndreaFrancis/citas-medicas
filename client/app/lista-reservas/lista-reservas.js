'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lista-reservas', {
        url: '/lista-reservas',
        template: '<lista-reservas></lista-reservas>'
      });
  });
