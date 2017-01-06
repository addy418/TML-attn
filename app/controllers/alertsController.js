
(function(PERSISTENT_COMPANTY_ID){

angular
.module('experienceApp.alertsController', ['ngAnimate', 'ui.bootstrap','ngTable'])
.controller('alertsController', alertsController)
.controller('addAlertsModelController', addAlertsModelController)
.controller('NGTableCtrl',NGTableCtrl)
.controller('NGTableCtrl1',NGTableCtrl1)
.service('ngTableDataService', function() {

  var TableData = {
    cache: null,
    getData: function($defer, params, api){
      // if no cache, request data and filter
      if ( ! TableData.cache ) {
        if ( api ) {
          api.get(function(data){
            TableData.cache = data;
            filterdata($defer, params);
          });
        }
      }
      else {
        filterdata($defer, params);
      }
      
      function filterdata($defer, params) {
        var from = (params.page() - 1) * params.count();
        var to = params.page() * params.count();
        var filteredData = TableData.cache.result.slice(from, to);

        params.total(TableData.cache.total);
        $defer.resolve(filteredData);
      }

    }
  };
  
  return TableData;

})
/* .controller('userConfirmController', userConfirmController);
 */
addAlertsModelController.$injector = ['$scope', '$uibModalInstance', '$uibModal', 'dataFactory','$rootScope'];
alertsController.$injector = ['$scope', '$rootScope', 'dataFactory', '$state', '$timeout', '$uibModal'];
NGTableCtrl.$inject = ["$scope", "$filter", "NgTableParams", "$timeout","$q","$http","dataFactory"];
NGTableCtrl1.$inject = ["$scope", "$filter", "NgTableParams", "$timeout","$q","$http","dataFactory"];

 

function alertsController($scope, $rootScope, dataFactory, $state, $timeout, $uibModal) {
$scope.addUserPopup=addUserPopup;
    $scope.showalerts=false;
      $rootScope.hideProfile=false;
    $scope.getAlertsclass=function(){
        if( $scope.showalerts)
            return "list-group-item filter-category inactive-category";
        else
             return "list-group-item filter-category active-category";
    }
    
    
     $scope.getSOSclass=function(){
        if( $scope.showalerts)
            return "list-group-item filter-category active-category";
        else
             return "list-group-item filter-category inactive-category";
    }
     
    
//	dataFactory.setCurrentState("yoursandbox");
	
	function addUserPopup(){
        console.log("adduser clicked")
		var modalInstance = $uibModal.open({
          templateUrl: 'addUsers.html',
                  controller: addAlertsModelController,
				  scope : $scope,
          windowClass: 'md-Modal'
          });

        modalInstance.result.then(function () {      }
         , function () {      }
         );
	}    
    
    
     dataFactory.getAllAlerts()
            .then(getAllAlertsSuccess)
            .catch(getAllAlertsError);  

            function getAllAlertsSuccess(response)
            {  
                console.log(response.data.json)
               $scope.alertsCount=response.data.length;
            }

            function getAllAlertsError(error)
            {
                console.log("Error get all alerts")
            }
    

     dataFactory.getAllSOS()
            .then(getAllSosSuccess)
            .catch(getAllSosError);  

            function getAllSosSuccess(response)
            {  
                console.log(response.data.json)
               $scope.sosCount=response.data.length;
            }

            function getAllSosError(error)
            {
                console.log("Error get all sos")
            }
    
    
    
     dataFactory.getparkingslots()
            .then(getparkingslotsSuccess)
            .catch(getparkingslotsError);  

            function getparkingslotsSuccess(response)
            {  
                console.log(response.data.json)
               $scope.parkings=response.data.availableSlotCount;
            }

            function getparkingslotsError(error)
            {
                console.log("Error get parking")
            }
    
    
}

  
    function addAlertsModelController ($scope, $uibModalInstance, $uibModal, dataFactory, $rootScope){
		var callErrorHandler = function (method, apiResponse, postApiDataSent) {
		errorObj = {
			controller: "addUserModelController",
			method: method,
			postApiDataSent: postApiDataSent,
			apiResponse: apiResponse
		}
		$rootScope.handleErrors(errorObj);
	};
     //  $scope.users = dataFactory.getUsersForSandbox();
        var parent = $scope.$parent;
         var confirmModal;
        $scope.newUser = {"fullname" : "", "username" : "", isAdmin : false};        
      
        $scope.closePopUp = closePopUp;
 
        var parent = $scope.$parent;
        function closePopUp(reponse ) {
            console.log("closePopUp",response);
          };
        
        
        function closePopUp() {
            $uibModalInstance.dismiss('cancel');
          };
  
         $scope.addAlerts=function(){
          var createdBy=JSON.parse(localStorage.getItem("loggedInuser"))
             
             var body={
                    "alerts_text": $scope.newAlert.alertText,
                    "alert_zone":$scope.newAlert.zone,
                    "created_by": createdBy.username
                }
            dataFactory.addAlert(body)
             console.log(createdBy)
         
         }
        
    };     	
		
    
    
function NGTableCtrl($scope, $filter, NgTableParams,  $timeout,$q,$http,dataFactory) {
  'use strict';
  // required for inner references
  var vm = this;


  var data = [ ];

  // SELECT ROWS
  // ----------------------------------- 

  vm.data = data;

  vm.tableParams3 = new NgTableParams({count:5}, {counts: [5, 10, 15,20,25], getData: function(params) {
      var deferred = $q.defer();
      var promise = deferred.promise;
     
      $scope.myspinner=true;
       $scope.selectedId=1;
      $scope.enddate=new Date();
      var alertUrl=dataFactory.getalertURL();
      $http.get(alertUrl)
        .then(function (response) {
          console.log("data for Keywords \n" +response.data.json.length);
          deferred.resolve(response.data.json.slice((params.page() - 1) * params.count(), params.page() * params.count()));
           $scope.myspinner=false;         
        });
      return promise;
    } });

  vm.changeSelection = function(user) {
      console.log(user);
  };
}
    
    
    
    
    
    function NGTableCtrl1($scope, $filter, NgTableParams,  $timeout,$q,$http,dataFactory) {
  'use strict';
  // required for inner references
  var vm = this;


  var data = [ ];

  // SELECT ROWS
  // ----------------------------------- 

  vm.data = data;

  vm.tableParams3 = new NgTableParams({count:5}, {counts: [5, 10, 15,20,25], getData: function(params) {
      var deferred = $q.defer();
      var promise = deferred.promise;
     
      $scope.myspinner=true;
       $scope.selectedId=1;
      $scope.enddate=new Date();
      var SOSUrl=dataFactory.getSosURL();
      $http.get(SOSUrl)
        .then(function (response) {
          console.log("data for Keywords \n" +response.data.json.length);
          deferred.resolve(response.data.json.slice((params.page() - 1) * params.count(), params.page() * params.count()));
           $scope.myspinner=false;         
        });
      return promise;
    } });

  vm.changeSelection = function(user) {
      console.log(user);
  };
}
    
})();








