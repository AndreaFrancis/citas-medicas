'use strict';
(function(){

class HorarioComponent {
  constructor($http, $uibModal) {
  	this.$http = $http;
    this.$uibModal = $uibModal;
    this.horario = {};
    this.horarios = [];
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  }

  obtenerDia(fecha){
    var date = new Date(fecha);
    return this.dias[date.getDay()] + " "+date.toLocaleDateString();
  }

  listar() {
  	this.$http.get('/api/horarios')
        .then(response => {
          this.horarios = response.data;
        });
  }

  obtenerHora(hora){
    var date = new Date(hora);
    return date.toLocaleTimeString();
  }

  eliminar(horario){
    var self = this;
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
    });
  }

  abrir(){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'horario-modal.html',
      controller: 'HorarioCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        var horario = resultado.horario;
        var medico = resultado.medico;
        var especialidad = medico.Especialidad;
        var dias = resultado.fechas;
        console.log("=========HORARIO===========");
        console.log(horario);
        horario.hora_inicio.setSeconds(0);
        horario.hora_fin.setSeconds(0);
        var diffHora = horario.hora_fin.getTime() - horario.hora_inicio.getTime();
        var minutos = (diffHora/60000);
        var cantidad = minutos/horario.minutos;
        horario.fichas = cantidad;
        console.log("HORA INICIO", horario.hora_inicio);
        console.log("HORA FIN", horario.hora_fin);
        console.log("CANTIDAD: "+ cantidad);
        for(var i= 0; i<dias.length;i++){
          self.$http.post('/api/horarios', {
            fecha: dias[i],
            fichas: horario.fichas,
            fichas_actual: horario.fichas,
            consultorio: horario.consultorio,
            minutos: horario.minutos,
            hora_inicio: horario.hora_inicio,
            hora_fin: horario.hora_fin,
            fk_especialidad: especialidad._id,
            fk_medico: medico._id
          })
          .success(function(response){
            console.log("SUCCESS");
            self.listar();
          })
          .error(function(status){
            console.log("Error: ", status);
          });
        }
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('horario', {
    templateUrl: 'app/horario/horario.html',
    controller: HorarioComponent,
    controllerAs: 'vm'
  });

})();
