'use strict';

app.controller('CreateTeamController', CreateTeamController);
function CreateTeamController($scope) {
  var vm = this;

  vm.team = {};

  vm.fields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Team Name',
        required: true,
        placeholder: 'Bird Busters'
      }
    }
  ]
}
