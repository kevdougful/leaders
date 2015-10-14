'use strict';
var respond = require('./utils').respond;

module.exports = function(models) {
  var getLeaders = function(req, res, next) {
    var teamList = [];
    models.Team.findAll({
      include: [
        models.Player
      ]
    }).then(function(teams) {
      teams.forEach(function(team) {
        var score = 0;
        team.Players.forEach(function(player) {
          score += player.Score;
        })
        teamList.push({
          id: team.id,
          Name: team.Name,
          Score: score
        });
      })
      respond(res, 200, true, null, teamList);
    }).catch(function(err) {
      respond(res, 500, false, err.message);
    });
  };

  return {
    getLeaders: getLeaders
  };
}
