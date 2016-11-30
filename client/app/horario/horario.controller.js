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
          console.log(response);  
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
        var j = dias.length;
        for(var i= 0; i<j;i++) {
          var fun = function(i,dias){
            console.log(dias[i]._d);
            var existe = false;
            var dia = dias[i];
            self.$http.get('/api/horarios/consultorios/'+horario.consultorio+'/'+dias[i]._d)
                .then(response => {
                  var consultoriosllenos =  response.data;
                  console.log(consultoriosllenos);
                  var ind = 0;
                  while(ind<consultoriosllenos.length && !existe){
                    var mi_hora_inicio = horario.hora_inicio.getHours()+horario.hora_inicio.getMinutes()/60;
                    var mi_hora_fin = horario.hora_fin.getHours()+horario.hora_fin.getMinutes()/60;
                    var hora_inicio = new Date(consultoriosllenos[ind].hora_inicio).getHours()+new Date(consultoriosllenos[ind].hora_inicio).getMinutes()/60;
                    var hora_fin = new Date(consultoriosllenos[ind].hora_fin).getHours()+ new Date(consultoriosllenos[ind].hora_fin).getMinutes()/60;
                    console.log("Hora a comparar "+hora_inicio+" - "+hora_fin);
                    console.log("Mi hora "+mi_hora_inicio+" - "+mi_hora_fin);
                    if (mi_hora_inicio<hora_inicio){
                      existe = !(mi_hora_fin<=hora_inicio)
                    } else {
                      existe = mi_hora_inicio<hora_fin
                    }
                    ind++;
                  }
                  console.log("EXISTE : "+existe);
                  if (!existe){
                    self.$http.post('/api/horarios', {
                      fecha: dia,
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
                  } else {
                      alert("No se pudo registrar el horario en fecha "+dia._d+" debido a que el consultorio se encuentra ocupado en esa fecha")
                  }
                });
          };
          fun(i,dias);
        };
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
