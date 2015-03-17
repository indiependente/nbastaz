var app = angular.module('nbastaz', ['ngMaterial']);


 app.controller('nextMatchController', function($scope, $http){
        var todayAll = Date.today();
        var month = todayAll.getMonth()+1;
        var day = todayAll.toFormat('DD');
        var year = todayAll.getFullYear();
        var today = month+'-'+day+'-'+year;
        $scope.nm=false;
        $scope.today = today;
        $http.get("http://localhost:3000/matches?date="+today)
        .success(function(response) {$scope.results = response;$scope.nm=true;});
    });

    app.controller('prevMatchController', function($scope, $http){
        var yesterdayAll = Date.yesterday();
        var month = yesterdayAll.getMonth()+1;
        var day = yesterdayAll.toFormat('DD');
        var year = yesterdayAll.getFullYear();
        var yesterday = month+'-'+day+'-'+year;
        $scope.pm=false;
        $scope.yesterday = yesterday;
        $http.get("http://localhost:3000/matches?date="+yesterday)
        .success(function(response) {$scope.results = response;$scope.pm=true;});
    });


    app.controller('standingsController',function($scope,$http){
        $scope.erange=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        $scope.wrange=[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
        $http.get("http://localhost:3000/standings")
        .success(function(response){
          $scope.results=response;
        })
    });




app.controller('AppCtrl', ['$scope', '$mdSidenav', 'pageService', '$timeout','$log', function($scope, $mdSidenav, pageService, $timeout, $log) {
  var allPages = [];
  
  $scope.selected = null;
  $scope.pages = allPages;
  $scope.selectPage = selectPage;
  $scope.toggleSidenav = toggleSidenav;
  
  loadPages();
  
  //*******************
  // Internal Methods
  //*******************
  function loadPages() {
    pageService.loadAll()
      .then(function(pages){
        allPages = pages;
        $scope.pages = [].concat(pages);
        $scope.selected = $scope.pages[0];
      })
  }
  
  function toggleSidenav(name) {
    $mdSidenav(name).toggle();
  }
  
  function selectPage(page) {
    $scope.selected = angular.isNumber(page) ? $scope.pages[page] : page;
    $scope.toggleSidenav('left');
  }
}])


app.service('pageService', ['$q', function($q) {
  var pages = [{
      name: 'Home',
      //iconurl: 'mdi mdi-bell',
      href: '/home.html'
  }, {
      name: 'Teams',
      //iconurl: 'mdi mdi-bell',
      href: '/teams.html'
  }, {
      name: 'Players',
      // iconurl:'http://www.killthecablebill.com/images/cancelcable/2014/12/derrick-rose-nba-chicago-bulls-basketball-slam-dunk-stuck-shape-white-background-ball.jpg',
      href: '/players.html'
  }, {
      name: 'Highlights',
      href: '/highlights.html'
  }, {
      name: 'Standings',
      // iconurl: 'http://www.scoresreport.com/wp-content/uploads/2010/04/nba-playoffs-bracket.jpg',
      href: '/standings.html'
  }];

  // Promise-based API
  return {
      loadAll: function() {
          // Simulate async nature of real remote calls
          return $q.when(pages);
      }
  };


}]);