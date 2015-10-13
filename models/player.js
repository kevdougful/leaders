'use strict';

module.exports = function(sequelize, DataTypes) {
	var Player = sequelize.define('Player', {
		Name: DataTypes.STRING,
		Score: DataTypes.FLOAT
	}, {
		classMethods: {
			associate: function(models) {
				Player.belongsTo(models.Team, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: true
					}
				});
			}
		}
	});
	
	return Player;
};