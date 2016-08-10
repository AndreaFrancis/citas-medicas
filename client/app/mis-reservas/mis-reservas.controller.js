'use strict';

(function(){

class MisReservasComponent {
  constructor($http, $uibModal, $rootScope) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.$rootScope = $rootScope;
    this.reserva = {};
    this.reservas = [];
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
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
    var usuarioId = this.$rootScope.globals.currentUser.id;
    console.log("Usuario: ",usuarioId);
    this.$http.get('/api/usuarios/'+usuarioId)
        .then(response => {
          var personaId = response.data.Persona._id;
          console.log("Persona: ",personaId);
          this.$http.get('/api/asegurados/'+personaId)
              .then(response => {
                console.log("Asegurado: ",response);
                //this.asegurado = response.data;
                this.$http.get('/api/reservas/'+response.data._id)
                    .then(response => {
                      console.log(response);
                      this.reservas = response.data;
                    });
              });
        });
  }

  eliminar(reserva){
    /*var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'eliminar-horario.html',
      controller: 'HorarioCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        console.log("Entra a eliminar");
        self.$http.delete('/api/horarios/'+horario._id);
        self.listar();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });*/
  }

  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('misReservas', {
    templateUrl: 'app/mis-reservas/mis-reservas.html',
    controller: MisReservasComponent,
    controllerAs: 'vm'
  });

})();
