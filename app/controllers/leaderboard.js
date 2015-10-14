'use strict';

app.controller('LeaderboardController', function($scope, $interval, LeaderboardService) {
  LeaderboardService.getTeams().success(function(data) {
    $scope.leaders = data.object;
  });
  LeaderboardService.getPlayers().success(function(data) {
    $scope.players = data.object;
  });
  $scope.leaders = {};
  $scope.players = {};
  $scope.updated = Date.now();
  $scope.stopLoop = function() {
    $interval.cancel($scope.loop);
  };
  $scope.$on('$destroy', function() {
    $scope.stopLoop();
  });
  $scope.loop = $interval(function() {
    console.log('tick: ', Date.now());
    LeaderboardService.getTeams().success(function(data) {
      $scope.leaders = data.object;
    });
    LeaderboardService.getPlayers().success(function(data) {
      $scope.players = data.object;
    });
    $scope.updated = Date.now();
  }, 2000);
});
