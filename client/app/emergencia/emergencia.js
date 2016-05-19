'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('emergencia', {
        url: '/emergencia',
        template: '<emergencia></emergencia>'
      });
  });
