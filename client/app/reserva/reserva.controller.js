'use strict';
(function(){
//Clave asegurado 810506GCJ
class ReservaComponent {
  constructor($http,$uibModal, $rootScope, ROLES) {
    this.error = false;
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.especialidades = [];
    this.asegurado = {};
    this.matricula = null;
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    this.nro = 0;
    this.horario = {};
    this.esRecepcionista = $rootScope.globals.currentUser.rol == ROLES.RECEP;
    this.medicos = [];
    this.horarios = [];
    this.fichas = [];
    this.verEspecialidades = true;
    this.verMedicos = false;
    this.verHorario = false;
    this.verFichas = false;
    if(!this.esRecepcionista) {
      var usuarioId = $rootScope.globals.currentUser.id;
      this.$http.get('/api/usuarios/'+usuarioId)
          .then(response => {
            var personaId = response.data.Persona._id;
            this.$http.get('/api/asegurados/'+personaId)
                .then(response => {
                  this.asegurado = response.data;
                });
          });
    }
  }

  mostrarMedicos(especialidad){
    this.medicos = especialidad.Medicos;
    console.log(this.medicos);
    this.verEspecialidades = false;
    this.verMedicos = true;
    this.e = especialidad;
  }

  mostrarHorarios(medico){
    this.horarios = medico.Horarios;
    console.log(this.horarios);
    this.verMedicos = false;
    this.verHorarios = true;
    this.m = medico;
  }

  mostrarFichas(horario){
    this.fichas = horario.Reservas;
    console.log(this.fichas);
    this.verHorarios = false;
    this.verFichas = true;
    this.h = horario
  }
  mostrarReservar(ficha){
    console.log("Cambiando");
    this.n = ficha;
    console.log(this.n);
    this.verFichas = false;
    this.verReseva = true;
  }

  volverEspecialidades() {
    this.verMedicos = false;
    this.verEspecialidades = true;
  }
  volverMedicos(){
    this.verMedicos = true;
    this.verHorarios = false;
  }
  volverHorarios(){
    this.verHorarios = true;
    this.verFichas = false;
  }
  volverFichas(){
    this.verFichas = true;
    this.verReseva = false;
  }
  listar(){
    this.$http.get('/api/especialidades/semana')
        .then(response => {
          console.log(response.data);
          for(var e=0; e<response.data.length;e++){
            for(var m=0; m<response.data[e].Medicos.length; m++){
              for(var h=0;h<response.data[e].Medicos[m].Horarios.length;h++){
                var objetos = [];
                var fecha = new Date(response.data[e].Medicos[m].Horarios[h].fecha);
                var estaEmergencia = false;
                var ind =  0;
                while(ind<response.data[e].Medicos[m].Emergencias.length && !estaEmergencia){
                  var fechacomp = new Date(response.data[e].Medicos[m].Emergencias[ind].fecha);
                  estaEmergencia = fecha.getTime() ==  fechacomp.getTime();
                  console.log("EMERGENCIA "+estaEmergencia+" - "+fecha+" - "+fechacomp);
                  ind++;
                }

                var estaOcupado = false;
                ind = 0;
                console.log("ojo");
                while(ind<response.data[e].Medicos[m].Observaciones.length && !estaOcupado) {
                  var fecha_inicio = new Date(response.data[e].Medicos[m].Observaciones[ind].fecha_inicio);
                  var fecha_fin = new Date(response.data[e].Medicos[m].Observaciones[ind].fecha_fin);
                  estaOcupado = fecha>=fecha_inicio && fecha<=fecha_fin;
                  console.log("HORARIO "+estaOcupado+" - "+fecha+" - "+fecha_inicio+" - "+fecha_fin);
                  ind++;
                }

                if (!estaEmergencia &&  !estaOcupado){
                  for (var i=1; i<=response.data[e].Medicos[m].Horarios[h].fichas;i++) {
                    var estado = "DISPONIBLE";
                    for (var j=0; j<response.data[e].Medicos[m].Horarios[h].Reservas.length;j++) {
                      var reserva = response.data[e].Medicos[m].Horarios[h].Reservas[j];
                      if(reserva.nro == i){
                        estado = "OCUPADO";
                      }
                    }
                    objetos.push({estado:estado,nro:i});
                  }
                  response.data[e].Medicos[m].Horarios[h].Reservas = objetos;
                  response.data[e].Medicos[m].Horarios[h].estado = "DISPONIBLE";
                } else {
                  var detalle = estaEmergencia? "EMERGENCIA":"PERMISO";
                  response.data[e].Medicos[m].Horarios[h].estado = detalle;
                }
              }
            }
          }
          console.log("===================AL FINAL");
          console.log(response.data);
          this.especialidades = response.data;
        });
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

  obtenerHora(hora, n, minutos){
    var date = new Date(hora);
    var minutes = n*minutos;
    var newdate = new Date(date.getTime() + minutes*60000);
    return newdate.toLocaleTimeString();
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
        this.$http.get('/api/asegurados/mat/'+matricula)
        .then(response => {
          this.asegurado = response.data;
          this.error = false;
        }, error => {
          this.error = true;
        });
    }
  }

  reservar() {
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
    var self = this;
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
    modalInstance.result.then(function (selectedItem) {
      if(asegurado._id != null) {
        var reserva = {
          fk_horario: horario._id,
          nro: nro,
          confirmada: false,
          fk_asegurado:asegurado._id,
          estado:"POR CONFIRMAR"
        }
        $http.post('/api/reservas', reserva)
        .success(function(reserva){
          self.listar();
          self.verReseva = false;
          self.verFichas = false;
          self.verHorarios = false;
          self.verMedicos = false;
          self.verEspecialidades = true;
        })
        .error(function(err){
          alert("No se pudo guardar la reserva, intentelo mas tarde");
        })
      } else {
        alert("Debe ingresar su matricula para realizar una reserva");
      }

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  obtenerObjetosReservaPorHorario(horario){
    var objetos = [];
    return objetos;
  }

  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('reserva', {
    templateUrl: 'app/reserva/reserva.html',
    controller: ReservaComponent,
    controllerAs: 'vm'
  });
})();
