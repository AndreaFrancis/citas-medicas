'use strict';

(function(){

class TodasReservasComponent {
  constructor($http, $uibModal, $rootScope) {
  	this.$http = $http;
    this.horarios = [];
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    this.hoy = new Date();
  }

  obtenerHora(hora, n, minutos){
    var date = new Date(hora);
    var minutes = n*minutos;
    var newdate = new Date(date.getTime() + minutes*60000);
    return newdate.toLocaleTimeString();
  }

  obtenerDia(fecha){
    var date = new Date(fecha);
    return this.dias[date.getDay()] + " "+date.toLocaleDateString();
  }

  listar() {
                this.$http.get('/api/horarios/hoy/0')
                    .then(response => {
                      console.log("HOY");
                      console.log(response.data);
                      this.horarios = response.data;
                    });
  }


  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('todasReservas', {
    templateUrl: 'app/todas-reservas/todas-reservas.html',
    controller: TodasReservasComponent,
    controllerAs: 'vm'
  });

})();
