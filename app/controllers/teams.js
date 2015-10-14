'use strict';

app.controller('TeamsController', function($scope, TeamService, ModalService) {
  TeamService.getAll().success(function(data) {
    $scope.teams = data.object;
  });

  $scope.newTeam = {};

  $scope.fields = [
    {
      key: 'Name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Team Name',
        placeholder: 'Bird Busters'
      }
    }
  ];

  $scope.onSubmit = function() {
    TeamService.create($scope.newTeam);
    TeamService.getAll().success(function(data) {
      $scope.teams = data.object;
    });
    $scope.newTeam = {};
  };

  $scope.showEditModal = function(team) {
    ModalService.showModal({
      templateUrl: 'partial/edit-team-modal',
      controller: 'EditTeamController',
      inputs: {
        team: team
      }
    }).then(function(modal) {
      modal.element.modal();
    });
  };
});

app.controller('EditTeamController', function($scope, close, team, TeamService) {
  $scope.team = team;
  $scope.close = function(result) {
    close(result, 500);
  };
  $scope.updateTeam = function(result) {
    TeamService.update(team.id, team).success(function(data) {
      close(result, 500);
    });
  };
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
