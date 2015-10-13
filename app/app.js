'use strict';

var app = angular.module('app', [
  'ngRoute'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/leaders', {
      templateUrl: 'views/partial/leaderboard',
      controller: 'LeaderboardController'
    })
    .when('/teams', {
      templateUrl: 'views/partial/teams',
      controller: 'TeamsController'
    })
    .when('/team/:teamId', {
      templateUrl: 'views/partial/team',
      controller: 'TeamController'
    })
    .when('/players', {
      templateUrl: 'views/partial/players',
      controller: 'PlayersController'
    })
    .when('/player/:playerId', {
      templateUrl: 'views/partial/player',
      controller: 'PlayerController'
    })
    .otherwise({ redirectTo: '/' })
  $locationProvider.html5Mode(true);
})
