function UsuarioCtrl($uibModalInstance) {
  	this.$uibModalInstance = $uibModalInstance;
    this.persona = {};
    this.usuario = {};
    this.opened = false;
    this.dateOptions = {
      dateDisabled: false,
      formatYear: 'yyyy',
      startingDay: 1
    };


  this.ok = function() {
    this.$uibModalInstance.close({estado:'guardar', usuario:this.usuario, persona:this.persona});
  }

  this.eliminar = function() {
    this.$uibModalInstance.close('eliminar');
  }

  this.cancel = function() {
    this.$uibModalInstance.dismiss('cancelar');
  }

  this.abrirPopup = function(){
    this.opened=true
  }
}

angular.module('cosmilApp')
  .controller('UsuarioCtrl',UsuarioCtrl);
