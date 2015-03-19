var app = angular.module('nbastaz', ['ngMaterial']);


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


    app.controller('standingsController',function($scope,$http){
        $scope.erange=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        $scope.wrange=[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
        $http.get("/standings")
        .success(function(response){
          $scope.results=response;
        })
    });



    /*********GRID LIST*******/

    app.controller('gridList', function($scope,$http) {
      $http.get("/teams")
        .success(function(response){
          $scope.res=response;

        })

      this.tiles = buildGridModel({
            icon : "avatar:svg-",
            title: "Svg-",
            background: ""
          });

    function buildGridModel(tileTmpl){
      var it, results = [ ];
      for (var j=0; j<30; j++) {
        it = angular.extend({},tileTmpl);
        
        console.log($scope.res);
        
        it.icon  = $scope.res[j][0];
        it.title = it.title + (j+1);
        it.span  = { row : "1", col : "1" };
        switch(j+1) {
          case 1:
            it.background = "red";
            it.span.row = it.span.col = 2;
            break;
          case 2: it.background = "green";         break;
          case 3: it.background = "darkBlue";      break;
          case 4:
            it.background = "blue";
            it.span.col = 2;
            break;
          case 5:
            it.background = "yellow";
            it.span.row = it.span.col = 2;
            break;
          case 6: it.background = "pink";          break;
          case 7: it.background = "darkBlue";      break;
          case 8: it.background = "purple";        break;
          case 9: it.background = "deepBlue";      break;
          case 10: it.background = "lightPurple";  break;
          case 11: it.background = "yellow";       break;
        }
        results.push(it);
      }
      return results;
    }
  })
  .config( function( $mdIconProvider ){
    $mdIconProvider.iconSet("avatar", './icons/avatar-icons.svg', 128);
  });


  /*********GRID LIST*******/




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