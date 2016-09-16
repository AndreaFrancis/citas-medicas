function MedicoCtrl($uibModalInstance, $http) {
  this.$uibModalInstance = $uibModalInstance;
    this.medico = {};
    this.usuario = {};
    this.especialidades = [];
    this.especialidad = {};
    $http.get('/api/especialidades')
      .then(response => {
        this.especialidades = response.data;
        console.log("OJO");
        console.log(this.especialidades);
      });
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
    this.$uibModalInstance.close({estado:'guardar', medico:this.medico, persona:this.persona, especialidad:this.especialidad});
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

}

angular.module('cosmilApp')
  .controller('MedicoCtrl',MedicoCtrl);
