'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');
var playerController = require('./controllers/players')(models);
var teamController = require('./controllers/teams')(models);
var leadersController = require('./controllers/leaders')(models);

// *** Player Routes *** //
router.get('/players', playerController.getAll);
router.get('/player/:player_id', playerController.getById);
router.post('/player/create', playerController.createPlayer);
router.put('/player/update/:player_id', playerController.updatePlayer);
router.delete('/player/delete/:player_id', playerController.deletePlayer);

// *** Team Routes *** //
router.get('/teams', teamController.getAll);
router.get('/team/:team_id', teamController.getById);
router.post('/team/create', teamController.createTeam);
router.put('/team/update/:team_id', teamController.updateTeam);
router.delete('/team/delete/:team_id', teamController.deleteTeam);

// *** Leaders Routes *** //
router.get('/leaders', leadersController.getLeaders);

module.exports = router;
