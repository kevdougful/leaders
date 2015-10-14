'use strict';

app.controller('PlayersController', function($scope, PlayerService, TeamService, ModalService) {
  PlayerService.getAll().success(function(data) {
    $scope.players = data.object;
  });

  var teams = [];
  TeamService.getAll().success(function(result) {
    result.object.forEach(function(team) {
      teams.push({
        name: team.Name,
        value: team.id
      });
    });
  });

  $scope.newPlayer = {};

  $scope.fields = [
    {
      key: 'Name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Player Name',
        placeholder: 'John Doe'
      }
    },
    {
      key: 'TeamId',
      type: 'select',
      templateOptions: {
        label: 'Team',
        options: teams
      }
    }
  ];

  $scope.onSubmit = function() {
    PlayerService.create($scope.newPlayer);
    PlayerService.getAll().success(function(data) {
      $scope.players = data.object;
    });
    $scope.newPlayer = {};
  };

  $scope.showEditModal = function(player) {
    ModalService.showModal({
      templateUrl: 'partial/edit-player-modal',
      controller: 'EditPlayerController',
      inputs: {
        player: player,
        teams: teams
      }
    }).then(function(modal) {
      modal.element.modal();
    });
  };
});

app.controller('EditPlayerController', function($scope, close, player, teams, PlayerService) {
  $scope.player = player;
  $scope.close = function(result) {
    close(result, 500);
  };
  $scope.teamlist = teams;
  $scope.updatePlayer = function(result) {
    PlayerService.update(player.id, player).success(function(data) {
      close(result, 500);
    });
  };
});

app.controller('PlayerController', function($scope, $routeParams, PlayerService, TeamService) {
  TeamService.getAll().success(function(data) {
    $scope.teams = data.object;
  });
  $scope.player = {};
  PlayerService.getOne($routeParams.id).success(function(data) {
    $scope.player = data.object;
  });
  $scope.update = function() {
    PlayerService.update($scope.player.id, $scope.player)
      .success(function(data) {
        PlayerService.getOne($scope.player.id).success(function(data) {
          $scope.player = data.object;
        });
    });
  };
});
