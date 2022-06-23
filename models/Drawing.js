const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Drawing extends Model{}
Drawing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        drawing_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Drawing;
// Player: player_id, username, score, prompt
// 8:12
// Prompt.belongsTo(Player)
// 8:14
// Drawing: drawing_id, drawing_url, player_id(foreignkey)
// 8:15
// Prompt: prompt_id, drawing_id(foreignkey)
// 8:19
// Guess: guess_id, drawing_id(foreignkey), player_id(foreignkey)
// Conditional: if the player 'guessing' is the one who drew it, their guess should autofill with the correct answer. 