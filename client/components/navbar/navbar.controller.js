'use strict';

class NavbarController {
  constructor($cookieStore,$rootScope,AuthenticationService,$state, $scope, ROLES) {
      this.$scope = $scope;
      this.$state = $state;
      this.AuthenticationService = AuthenticationService;
      this.usuario = $rootScope.globals.currentUser;
      this.logeado = false;
      if(this.usuario != null) {
          this.logeado = this.usuario.username != null;
      }
      this.ROLES = ROLES;
      if(this.usuario != null) {
        this.menu = [
        {
        state:'usuario',
        title: 'Usuarios',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'especialidad',
        title: 'Especialidades',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'medico',
        title: 'Medicos',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'emergencia',
        title: 'Emergencias',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'observacion',
        title: 'Observaciones',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'horario',
        title: 'Horarios',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'asegurado',
        title: 'Asegurados',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'reserva',
        title: 'Reservar',
        permitido: this.usuario.rol == this.ROLES.ASEGURADO || this.usuario.rol == this.ROLES.RECEP
        },
        {
        state:'reporte',
        title: 'Reportes',
        permitido: this.usuario.rol == this.ROLES.ADMIN
        },
        {
        state:'mis-reservas',
        title: 'Mis reservas',
        permitido: this.usuario.rol == this.ROLES.ASEGURADO
        },
        {
        state:'lista-reservas',
        title: 'Lista reservas',
        permitido: this.usuario.rol == this.ROLES.RECEP || this.usuario.rol == this.ROLES.BIO
        }];
      }
  }

  verPerfil(){
    this.$state.go('perfil');
  }
  salir() {
    this.AuthenticationService.ClearCredentials();
    this.$state.go('login');
  }

}
//end-non-standard

angular.module('cosmilApp')
  .controller('NavbarController', NavbarController);
