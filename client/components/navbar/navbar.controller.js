'use strict';

class NavbarController {
  constructor() {
      this.menu = [
      {
      state:'persona',
      title: 'Personas'
      },
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
    	title: 'Reservas'
      },
      {
      state:'reporte',
      title: 'Reportes'
      }];
  }

}

//end-non-standard

angular.module('cosmilApp')
  .controller('NavbarController', NavbarController);
