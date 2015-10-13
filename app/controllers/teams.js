'use strict';

app.controller('TeamsController', function($scope, TeamService) {
  TeamService.getAll().success(function(data) {
    $scope.teams = data.object;
  });
});

app.controller('TeamController', function($scope, $routeParams, TeamService) {
  TeamService.getOne($routeParams.id).success(function(data) {
    $scope.team = data.object;
  });
  var update = function() {
    TeamService.update($routeParams.id, $scope.newTeam).success(function(data) {
      $scope.team = data.object;
    });
  };
  $scope.newTeam = {};
  $scope.fields = [
    {
      
    }
  ];
  
  return {
    update: update
  };
});
