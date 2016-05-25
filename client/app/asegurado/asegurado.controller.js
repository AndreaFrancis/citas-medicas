'use strict';
(function(){

class AseguradoComponent {
  constructor($http) {
  	this.$http = $http;
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
    	fk_usuario: 1,
      fk_dependiente: 1,
      historia: 1,
      reserva_web: true
    });
    this.listar();
    this.asegurado = {};
  }

  eliminar(asegurado) {
  	this.$http.delete('/api/asegurados/'+asegurado._id);
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
