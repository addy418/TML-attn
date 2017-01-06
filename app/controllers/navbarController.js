(function(){

angular
    .module('experienceApp.navbarController', ['ngAnimate', 'ui.bootstrap'])
    .controller('navbarController', navbarController);

navbarController.$injector = ['$scope', '$rootScope', 'dataFactory', '$state', '$timeout','$uibModal','$localStorage'];

function navbarController($scope, $rootScope, dataFactory, $state, $timeout,$uibModal,$localStorage) {
	 $scope.loggedInuser={}
	 if(localStorage.getItem("loggedInuser"))
         $scope.loggedInuser=JSON.parse(localStorage.getItem("loggedInuser"));
    else 
        $scope.loggedInuser.user="";
	//console.log($scope.loggedInuser.username);
			
    
			
}

    
})();