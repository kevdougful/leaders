'use strict';

var app = angular.module('app', [
  'ngRoute', 'ngResource', 'formly', 'formlyBootstrap'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/leaders', {
      templateUrl: 'partial/leaderboard',
      controller: 'LeaderboardController'
    })
    .when('/teams', {
      templateUrl: 'partial/teams',
      controller: 'TeamsController'
    })
    .when('/team/id/:teamId', {
      templateUrl: 'partial/team',
      controller: 'TeamController'
    })
    .when('/team/create', {
      templateUrl: 'partial/createteam'
    })
    .when('/players', {
      templateUrl: 'partial/players',
      controller: 'PlayersController'
    })
    .when('/player/create', {
      templateUrl: 'partial/createplayer',
      controller: 'CreatePlayerController'
    })
    .when('/player/id/:playerId', {
      templateUrl: 'partial/player',
      controller: 'PlayerController'
    })
    .otherwise({ redirectTo: '/' })
  $locationProvider.html5Mode(true);
})
