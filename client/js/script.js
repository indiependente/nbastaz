    // create the module and name it scotchApp
    var scotchApp = angular.module('scotchApp', ['ngRoute']);
    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
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
    
    /*
    scotchApp.controller('mainController', function($scope) {
        
        $scope.message = 'Everyone come and see how good I look!';
    });
    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });
    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });*/

   scotchApp.controller('nextMatchController', function($scope, $http){
            var todayAll = (new Date()).today();
            var month = todayAll.getMonth()+1;
            var day = todayAll.toFormat('DD');
            var year = todayAll.getFullYear();
            var today = month+'-'+day+'-'+year;
           $http.get("http://http://localhost:3000/matches?date="+today)
            .success(function(response) {$scope.results = response;});
    });

    scotchApp.controller('prevMatchController', function($scope){
            var yesterdayAll = (new Date()).yesterday();
            var month = yesterdayAll.getMonth()+1;
            var day = yesterdayAll.toFormat('DD');
            var year = yesterdayAll.getFullYear();
            var yesterday = month+'-'+day+'-'+year;
           $http.get("http://http://localhost:3000/matches?date="+yesterday)
            .success(function(response) {$scope.results = response;});
    });

