'use strict';
(function(){

class ReservaComponent {
  constructor($http) {
  	this.$http = $http;
    this.especialidades = [];
    this.asegurado = {};
    this.matricula = null;
  }

  listar() {
  	this.$http.get('/api/horarios')
        .then(response => {
          console.log(response);
          this.horarios = response.data;
        });
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

  login() {
    if(this.matricula != null && this.matricula.trim() != '') { 
        var matricula = this.matricula.trim();
        this.$http.get('/api/asegurados/'+matricula)
        .then(response => {
          console.log(response);
          this.asegurado = response.data;
        });
    }
  }

  reservar(nro, horario) {
    if(this.asegurado._id != null) {
      var reserva = {
        fk_horario : horario._id,
        nro: nro,
        confirmada: false,
        fk_asegurado: this.asegurado._id
      }
      this.$http.post('/api/reservas', reserva);
      this.listar();
    } else {
      alert("Debe ingresar su matricula para realizar una reserva");
    }
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
  .component('reserva', {
    templateUrl: 'app/reserva/reserva.html',
    controller: ReservaComponent,
    controllerAs: 'vm'
  });

})();
