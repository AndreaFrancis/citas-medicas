'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('medico', {
        url: '/medico',
        template: '<medico></medico>'
      });
  });
