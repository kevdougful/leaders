var sinon = require('sinon');
var should = require('chai').should;
var models = require('../../models');
var async = require('async');

describe('Player Controller Unit Tests', function() {
	describe('GET (all)', function() {
		it('Responds with 204 if no players exist.', function() {
			var Model = {
				Player: models.Player.build({ },
				{
					include: [ models.Team ]
				})
			};
			Model.Player.findAll = function() {
				var promise = new Promise(function(resolve, reject) {
					var players = [];
					resolve(players);
				});
				return promise;
			};
			var req = {};
			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};
			var playerController = require('../../routes/controllers/players')(Model);
			async.waterfall([
				function(callback) {
					playerController.getAll(req, res);
					callback(null, res);
				}
			],
			function(err, result) {
				result.status.calledWith(204).should.equal(true);
			});
		});
	});
});