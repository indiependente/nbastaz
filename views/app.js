(function(){
    var app = angular.module('nbastaz', ['ngRoute']);
    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })
            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })
            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

    app.controller('mainController', function($scope) {

        
    });

    app.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    app.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    app.controller('nextMatchController', function($scope, $http){
        var todayAll = Date.today();
        var month = todayAll.getMonth()+1;
        var day = todayAll.toFormat('DD');
        var year = todayAll.getFullYear();
        var today = month+'-'+day+'-'+year;
        $http.get("http://localhost:3000/matches?date="+today)
        .success(function(response) {$scope.results = response;});
    });

    app.controller('prevMatchController', function($scope, $http){
        var yesterdayAll = Date.yesterday();
        var month = yesterdayAll.getMonth()+1;
        var day = yesterdayAll.toFormat('DD');
        var year = yesterdayAll.getFullYear();
        var yesterday = month+'-'+day+'-'+year;
        $http.get("http://localhost:3000/matches?date="+yesterday)
        .success(function(response) {$scope.results = response;});
    });
})();