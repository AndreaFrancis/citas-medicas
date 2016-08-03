function ModalInstanceCtrl($uibModalInstance) {
  this.$uibModalInstance = $uibModalInstance;
  this.constructor = function($uibModalInstance) {
  	this.$uibModalInstance = $uibModalInstance;
  }

  this.ok = function() {
    this.$uibModalInstance.close('reservar');
  }

  this.cancel = function() {
    this.$uibModalInstance.dismiss('cancelar');
  }

}

angular.module('cosmilApp')
  .controller('ModalInstanceCtrl',ModalInstanceCtrl);
