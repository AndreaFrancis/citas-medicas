'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todas-reservas', {
        url: '/todas-reservas',
        template: '<todas-reservas></todas-reservas>'
      });
  });
