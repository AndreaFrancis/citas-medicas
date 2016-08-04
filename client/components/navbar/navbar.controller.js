'use strict';

class NavbarController {
  constructor() {
      this.menu = [{
    	state:'usuario',
    	title: 'Usuarios'
    	}, {
    	state:'especialidad',
    	title: 'Especialidades'
    	}, {
    	state:'medico',
    	title: 'Medicos'
    	}, {
		state:'emergencia',
    	title: 'Emergencias'
    	}, {
		state:'observacion',
    	title: 'Observaciones'
    	}, {
    	state:'horario',
    	title: 'Horarios'
    	},  {
    	state:'asegurado',
    	title: 'Asegurados'
    	}, {
    	state:'reserva',
    	title: 'Reservas'
      },
      {
        state:'login',
        title: 'Login'
      }];
  }

}

//end-non-standard

angular.module('cosmilApp')
  .controller('NavbarController', NavbarController);
