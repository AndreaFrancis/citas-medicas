'use strict';
(function(){

class MedicoComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('medico', {
    templateUrl: 'app/medico/medico.html',
    controller: MedicoComponent
  });

})();
