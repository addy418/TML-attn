var app = angular.module('experienceApp.appDataFactory', []);
app.factory('dataFactory', ['$http', '$interval', '$state', '$q',function($http ,$interval ,$state, $q) {    
    var dataFactory = {};
 
    var SOSUrl=baseApiUrl+"/sos";
    var alertUrl=baseApiUrl+"/alerts";
  var parkingUrl=baseApiUrl+"/parkingslots";
    var callApi = function(URL, METHOD, HEADERS, DATA, ShowLoader) {	
        
        console.log("url", URL, "data", DATA);
        var req = {
            method: METHOD,
            url: URL
        }
        if (DATA && (Object.keys(DATA).length != 0)) {
            req.data = DATA;
        }
        if (HEADERS && (Object.keys(HEADERS).length != 0)) {
            HEADERS.username = loggedInUser.username;
            req.headers = HEADERS;
        }

        
        if( ShowLoader && (ShowLoader == true) )
            req.showLoader = true;
        return $http(req);
    };		
		
     
dataFactory.getalertURL=function(){
return alertUrl;

}
dataFactory.getSosURL=function(){
return SOSUrl;

}
   
    dataFactory.logout = function() {
        
        $state.go( 'login' );
    };    
    
    
    dataFactory.getAllSOS=function(){
            return  callApi(SOSUrl,"GET", {}, {}, false) 	
    }
    
    
    dataFactory.getAllAlerts=function(){
            return  callApi(alertUrl,"GET", {}, {}, false) 	
    }
    
     dataFactory.getparkingslots=function(){
            return  callApi(parkingUrl,"GET", {}, {}, false) 	
    }
    
    dataFactory.addAlert=function(body){
            return  callApi(alertUrl,"POST", {}, body, false) 	
    }
    
    return dataFactory;    
}]);
