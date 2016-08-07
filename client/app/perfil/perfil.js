'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('perfil', {
        url: '/perfil',
        template: '<perfil></perfil>'
      });
  });
