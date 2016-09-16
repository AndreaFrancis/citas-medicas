'use strict';
(function(){

class ObservacionComponent {
  constructor($http, $uibModal, $rootScope, ROLES) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.observacion = {};
    this.observaciones = [];
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    this.esAdmin = $rootScope.globals.currentUser.rol == ROLES.ADMIN;
  }

  obtenerDia(fecha){
    var date = new Date(fecha);
    return this.dias[date.getDay()] + " "+date.toLocaleDateString();
  }

  listar() {
  	this.$http.get('/api/observaciones')
        .then(response => {
          console.log(response);
          this.observaciones = response.data;
        });
  }

  eliminar(observacion){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'eliminar-observacion.html',
      controller: 'ObservacionCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        console.log("Entra a eliminar");
        self.$http.delete('/api/observaciones/'+observacion._id);
        self.listar();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  abrir(){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'observacion-modal.html',
      controller: 'ObservacionCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        var medico = resultado.medico;
        var observacion = resultado.observacion;
        self.$http.post('/api/observaciones', {
        fecha_inicio: observacion.fecha_inicio,
      	fecha_fin: observacion.fecha_fin,
      	motivo: observacion.motivo,
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
  .component('observacion', {
    templateUrl: 'app/observacion/observacion.html',
    controller: ObservacionComponent,
    controllerAs:'vm'
  });

})();
