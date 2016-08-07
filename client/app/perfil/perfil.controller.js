'use strict';

(function(){

class PerfilComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cosmilApp')
  .component('perfil', {
    templateUrl: 'app/perfil/perfil.html',
    controller: PerfilComponent,
    controllerAs: 'perfilCtrl'
  });

})();
