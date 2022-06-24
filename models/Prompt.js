const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Prompt extends Model{}

Prompt.init(
    {
        prompt_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        prompt_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'prompt'
    }
);

module.exports = Prompt;