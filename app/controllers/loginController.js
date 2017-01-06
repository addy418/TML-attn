(function() {

angular
    .module('experienceApp.loginController', ['ui.bootstrap'])
    .controller('LoginController', LoginController);

LoginController.$injector =  ['$scope', '$rootScope', 'dataFactory', '$state', '$uibModal','$localStorage'];


function LoginController($scope, $rootScope, dataFactory, $state, $uibModal,$localStorage) {
    $rootScope.hideProfile=true;
	
   
    $scope.login=function(){
        localStorage.setItem("loggedInuser",angular.toJson($scope.user));
     $state.go('alerts');
    }
   
    
}

    

})();