'use strict';
(function(){

class HorarioComponent {
  constructor($http) {
  	this.$http = $http;
  	this.hstep = 1;
    this.mstep = 1;
    this.ismeridian = false;
    this.horario = {};
    this.horarios = [];
    this.medico = {};
    this.medicos = [];
    this.especialidad = {};
    this.especialidades = [];
  }

  listar() {
  	this.$http.get('/api/horarios')
        .then(response => {
          console.log(response);
          this.horarios = response.data;
        });
  }

  guardar() {
  	console.log(this.horario);
    this.$http.post('/api/horarios', {
    	fecha: this.horario.fecha,
    	fichas: this.horario.fichas,
      fichas_actual: this.horario.fichas,
    	consultorio: this.horario.consultorio,
    	minutos: this.horario.minutos,
    	hora_inicio: this.horario.hora_inicio,
    	hora_fin: this.horario.hora_fin,
    	fk_especialidad: this.especialidad._id,
    	fk_medico: this.medico._id
    });
    this.horario = {};
    this.listar();
  }

  eliminar(horario) {
  	this.$http.delete('/api/horarios/'+horario._id);
  }

  seleccionarMedico(medico) { 
  	this.medico = medico;
  }

  seleccionarEspecialidad(especialidad) { 
  	this.especialidad = especialidad;
  }

  $onInit() {
  	this.listar();
  	this.$http.get('/api/medicos')
        .then(response => {
          console.log(response);
          this.medicos = response.data;
        });
    this.$http.get('/api/especialidades')
        .then(response => {
          console.log(response);
          this.especialidades = response.data;
        });
  }
}

angular.module('cosmilApp')
  .component('horario', {
    templateUrl: 'app/horario/horario.html',
    controller: HorarioComponent,
    controllerAs: 'vm'
  });

})();
