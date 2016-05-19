'use strict';
(function(){

class AseguradoComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('asegurado', {
    templateUrl: 'app/asegurado/asegurado.html',
    controller: AseguradoComponent
  });

})();
