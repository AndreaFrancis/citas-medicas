'use strict';

angular.module('cosmilApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('especialidad', {
        url: '/especialidad',
        template: '<especialidad></especialidad>'
      });
  });
