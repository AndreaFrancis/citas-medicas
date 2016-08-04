'use strict';
(function(){

class EmergenciaComponent {
   constructor($http) {
  	this.$http = $http;
    this.emergencia = {};
    this.emergencias = [];
    this.medico = {};
    this.medicos = [];
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
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

  guardar() {
  	console.log(this.emergencia);
    this.$http.post('/api/emergencias', {
    	fecha: this.emergencia.fecha,
    	fk_medico: this.medico._id
    });
    this.emergencia = {};
    this.listar();
  }

  eliminar(emergencia) {
  	this.$http.delete('/api/emergencias/'+emergencia._id);
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
  .component('emergencia', {
    templateUrl: 'app/emergencia/emergencia.html',
    controller: EmergenciaComponent,
    controllerAs: 'vm'
  });

})();
