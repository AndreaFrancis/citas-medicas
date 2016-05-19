'use strict';
(function(){

class ObservacionComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('observacion', {
    templateUrl: 'app/observacion/observacion.html',
    controller: ObservacionComponent
  });

})();
