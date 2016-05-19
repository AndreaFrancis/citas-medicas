'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('observacion', {
        url: '/observacion',
        template: '<observacion></observacion>'
      });
  });
