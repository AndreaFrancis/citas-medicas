'use strict';

(function(){

class ListaReservasComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('listaReservas', {
    templateUrl: 'app/lista-reservas/lista-reservas.html',
    controller: ListaReservasComponent,
    controllerAs: 'listaReservasCtrl'
  });

})();
