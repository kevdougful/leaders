'use strict';

app.controller('CreateTeamController', CreateTeamController);
function CreateTeamController($scope, TeamService) {
  var vm = this;

  vm.team = {};

  vm.fields = [
    {
      key: 'Name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Team Name',
        required: true,
        placeholder: 'Bird Busters'
      }
    }
  ];
  vm.onSubmit = function() {
    TeamService.create(vm.team);
    TeamService.getAll().success(function(data) {
      $scope.teams = data.object;
    });
  };
}
