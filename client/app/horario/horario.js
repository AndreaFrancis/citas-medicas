'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('horario', {
        url: '/horario',
        template: '<horario></horario>'
      });
  });
