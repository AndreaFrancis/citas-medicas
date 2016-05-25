'use strict';
(function(){

class UsuarioComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('usuario', {
    templateUrl: 'app/usuario/usuario.html',
    controller: UsuarioComponent
  });

})();
