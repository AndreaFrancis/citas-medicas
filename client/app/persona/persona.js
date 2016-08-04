'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('persona', {
        url: '/persona',
        template: '<persona></persona>'
      });
  });
