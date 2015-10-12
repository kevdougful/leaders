'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');
var playerController = require('./controllers/players')(models);
var teamController = require('./controllers/teams')(models);

// *** Player Routes *** //
router.get('/players', playerController.getAll);
router.get('/player/:player_id', playerController.getById);
router.post('/player/create', playerController.createPlayer);
router.put('/player/:player_id/update', playerController.updatePlayer);

// *** Team Routes *** //
router.get('/teams', teamController.getAll);
router.get('/team/:team_id', teamController.getById);
router.post('/team/create', teamController.createTeam);
router.put('/team/:team_id/update', teamController.updateTeam);

module.exports = router;