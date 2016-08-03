'use strict';
(function(){

class ReservaComponent {
  constructor($http,$uibModal) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.especialidades = [];
    this.asegurado = {};
    this.matricula = null;
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    this.nro = 0;
    this.horario = {};
  }

  listar() {
  }

  getIndice = function(num) {
      return new Array(num);
  }
  obtenerDia(fecha){
    var date = new Date(fecha);
    return this.dias[date.getDay()] + " "+date.toLocaleDateString();
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

  reservar() {
    console.log("OJO");
    console.log(this);
    if(this.asegurado._id != null) {
      var reserva = {
        fk_horario : this.horario._id,
        nro: this.nro,
        confirmada: false,
        fk_asegurado: this.asegurado._id
      }
      this.$http.post('/api/reservas', reserva);
      this.listar();
    } else {
      alert("Debe ingresar su matricula para realizar una reserva");
    }
  }


  open(nro, horario) {
    var $http = this.$http;
    var asegurado = this.asegurado;
    console.log("Entrando");
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs:'vm',
      size: 1,
      resolve: {
        items: function () {
          return [];
        }
      }
    });
    //var funcionReservar = this.reservar;
    modalInstance.result.then(function (selectedItem) {
      console.log('Comienza reserva');
      console.log("OJO");
      if(asegurado._id != null) {
        var reserva = {
          fk_horario : horario._id,
          //nro: nro+1,
          nro: nro+1,
          confirmada: false,
          fk_asegurado:asegurado._id,
          estado:"POR CONFIRMAR"
        }
        $http.post('/api/reservas', reserva);
        //this.listar();
      } else {
        alert("Debe ingresar su matricula para realizar una reserva");
      }

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  /*obtenerReservaVinculada(indice, horario){
    indice++;
    var i = 0;
    for (i=0; i<horario.Reservas.length;i++) {
      var reserva = horario.Reservas[i];
      if(reserva.nro == indice.toString()){
        return reserva;
      }
    }
    return {estado:"DISPONIBLE"};
  }*/

  obtenerObjetosReservaPorHorario(horario){
    var objetos = [];

    /*for (var i=1; i<=horario.fichas;i++) {
      console.log(i);
      var estado = "DISPONIBLE";
      for (var j=0; j<horario.Reservas.length;j++) {
        var reserva = horario.Reservas[j];
        if(reserva.nro == i){
          estado = "OCUPADO";
        }
      }
      objetos.push({estado:"DISPONIBLE",nro:i});
    }*/
    console.log("Devolviendo para ", horario.fichas);
    return objetos;
  }

  $onInit() {
  	this.listar();
  	/*this.$http.get('/api/medicos')
        .then(response => {
          console.log(response);
          this.medicos = response.data;
        });*/
    this.$http.get('/api/especialidades/semana')
        .then(response => {
          for(var e=0; e<response.data.length;e++){
            for(var m=0; m<response.data[e].Medicos.length; m++){
              for(var h=0;h<response.data[e].Medicos[m].Horarios.length;h++){
                var objetos = [];
                for (var i=1; i<=response.data[e].Medicos[m].Horarios[h].fichas;i++) {
                  var estado = "DISPONIBLE";
                  console.log("Ficha ",i);
                  for (var j=0; j<response.data[e].Medicos[m].Horarios[h].Reservas.length;j++) {
                    var reserva = response.data[e].Medicos[m].Horarios[h].Reservas[j];
                    if(reserva.nro == i){
                      console.log("OCUPADO");
                      estado = "OCUPADO";
                    }
                  }
                  objetos.push({estado:estado,nro:i});
                }
                response.data[e].Medicos[m].Horarios[h].Reservas = objetos;
              }
            }
          }
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
