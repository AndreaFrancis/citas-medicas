'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reporte', {
        url: '/reporte',
        template: '<reporte></reporte>'
      });
  });
