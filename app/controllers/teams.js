'use strict';

app.controller('TeamsController', function($scope, TeamService, ModalService) {
  $scope.fetch = function() {
    TeamService.getAll().success(function(data) {
      $scope.teams = data.object;
    });
  };
  $scope.fetch();
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
        team: team,
        fetch: $scope.fetch()
      }
    }).then(function(modal) {
      modal.element.modal();
    });
  };
  
  $scope.showDeleteModal = function(team) {
    ModalService.showModal({
      templateUrl: 'partial/delete-team-modal',
      controller: 'DeleteTeamController',
      inputs: {
        team: team,
        fetch: $scope.fetch
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

app.controller('DeleteTeamController', function($scope, close, team, fetch, TeamService) {
  $scope.team = team;
  $scope.close = function(result) {
    close(result, 500);
  };
  $scope.deleteTeam = function(result) {
    TeamService.delete(team.id).success(function(data) {
      close(result, 500);
    });
    fetch();
  };
});

app.controller('TeamController', function($scope, $routeParams, TeamService) {
  $scope.team = {};
  TeamService.getOne($routeParams.id).success(function(data) {
    $scope.team = data.object;
  });
  $scope.update = function() {
    TeamService.update($scope.team.id, $scope.team)
      .success(function(data) {
        TeamService.getOne($scope.team.id).success(function(data) {
          $scope.team = data.object;
        });
    });
  };
});
