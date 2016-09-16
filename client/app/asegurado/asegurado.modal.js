function AseguradoCtrl($uibModalInstance) {
    this.$uibModalInstance = $uibModalInstance;
    this.persona = {};
    this.asegurado = {};
    this.opened = false;
    this.dateOptions = {
      dateDisabled: false,
      formatYear: 'yyyy',
      startingDay: 1
    };
  this.abrirPopup = function(){
          this.opened=true

  }
  this.ok = function() {
    this.$uibModalInstance.close({estado:'guardar', asegurado:this.asegurado, persona:this.persona});
  }

  this.eliminar = function() {
    this.$uibModalInstance.close('eliminar');
  }
  this.cancel = function() {
    this.$uibModalInstance.dismiss('cancelar');
  }
}

angular.module('cosmilApp')
  .controller('AseguradoCtrl',AseguradoCtrl);
