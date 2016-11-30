'use strict';
(function(){

class UsuarioComponent {
  constructor($http, $uibModal,$state) {
    this.$uibModal = $uibModal;
  	this.$http = $http;
    this.persona = {};
    this.usuario = {};
    this.usuarios = [];
    this.$state = $state;
  }

  $onInit() {
      this.listar();
  }

  editar(us){
    this.usuario = us;
  }

  obtenerDia(fecha){
    var date = new Date(fecha);
    return date.toLocaleDateString();
  }

  eliminar(usuario){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'eliminar-usuario.html',
      controller: 'UsuarioCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        console.log("Entra a eliminar");
        self.$http.delete('/api/usuarios/'+usuario._id);
        self.listar();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  abrir(){
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'usuario-modal.html',
      controller: 'UsuarioCtrl',
      controllerAs:'vm',
      size: 1
    });
    modalInstance.result.then(function (resultado) {
        var persona = resultado.persona;
        var usuario = resultado.usuario;
        self.$http.post('/api/personas', {
        nombres: persona.nombres,
        apaterno: persona.apaterno,
        amaterno: persona.amaterno,
        fecha_nacimineto: persona.fecha_nacimineto,
        genero: persona.genero
      })
      .success(function(response){
        self.$http.post('/api/usuarios', {
          usuario: usuario.usuario,
          password: usuario.password,
          rol: usuario.rol,
          fk_persona: response._id,
          cambio:false
        })
        .success(function(respuesta){
          console.log("SUCCESS");
          self.listar();
        })
        .error(function(status){
          console.log("Error: ", status);
        });
      })
      .error(function(status){
        console.log("Error: ", status);
      });
      //this.listar();
      self.persona = {};


    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  listar() {
    this.$http.get('/api/usuarios')
        .then(response => {
          console.log(response);
          this.usuarios = response.data;
        });
  }
}

angular.module('cosmilApp')
  .component('usuario', {
    templateUrl: 'app/usuario/usuario.html',
    controller: UsuarioComponent,
    controllerAs: 'vm'
  });

})();
