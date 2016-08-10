'use strict';

(function(){

class ListaReservasComponent {
  constructor($http, $uibModal, $rootScope) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.$rootScope = $rootScope;
    this.reserva = {};
    this.reservas = [];
    this.matricula = '';
    this.asegurado = {};
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  }

  login() {
    var self = this;
    if(this.matricula != null && this.matricula.trim() != '') {
        var matricula = this.matricula.trim();
        this.$http.get('/api/asegurados/mat/'+matricula)
        .then(response => {
          this.asegurado = response.data;
          self.$http.get('/api/reservas/'+response.data._id)
                    .then(response => {
                      console.log(response);
                      self.reservas = response.data;
                    });
        });
    }
  }

  confirmar(reserva){
    reserva.estado="CONFIRMADA";
    this.$http.put('/api/reservas/'+ reserva._id,reserva)
    .success(function(reserva){
      alert("Se confirmo la reserva");
    })
    .error(function(err){
      alert("No se pudo guardar la reserva, intentelo mas tarde");
    })
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


  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('listaReservas', {
    templateUrl: 'app/lista-reservas/lista-reservas.html',
    controller: ListaReservasComponent,
    controllerAs: 'vm'
  });

})();
