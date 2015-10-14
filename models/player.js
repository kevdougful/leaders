'use strict';

module.exports = function(sequelize, DataTypes) {
	var Player = sequelize.define('Player', {
		Name: DataTypes.STRING,
		Score: { type: DataTypes.FLOAT, defaultValue: 0 }
	}, {
		paranoid: true,
		timestamps: true,
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