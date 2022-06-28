const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Drawing extends Model{}
Drawing.init(
    {
        drawing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        drawing_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
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
        modelName: 'drawing'
    }
);

module.exports = Drawing;