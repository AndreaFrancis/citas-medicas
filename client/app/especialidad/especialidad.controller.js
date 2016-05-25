'use strict';
(function(){

class EspecialidadComponent {
  constructor($http) {
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

  guardar() {
  	console.log(this.especialidad);
    this.$http.post('/api/especialidades', {
    	nombre: this.especialidad.nombre
    });
    this.especialidad = {};
    this.listar();
  }

  eliminar(especialidad) {
  	this.$http.delete('/api/especialidades/'+especialidad._id);
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
