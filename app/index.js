'use strict';
//var dev=true;
var app = angular.module('experienceApp',[
		'appRoutes',
		'ngStorage',
		'ngAnimate',
		'ui.bootstrap',
		'experienceApp.appDataFactory',
		'experienceApp.dashboradDirectives',
		'experienceApp.alertsController',
		'experienceApp.loginController',
		'experienceApp.navbarController',
		
		
]);

app .filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });
app.run(['$rootScope', '$state', '$location', 'dataFactory', '$uibModal', '$anchorScroll',function($rootScope, $state ,$location ,dataFactory,$uibModal, $anchorScroll) {

	
  


}]);



//		'experienceApp.appDataFactory',
app.controller('appController', ['$scope','dataFactory', '$sessionStorage', '$rootScope', '$state',function DemoController($scope, dataFactory ,$localStorage ,$sessionStorage ,$rootScope ,$state) {
    
    
    
 
}]);
	

