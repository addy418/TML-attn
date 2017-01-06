angular.module('appRoutes', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
      
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
   .state('alerts', {
      url: "/dashboard",
      templateUrl: "./views/templates/alerts.html",
	  controller : "alertsController"
      
    })
	
	  .state('login', {
      url: "/login",
      templateUrl: "./views/templates/login.html",
	  controller : "LoginController"
    })	
	 
});
