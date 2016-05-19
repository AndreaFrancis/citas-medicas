'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('asegurado', {
        url: '/asegurado',
        template: '<asegurado></asegurado>'
      });
  });
