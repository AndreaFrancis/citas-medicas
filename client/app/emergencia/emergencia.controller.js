'use strict';
(function(){

class EmergenciaComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('emergencia', {
    templateUrl: 'app/emergencia/emergencia.html',
    controller: EmergenciaComponent
  });

})();
