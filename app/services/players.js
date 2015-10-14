'use strict';

app.service('PlayerService', function($http, API) {
	this.getAll = function() {
		return $http.get(API.PLAYERS.GET_ALL);
	};
	this.getOne = function(id) {
		return $http.get(API.PLAYERS.GET + id);
	};
	this.create = function(player) {
		return $http.post(API.PLAYERS.CREATE, player);
	};
	this.update = function(id, player) {
		return $http.put(API.PLAYERS.UPDATE + id, player);
	};
	this.delete = function(id) {
		return $http.delete(API.PLAYERS.DELETE + id);
	};
});