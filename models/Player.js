const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model{}

Player.init(
    {
        player_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            //read more on sequelize varchar issue
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'player'
    }
)

module.exports = Player;