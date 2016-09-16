'use strict';
(function(){

class MedicoComponent {
  constructor($http, $uibModal) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.medico = {};
    this.medicos = [];
  }

  $onInit() {
      this.listar();
  }


  obtenerDia(fecha){
    var date = new Date(fecha);
    return date.toLocaleDateString();
  }

  eliminar(medico){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'eliminar-medico.html',
      controller: 'MedicoCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        console.log("Entra a eliminar");
        self.$http.delete('/api/medicos/'+medico._id);
        self.listar();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  abrir(){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'medico-modal.html',
      controller: 'MedicoCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        var persona = resultado.persona;
        var especialidad = resultado.especialidad;
        var medico = resultado.medico;
        self.$http.post('/api/personas', {
        nombres: persona.nombres,
        apaterno: persona.apaterno,
        amaterno: persona.amaterno,
        fecha_nacimineto: persona.fecha_nacimineto,
        genero: persona.genero
      })
      .success(function(response){
        self.$http.post('/api/medicos', {
          nombres: medico.nombres,
        	apellidos: medico.apellidos,
        	matricula: medico.matricula,
          fk_especialidad: especialidad._id,
          fk_persona: response._id
        })
        .success(function(respuesta){
          console.log("SUCCESS");
          self.listar();
        })
        .error(function(status){
          console.log("Error: ", status);
        });
      })
      .error(function(status){
        console.log("Error: ", status);
      });
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  seleccionarEspecialidad(especialidad) {
    this.especialidad = especialidad;
  }


  listar() {
    this.$http.get('/api/medicos')
        .then(response => {
          console.log(response);
          this.medicos = response.data;
        });
  }
}

angular.module('cosmilApp')
  .component('medico', {
    templateUrl: 'app/medico/medico.html',
    controller: MedicoComponent,
    controllerAs: 'vm'
  });

})();
