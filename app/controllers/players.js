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
  $scope.updatePlayer = function(result) {
    console.log('hello');
    PlayerService.update(player.id, player).success(function(data) {
      close(result, 500);  
    });
  };
});
