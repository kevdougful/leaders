'use strict';

app.service('TeamService', function($http, API) {
	this.getAll = function() {
		return $http.get(API.TEAMS.GET_ALL);
	};
	this.getOne = function(id) {
		return $http.get(API.TEAMS.GET + id);
	};
	this.create = function(team) {
		return $http.post(API.TEAMS.CREATE, team);
	};
	this.update = function(id, team) {
		return $http.put(API.TEAMS.UPDATE + id);
	};
});