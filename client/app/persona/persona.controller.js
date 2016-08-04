'use strict';
(function(){

class PersonaComponent {
  constructor($http) {
  	this.$http = $http;
    this.persona = {};
    this.personass = [];
  }

  $onInit() {
      this.listar();
  }

  guardar() {
  	console.log(this.persona);
    this.$http.post('/api/personas', {
    	nombres: this.persona.nombres,
    	apellidos: this.persona.apellidos,
    	matricula: this.persona.matricula,
      historia: 1,
      reserva_web: true
    });
    this.listar();
    this.persona = {};
  }

  eliminar(persona) {
  	this.$http.delete('/api/personas/'+persona._id);
  }

  listar() {
    this.$http.get('/api/personas')
        .then(response => {
          console.log(response);
          this.personas = response.data;
        });
  }
}

angular.module('cosmilApp')
  .component('persona', {
    templateUrl: 'app/persona/persona.html',
    controller: PersonaComponent,
    controllerAs: 'vm'
  });

})();
