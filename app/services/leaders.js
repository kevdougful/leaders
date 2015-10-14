'use strict';

app.service('LeaderboardService', function($http, API) {
	this.getTeams = function() {
		return $http.get(API.LEADERS);
	};
	this.getPlayers = function() {
		return $http.get(API.PLAYERS.GET_ALL);
	};
});