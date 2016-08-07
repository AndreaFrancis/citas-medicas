'use strict';

(function(){

class MisReservasComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('misReservas', {
    templateUrl: 'app/mis-reservas/mis-reservas.html',
    controller: MisReservasComponent,
    controllerAs: 'misReservasCtrl'
  });

})();
