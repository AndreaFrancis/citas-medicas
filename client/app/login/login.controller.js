'use strict';
(function(){

class LoginComponent {
  constructor(AuthenticationService, $location) {
    this.message = 'Hello';
    this.AuthenticationService = AuthenticationService;
    this.AuthenticationService.ClearCredentials();
    this.usuario = '';
    this.password = '';
    this.$location = $location;
  }

  login(){
    var usuario = this.usuario;
    var password = this.password;
    var AuthenticationService = this.AuthenticationService;
    var $location = this.$location;
    this.AuthenticationService.Login(usuario, password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(usuario, "BIOESTADISTCO",1);
                    $location.path('/');
                } else {
                    //FlashService.Error(response.message);
                    //vm.dataLoading = false;
                }
            });
  }
}

angular.module('cosmilApp')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: LoginComponent,
    controllerAs: 'vm'
  });
})();
