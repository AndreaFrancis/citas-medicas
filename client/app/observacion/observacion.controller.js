'use strict';
(function(){

class ObservacionComponent {
  constructor($http) {
  	this.$http = $http;
    this.observacion = {};
    this.observaciones = [];
    this.medico = {};
    this.medicos = [];
  }

  listar() {
  	this.$http.get('/api/observaciones')
        .then(response => {
          console.log(response);
          this.observaciones = response.data;
        });
  }

  guardar() {
  	console.log(this.observacion);
    this.$http.post('/api/observaciones', {
    	fecha_inicio: this.observacion.fecha_inicio,
    	fecha_fin: this.observacion.fecha_fin,
    	motivo: this.observacion.motivo,
    	fk_medico: this.medico._id
    });
    this.observacion = {};
    this.listar();
  }

  eliminar(observacion) {
  	this.$http.delete('/api/observaciones/'+observacion._id);
  }

  seleccionarMedico(medico) { 
  	this.medico = medico;
  }

  $onInit() {
  	this.listar();
  	this.$http.get('/api/medicos')
        .then(response => {
          console.log(response);
          this.medicos = response.data;
        });
  }
}

angular.module('cosmilApp')
  .component('observacion', {
    templateUrl: 'app/observacion/observacion.html',
    controller: ObservacionComponent,
    controllerAs:'vm'
  });

})();
