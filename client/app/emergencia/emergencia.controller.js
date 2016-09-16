'use strict';
(function(){

class EmergenciaComponent {
   constructor($http, $uibModal,  $rootScope, ROLES) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.emergencia = {};
    this.emergencias = [];
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    this.esAdmin = $rootScope.globals.currentUser.rol == ROLES.ADMIN;
  }

  listar() {
  	this.$http.get('/api/emergencias')
        .then(response => {
          console.log(response);
          this.emergencias = response.data;
        });
  }

  obtenerDia(fecha){
    var date = new Date(fecha);
    return this.dias[date.getDay()] + " "+date.toLocaleDateString();
  }

  eliminar(emergencia){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'eliminar-emergencia.html',
      controller: 'EmergenciaCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        console.log("Entra a eliminar");
        self.$http.delete('/api/emergencias/'+emergencia._id);
        self.listar();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  abrir(){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'emergencia-modal.html',
      controller: 'EmergenciaCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        var medico = resultado.medico;
        var emergencia = resultado.emergencia;
        self.$http.post('/api/emergencias', {
        fecha: emergencia.fecha,
      	fk_medico: medico._id
      })
      .success(function(response){
        console.log("SUCCESS");
        self.listar();
      })
      .error(function(status){
        console.log("Error: ", status);
      });
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }


  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('emergencia', {
    templateUrl: 'app/emergencia/emergencia.html',
    controller: EmergenciaComponent,
    controllerAs: 'vm'
  });

})();
