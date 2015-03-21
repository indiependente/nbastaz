var app = angular.module('nbastaz', ['ngMaterial']);


app.filter('offset', function() {
return function(input, start) {
start = parseInt(start, 10);
return input.slice(start);
};
});
app.controller("PaginationCtrl", function($scope, $http) {
  $scope.itemsPerPage = 24;
  $scope.currentPage = 0;
  $scope.items = [];
  $http.get("http://localhost:3000/players")
        .success(function(response) {
          $scope.results = response;

  $scope.size = $scope.results.length;
    for (key in response) {
      $scope.items.push(response[key]);
    }
  });
  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;
    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
    start = $scope.pageCount()-rangeSize+1;
    }
    for (var i=start; i<start+rangeSize; i++) {
    ret.push(i);
    }
    return ret;
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
    $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };
});


 app.controller('nextMatchController', function($scope, $http){
        var todayAll = Date.today();
        var month = todayAll.getMonth()+1;
        var day = todayAll.toFormat('DD');
        var year = todayAll.getFullYear();
        var today = month+'-'+day+'-'+year;
        $scope.nm=false;
        $scope.today = today;
        $http.get("/matches?date="+today)
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
        $http.get("/matches?date="+yesterday)
        .success(function(response) {$scope.results = response;$scope.pm=true;});
    });


    app.controller('standingsController',['$rootScope','$scope','$http',function($rootScope,$scope,$http){
        $scope.erange=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        $scope.wrange=[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
        $http.get("/standings")
        .success(function(response){
          $scope.results=response;
          $rootScope.team_name=$rootScope.team;
          $rootScope.teams = [];
          for(i = 0;i< response.length;i++){
          $rootScope.teams[i] = response[i].link.split('-')[response[i].link.split('-').length-1];
          }

          //console.log(response[0].link.split('-')[response[0].link.split('-').length-1]);
        })
    }]);


  app.controller('AppCtrl', ['$rootScope','$scope', '$mdSidenav', 'pageService', '$timeout','$log', function($rootScope,$scope, $mdSidenav, pageService, $timeout, $log) {
  var allPages = [];

  // $rootScope.val = 5;
  
  $rootScope.selected = null;
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
        $rootScope.selected = $scope.pages[0];
      })
  }
  
  function toggleSidenav(name) {
    $mdSidenav(name).toggle();
  }
  
  function selectPage(page) {
    $rootScope.selected = angular.isNumber(page) ? $scope.pages[page] : page;
    $scope.toggleSidenav('left');
    //console.log($rootScope.selected);
  }
}])


app.service('pageService', ['$q', function($q) {
  var pages = [{
      name: 'Home',
      iconurl: '/icons/home.svg',
      href: '/home.html'
  }, {
      name: 'Teams',
      iconurl: '/icons/teams.svg',
      href: '/teams.html'
  }, {
      name: 'Players',
      iconurl:'/icons/player.svg',
      href: '/players.html'
  }, {
      name: 'Highlights',
      iconurl:'/icons/video.svg',
      href: '/highlights.html'
  }, {
      name: 'Standings',
      iconurl: '/icons/table.svg',
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


/*********GRID LIST*******/

    app.controller('gridList', ['$rootScope','$scope','$http',function($rootScope,$scope,$http) {
      

      $http.get("/teams")
        .success(function(response){
          $scope.res=response;
          $scope.tiles = buildGridModel({
            icon : "",
            title: "",
            background: "",
            id:""
          });
        })


    function buildGridModel(tileTmpl){
      var it, results = [ ];
      var j=0;
      for (key in $scope.res) {
        it = angular.extend({},tileTmpl);
        it.id = key;
        it.icon  = $scope.res[key]['logo'];
        it.title = $scope.res[key]['team'];
        it.span  = { row : "1", col : "1" };
        it.background = "white";
         switch(j+1) {
        //   case 1:
        //     it.background = "red";
        //     it.span.row = it.span.col = 2;
        //     break;
        //   case 2: it.background = "green";         break;
        //   case 3: it.background = "darkBlue";      break;
        //   case 4:
        //     it.background = "blue";
        //     it.span.col = 2;
        //     break;
          case 5:
            it.span.row = it.span.col = 1;
            it.icon="http://content.sportslogos.net/logos/6/5120/thumbs/512019262015.gif";
            //it.span.row = it.span.col = 1;
            break;
          // case 6: it.background = "pink";          break;
          // case 7: it.background = "darkBlue";      break;
          // case 8: it.background = "purple";        break;
          // case 9: it.background = "deepBlue";      break;
          // case 10: it.background = "lightPurple";  break;
          // case 11: it.background = "yellow";       break;
        }
        results.push(it);
        j++;
      }
      return results;
    }
  }])

  /*********GRID LIST*******/

  app.controller('teamCtrl',['$rootScope','$scope','$http',function($rootScope,$scope,$http) {

    var url = "/team?abbr="+$rootScope.team_name;

    $http.get(url)
    .success(function(response) {
      $scope.results = response;
      //console.log(response);
    });
    
    var url_staz = "/team/stats?abbr="+$rootScope.team_name;

    $http.get(url_staz)
    .success(function(response){
      $scope.staz  = response;
      console.log($scope.staz);
    });

    var url_roster = "/team/roster?abbr="+$rootScope.team_name;
    $http.get(url_roster)
    .success(function(response){
      $scope.roster = response;
    });


    var url_depth = "/team/depth?abbr="+$rootScope.team_name;
    $http.get(url_depth)
    .success(function(response){
      $scope.depth = response;
    });

  }]);