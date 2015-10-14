'use strict';
var respond = require('./utils').respond;

module.exports = function(models) {

	var getAll = function(req, res, next) {
		models.Player.findAll({
			include: [
				models.Team
			]
		}).then(function(player) {
			respond(res, 200, true, null, player);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	var getById = function(req, res, next) {
		models.Player.findOne({
			where: {
				id: req.params.player_id
			},
			include: [
				models.Team
			]
		}).then(function(player) {
			respond(res, 200, true, null, player);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	var createPlayer = function(req, res, next) {
		models.Player.create({
			Name: req.body.Name,
			Score: req.body.Score,
			TeamId: req.body.TeamId
		}).then(function(player) {
			respond(res, 200, true, null, player);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	var updatePlayer = function(req, res, next) {
		models.Player.update({
			Name: req.body.Name,
			Score: req.body.Score
		}, {
			where: {
				id: req.params.player_id
			}
		}).then(function(player) {
			respond(res, 200, true, null, player);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	return {
		getAll: getAll,					// GET /api/players
		getById: getById,				// GET /api/player/:sample_id
		createPlayer: createPlayer,		// POST /api/player/create
		updatePlayer: updatePlayer		// PUT /api/player/:sample_id/update
	};
};
