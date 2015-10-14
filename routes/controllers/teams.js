'use strict';
var respond = require('./utils').respond;

module.exports = function(models) {

	var getAll = function(req, res, next) {
		models.Team.findAll({
			include: [
				models.Player
			]
		}).then(function(team) {
			respond(res, 200, true, null, team);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	var getById = function(req, res, next) {
		models.Team.findOne({
			where: {
				id: req.params.team_id
			},
			include: [
				models.Player
			]
		}).then(function(team) {
			respond(res, 200, true, null, team);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	var createTeam = function(req, res, next) {
		models.Team.create({
			Name: req.body.Name
		}).then(function(team) {
			respond(res, 200, true, null, team);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	var updateTeam = function(req, res, next) {
		models.Team.update({
			Name: req.body.Name
		}, {
			where: {
				id: req.params.team_id
			}
		}).then(function(team) {
			respond(res, 200, true, null, team);
		}).catch(function(err) {
			respond(res, 500, false, err.message);
		});
	};

	return {
		getAll: getAll,				// GET /api/teams
		getById: getById,			// GET /api/team/:sample_id
		createTeam: createTeam,		// POST /api/team/create
		updateTeam: updateTeam		// PUT /api/team/:sample_id/update
	};
};
