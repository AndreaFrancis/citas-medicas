function ObservacionCtrl($uibModalInstance, $http) {
    this.$uibModalInstance = $uibModalInstance;
    this.observacion = {};
    this.medicos = [];
    this.medico = {};
    $http.get('/api/medicos')
      .then(response => {
        this.medicos = response.data;
      });


  this.ok = function() {
    this.$uibModalInstance.close({estado:'guardar', medico:this.medico, observacion:this.observacion});
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
  .controller('ObservacionCtrl',ObservacionCtrl);
