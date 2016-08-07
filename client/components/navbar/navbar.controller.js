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
      this.roles = ROLES;
      //this.$scope.$watch('this.$rootScope.globals.currentUser', this.actualizarUsuario());


      this.menu = [
      /*{
      state:'persona',
      title: 'Personas',
      rol: this.roles.ADMIN
    },*/
      {
    	state:'usuario',
    	title: 'Usuarios'
    	},
      {
    	state:'especialidad',
    	title: 'Especialidades'
    	},
      {
    	state:'medico',
    	title: 'Medicos'
    	},
      {
		  state:'emergencia',
    	title: 'Emergencias'
    	},
      {
		  state:'observacion',
    	title: 'Observaciones'
    	},
      {
    	state:'horario',
    	title: 'Horarios'
    	},
      {
    	state:'asegurado',
    	title: 'Asegurados'
    	},
      {
    	state:'reserva',
    	title: 'Reservar'
      },
      {
      state:'reporte',
      title: 'Reportes'
      },
      {
      state:'mis-reservas',
      title: 'Mis reservas'
      },
      {
      state:'lista-reservas',
      title: 'Lista reservas'
      }];
  }

  salir() {
    this.AuthenticationService.ClearCredentials();
    this.$state.go('login');
  }

}
//end-non-standard

angular.module('cosmilApp')
  .controller('NavbarController', NavbarController);
