const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Guess extends Model{}

Guess.init(
    {
        guess_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        guess_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        drawing_id: {
            type: DataTypes.INTEGER,
            //read more on sequelize varchar issue
            references: {
                model: 'drawing',
                key: 'drawing_id'
            }
        },
        player_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'player',
                key: 'player_id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'guess'
    }
);

module.exports = Guess;