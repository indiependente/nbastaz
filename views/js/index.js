var app = angular.module('nbastaz', ['ngMaterial']);

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
      href: '/home.html'
  }, {
      name: 'Teams',
      href: '/teams.html'
  }, {
      name: 'Players',
      href: '/players.html'
  }, {
      name: 'Highlights',
      href: '/highlights.html'
  }, {
      name: 'Standings',
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