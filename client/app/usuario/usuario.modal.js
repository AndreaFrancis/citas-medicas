function UsuarioCtrl($uibModalInstance) {
  this.$uibModalInstance = $uibModalInstance;
  this.constructor = function($uibModalInstance) {
  	this.$uibModalInstance = $uibModalInstance;
    this.persona = {};
    this.usuario = {};
  }

  this.ok = function() {
    this.$uibModalInstance.close({estado:'guardar', usuario:this.usuario, persona:this.persona});
  }

  this.cancel = function() {
    this.$uibModalInstance.dismiss('cancelar');
  }

}

angular.module('cosmilApp')
  .controller('UsuarioCtrl',UsuarioCtrl);
