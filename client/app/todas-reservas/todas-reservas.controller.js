'use strict';

(function(){

class TodasReservasComponent {
  constructor($http, $uibModal, $rootScope) {
  	this.$http = $http;
    this.horarios = [];
    this.dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    this.hoy = new Date();
    this.opened = false;
    this.dateOptions = {
      dateDisabled: false,
      formatYear: 'yyyy',
      startingDay: 1
    };
    this.fecha = new Date();
  }

  abrirPopup(){
        this.opened=true
  }
  buscar() {
    var nueva = this.fecha.toISOString().slice(0,10);
    this.$http.get('/api/horarios/hoy/'+nueva)
        .then(response => {
          this.horarios = response.data;
          //Informaci'on para cuadro 1
          this.data = [];
          for (var i = 0; i < this.horarios.length; i++) {
            console.log(this.horarios[i]);
            var medico = {key:this.horarios[i].Medico.Persona.nombres+" "+this.horarios[i].Medico.Persona.apaterno+" "+this.horarios[i].Medico.Persona.amaterno,y:this.horarios[i].Reservas.length }
            this.data.push(medico);
          }
          //nformacion para cuadro 2
        var values_conf = [];
        var values_no_conf = [];
        this.data2 = [];
        for (var i = 0; i < this.horarios.length; i++) {
          console.log(this.horarios[i]);
          var medico = this.horarios[i].Medico.Persona.nombres+" "+this.horarios[i].Medico.Persona.apaterno+" "+this.horarios[i].Medico.Persona.amaterno;
          var cant_confi = 0;
          var cant_no_confi = 0;
          for (var j = 0; j < this.horarios[i].Reservas.length; j++) {
            if(this.horarios[i].Reservas[j].estado=='CONFIRMADA'){
              cant_confi++;
            }else{
              cant_no_confi++;
            }
          }
          var lab_conf = {label:medico,value:cant_confi};
          var lab_no_conf = {label:medico,value:cant_no_confi};
          values_no_conf.push(lab_no_conf);
          values_conf.push(lab_conf);
        }
        var confirmados = {
          "key": "Confirmadas",
          "color": "#1f77b4",
          "values":values_conf
        }
        var no_confirmados = {
          "key": "No confirmadas",
          "color": "#d62728",
          "values":values_no_conf
        }
        this.data2.push(no_confirmados);
        this.data2.push(confirmados);
        /*this.data = [
            {
                "key": "Series1",
                "color": "#d62728",
                "values": [
                    {
                        "label" : "Group A" ,
                        "value" : -1.8746444827653
                    } ,
                    {
                        "label" : "Group B" ,
                        "value" : -8.0961543492239
                    } ,
                    {
                        "label" : "Group C" ,
                        "value" : -0.57072943117674
                    } ,
                    {
                        "label" : "Group D" ,
                        "value" : -2.4174010336624
                    } ,
                    {
                        "label" : "Group E" ,
                        "value" : -0.72009071426284
                    } ,
                    {
                        "label" : "Group F" ,
                        "value" : -0.77154485523777
                    } ,
                    {
                        "label" : "Group G" ,
                        "value" : -0.90152097798131
                    } ,
                    {
                        "label" : "Group H" ,
                        "value" : -0.91445417330854
                    } ,
                    {
                        "label" : "Group I" ,
                        "value" : -0.055746319141851
                    }
                ]
            },
            {
                "key": "Series2",
                "color": "#1f77b4",
                "values": [
                    {
                        "label" : "Group A" ,
                        "value" : 25.307646510375
                    } ,
                    {
                        "label" : "Group B" ,
                        "value" : 16.756779544553
                    } ,
                    {
                        "label" : "Group C" ,
                        "value" : 18.451534877007
                    } ,
                    {
                        "label" : "Group D" ,
                        "value" : 8.6142352811805
                    } ,
                    {
                        "label" : "Group E" ,
                        "value" : 7.8082472075876
                    } ,
                    {
                        "label" : "Group F" ,
                        "value" : 5.259101026956
                    } ,
                    {
                        "label" : "Group G" ,
                        "value" : 0.30947953487127
                    } ,
                    {
                        "label" : "Group H" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "Group I" ,
                        "value" : 0
                    }
                ]
            }
        ]*/



          this.options2 = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };
          this.options = {
                 chart: {
                     type: 'pieChart',
                     height: 500,
                     x: function(d){return d.key;},
                     y: function(d){return d.y;},
                     showLabels: true,
                     duration: 500,
                     labelThreshold: 0.01,
                     labelSunbeamLayout: true,
                     legend: {
                         margin: {
                             top: 5,
                             right: 35,
                             bottom: 5,
                             left: 0
                         }
                     }
                 }
             };
        });
  }
  obtenerHora(hora, n, minutos){
    var date = new Date(hora);
    var minutes = n*minutos;
    var newdate = new Date(date.getTime() + minutes*60000);
    return newdate.toLocaleTimeString();
  }

  obtenerDia(fecha){
    var date = new Date(fecha);
    return this.dias[date.getDay()] + " "+date.toLocaleDateString();
  }

  listar() {
                this.$http.get('/api/horarios/hoy/0')
                    .then(response => {
                      console.log("HOY");
                      console.log(response.data);
                      this.horarios = response.data;
                    });
  }


  $onInit() {
  	this.listar();
  }
}

angular.module('cosmilApp')
  .component('todasReservas', {
    templateUrl: 'app/todas-reservas/todas-reservas.html',
    controller: TodasReservasComponent,
    controllerAs: 'vm'
  });

})();
