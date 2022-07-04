const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model{}
Game.init(
    {
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        player_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'player',
                key: 'player_id'
            }
        },
        prompt_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'prompt',
                key: 'prompt_id'
            }
        },
        drawing_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'drawing',
                key: 'drawing_id'
            }
        },
        turn_order: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'game'
    }
);

module.exports = Game;
