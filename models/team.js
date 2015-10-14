'use strict';

module.exports = function(sequelize, DataTypes) {
	var Team = sequelize.define('Team', {
		Name: DataTypes.STRING
	}, {
		paranoid: true,
		timestamps: true,
		classMethods: {
			associate: function(models) {
				Team.hasMany(models.Player, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: true
					}
				});
			}
		}
	});

	return Team;
};
