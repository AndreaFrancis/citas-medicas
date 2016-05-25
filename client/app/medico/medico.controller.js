'use strict';
(function(){

class MedicoComponent {
  constructor($http) {
  	this.$http = $http;
    this.medico = {};
    this.medicos = [];
    this.especialidades = [];
    this.especialidad = {};
  }

  $onInit() {
      this.listar();
      this.$http.get('/api/especialidades')
        .then(response => {
          this.especialidades = response.data;
        });
  }

  guardar() {
  	console.log(this.medico);
    this.$http.post('/api/medicos', {
    	nombres: this.medico.nombres,
    	apellidos: this.medico.apellidos,
    	matricula: this.medico.matricula,
      fk_especialidad: this.especialidad._id
    });
    this.listar();
    this.medico = {};
  }

  seleccionarEspecialidad(especialidad) {
    this.especialidad = especialidad;
  }

  eliminar(medico) {
  	this.$http.delete('/api/medicos/'+medico._id);
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
