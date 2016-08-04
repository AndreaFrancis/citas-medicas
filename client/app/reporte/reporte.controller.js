'use strict';
(function(){

class ReporteComponent {
  constructor($http) {
  	this.$http = $http;

  }

  $onInit() {
      this.listar();
  }

  listar() {

  }
}

angular.module('cosmilApp')
  .component('reporte', {
    templateUrl: 'app/reporte/reporte.html',
    controller: ReporteComponent,
    controllerAs: 'vm'
  });

})();
