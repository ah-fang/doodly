const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init(
    {
        vote_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        guess_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'guess',
                key: 'id'
            }
        },
        player_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'player',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;