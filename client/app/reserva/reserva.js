'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reserva', {
        url: '/reserva',
        template: '<reserva></reserva>'
      });
  });
