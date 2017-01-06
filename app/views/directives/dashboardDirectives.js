var app = angular.module('experienceApp.dashboradDirectives', []);

app.directive('pagefooter', ['dataFactory', function(dataFactory) {
    return {
        restrict: 'E',
        templateUrl: 'views/templates/footer.html',
        link: function($scope) {
            console.log("footer controller");
        }
    };
}]);

app.directive('carousel', ['dataFactory', function(dataFactory) {
    return {
        restrict: 'E',
        templateUrl: 'views/templates/carousel.html',
        link: function($scope) {
            console.log("carousel controller");
        }
    };
}]);

app.directive('topnavbar', ['dataFactory', '$state', function(dataFactory, $state) {
    return {
        restrict: 'E',
        templateUrl: 'views/templates/navbar.html',
        link: function($scope) {
           
            $scope.collapseNavbar = false;
        
        
            $scope.logout = function() {
                dataFactory.logout();
                $state.go('login');
            };
           
        }
    };
}]);







var INTEGER_REGEXP = /^[A-Za-z0-9 _./-]*$/;    
var MAX_DIGITS_6 = /\b\d{6}\b/;
//var ONLYDIGITS_REGEXP = /[0-9]/g;   
var ONLYDIGITS_REGEXP = /^[0-9\b]+$/;
var EMAIL_BASIC=/^(([^<>()\[\] "\\.,;:\s@"\\.,;:\s@"]+(\.[^<>()\[\] "\\.,;:\s@"\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;           //format xyz@xyz.com
var ONLY_ALPHABETS = /^[A-z]+$/  
var ONLY_ALPHABETS_SPACE = /^[a-zA-Z ]*$/  
//var ONLY_ALPHABETS_SPACE = /^[a-zA-Z ]+$/; 


var createDirective=function(directiveName,regEx){
app.directive(directiveName, function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.customError = function(modelValue, viewValue) {
       if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
        return true;
        }

        if (regEx.test(viewValue)) {
          // it is valid
           console.log('true');
          return true;
        }
        // it is invalid
        console.log('false');
		//ctrl.$setViewValue("");
         //     ctrl.$render();
        return false;
      };
    }
  };
});
}

createDirective('alphanumeric', INTEGER_REGEXP );
createDirective('onlyDigits', ONLYDIGITS_REGEXP );
createDirective('limit6digits', MAX_DIGITS_6 );
createDirective('onlyAlphabets', ONLY_ALPHABETS );
createDirective('aplhabetWithSpace', ONLY_ALPHABETS_SPACE );
//createDirective('emailbasic', EMAIL_BASIC);


app.directive('emailbasic', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.customError = function(modelValue, viewValue) {
       if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
        return true;
        }

        if (EMAIL_BASIC.test(viewValue)) {
          // it is valid
          var LI = viewValue.lastIndexOf('@');
            console.log("viewValue",viewValue);
            console.log("LI",LI);    
          var first = viewValue.substring(0,LI+1);
          var last = viewValue.substring(LI+1).toLowerCase();
            console.log("first",first,"last",last);
            
            if( last == 'persistent.co.in' || last == 'persistent.com' ||last == 'persistentsys.com')
                {
                    console.log("formatted value",first + last );
                    ctrl.$setViewValue( first + last );
                    ctrl.$render();  
                    return true;
                }

          return false;
        }
        // it is invalid
        console.log('false');
		//ctrl.$setViewValue("");
         //     ctrl.$render();
        return false;
      };
    }
  };
});
