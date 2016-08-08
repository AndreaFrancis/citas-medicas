function EmergenciaCtrl($uibModalInstance, $http) {
    this.$uibModalInstance = $uibModalInstance;
    this.emergencia = {};
    this.medicos = [];
    this.medico = {};
    $http.get('/api/medicos')
      .then(response => {
        this.medicos = response.data;
      });


  this.ok = function() {
    this.$uibModalInstance.close({estado:'guardar', medico:this.medico, emergencia:this.emergencia});
  }

  this.eliminar = function() {
    this.$uibModalInstance.close('eliminar');
  }

  this.cancel = function() {
    this.$uibModalInstance.dismiss('cancelar');
  }

  this.seleccionarMedico = function(medico) {
    this.medico = medico;
  }

}

angular.module('cosmilApp')
  .controller('EmergenciaCtrl',EmergenciaCtrl);
