'use strict';
(function(){

class AseguradoComponent {
  constructor($http, $uibModal) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.asegurado = {};
    this.asegurados = [];
  }

  $onInit() {
      this.listar();
  }

  guardar() {
  	console.log(this.asegurado);
    this.$http.post('/api/asegurados', {
    	nombres: this.asegurado.nombres,
    	apellidos: this.asegurado.apellidos,
    	matricula: this.asegurado.matricula,
      historia: 1,
      reserva_web: true
    });
    this.listar();
    this.asegurado = {};
  }

  eliminar(asegurado){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'eliminar-asegurado.html',
      controller: 'AseguradoCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        console.log("Entra a eliminar");
        self.$http.delete('/api/asegurados/'+asegurado._id);
        self.listar();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  abrir(){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'asegurado-modal.html',
      controller: 'AseguradoCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        var persona = resultado.persona;
        var asegurado = resultado.asegurado;
        self.$http.post('/api/personas', {
        nombres: persona.nombres,
        apaterno: persona.apaterno,
        amaterno: persona.amaterno,
        fecha_nacimineto: persona.fecha_nacimineto,
        genero: persona.genero
        })
        .success(function(response){
        self.$http.post('/api/asegurados', {
        	matricula: asegurado.matricula,
          grado: asegurado.grado,
          fuerza: asegurado.fuerza,
          tipo_asegurado: asegurado.tipo_asegurado,
          matricula: asegurado.matricula,
          fk_persona:response._id
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


  listar() {
    this.$http.get('/api/asegurados')
        .then(response => {
          console.log(response);
          this.asegurados = response.data;
        });
  }
}

angular.module('cosmilApp')
  .component('asegurado', {
    templateUrl: 'app/asegurado/asegurado.html',
    controller: AseguradoComponent,
    controllerAs: 'vm'
  });

})();
