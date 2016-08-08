function EspecialidadCtrl($uibModalInstance) {
  this.$uibModalInstance = $uibModalInstance;
  this.constructor = function($uibModalInstance) {
  	this.$uibModalInstance = $uibModalInstance;
    this.especialidad = {};
  }

  this.ok = function() {
    this.$uibModalInstance.close({estado:'guardar', especialidad:this.especialidad});
  }

  this.eliminar = function() {
    this.$uibModalInstance.close('eliminar');
  }

  this.cancel = function() {
    this.$uibModalInstance.dismiss('cancelar');
  }

}

angular.module('cosmilApp')
  .controller('EspecialidadCtrl',EspecialidadCtrl);
