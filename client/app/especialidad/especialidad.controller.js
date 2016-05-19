'use strict';
(function(){

class EspecialidadComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('especialidad', {
    templateUrl: 'app/especialidad/especialidad.html',
    controller: EspecialidadComponent
  });

})();
