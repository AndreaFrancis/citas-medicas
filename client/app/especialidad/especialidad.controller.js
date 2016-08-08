'use strict';
(function(){

class EspecialidadComponent {
  constructor($http, $uibModal) {
    this.$uibModal = $uibModal;
    this.$http = $http;
    this.especialidad = {};
    this.especialidades = [];
  }

  listar() {
  	this.$http.get('/api/especialidades')
        .then(response => {
          console.log(response);
          this.especialidades = response.data;
        });
  }

  eliminar(especialidad){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'eliminar-especialidad.html',
      controller: 'EspecialidadCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        console.log("Entra a eliminar");
        self.$http.delete('/api/especialidades/'+especialidad._id);
        self.listar();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  abrir(){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'especialidad-modal.html',
      controller: 'EspecialidadCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
      var especialidad = resultado.especialidad;
      self.$http.post('/api/especialidades', {
        nombre:especialidad.nombre
      })
      .success(function(response){
        self.listar();
        self.persona = {};
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
  .component('especialidad', {
    templateUrl: 'app/especialidad/especialidad.html',
    controller: EspecialidadComponent,
    controllerAs: 'vm'
  });

})();
