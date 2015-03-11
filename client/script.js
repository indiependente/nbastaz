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
    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });
    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });
    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

   scotchApp.controller('nextMatchController', function($scope){
           $scope.results=[
            {name:'SAC-CHA', time:19},
            {name:'CHI-PHI', time:20},
            {name:'MEM-BOS', time:21},
            {name:'MEM-BOS', time:22}
        ];
    });

    scotchApp.controller('prevMatchController', function($scope){
           $scope.results=[
            {name:'SAC-CHA', score:'1-9'},
            {name:'CHI-PHI', score:'2-0'},
            {name:'MEM-BOS', score:'2-1'},
            {name:'MEM-BOS', score:'2-2'}
        ];
    });