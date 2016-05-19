'use strict';
(function(){

class HorarioComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('horario', {
    templateUrl: 'app/horario/horario.html',
    controller: HorarioComponent
  });

})();
