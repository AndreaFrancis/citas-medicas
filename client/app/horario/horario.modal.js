function HorarioCtrl($uibModalInstance, $http) {
  this.$uibModalInstance = $uibModalInstance;
  this.hstep = 1;
  this.mstep = 1;
  this.ismeridian = false;
    this.medicos = [];
    this.medico = {};
    this.horario = {};
    this.especialidades = [];
    this.especialidad = {};
    $http.get('/api/especialidades')
      .then(response => {
        this.especialidades = response.data;
      });
    $http.get('/api/medicos')
      .then(response => {
        this.medicos = response.data;
      });
  this.diasSeleccionados = [];
  this.oneDaySelectionOnly = function(event,data){
            this.diasSeleccionados.push(data);
  }
  this.ok = function() {
    console.log("OJO DE UVA:"+this.diasSeleccionados);
    this.$uibModalInstance.close({estado:'guardar', medico:this.medico, horario:this.horario, especialidad:this.especialidad,fechas:this.diasSeleccionados});
  }

  this.eliminar = function() {
    this.$uibModalInstance.close('eliminar');
  }

  this.cancel = function() {
    this.$uibModalInstance.dismiss('cancelar');
  }

  this.seleccionarEspecialidad = function(especialidad) {
    this.especialidad = especialidad;
  }

  this.seleccionarEspecialidad = function(especialidad) {
    this.especialidad = especialidad;
  }

  this.seleccionarMedico = function(medico) {
  	this.medico = medico;
  }
}

angular.module('cosmilApp')
  .controller('HorarioCtrl',HorarioCtrl);
