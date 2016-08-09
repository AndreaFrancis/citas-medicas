'use strict';

(function(){

class PerfilComponent {
  constructor($http, $uibModal, $rootScope) {
    this.$rootScope = $rootScope;
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.usuario = {};
  }

  listar() {
    console.log(this.$rootScope.globals.currentUser.id);
  	this.$http.get('/api/usuarios/'+this.$rootScope.globals.currentUser.id)
        .then(response => {
          console.log(response);
          this.usuario = response.data;
        });
  }

  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('perfil', {
    templateUrl: 'app/perfil/perfil.html',
    controller: PerfilComponent,
    controllerAs: 'vm'
  });

})();
