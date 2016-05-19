'use strict';
(function(){

class ReservaComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('reserva', {
    templateUrl: 'app/reserva/reserva.html',
    controller: ReservaComponent
  });

})();
