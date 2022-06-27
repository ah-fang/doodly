const Player = require('./Player');
const Prompt = require('./Prompt');
const Drawing = require('./Drawing');
const Vote = require('./Vote');
const Guess = require('./Guess');
const Game = require('./Game');


Player.hasOne(Drawing, {
    foreignKey: 'player_id'
});

Drawing.belongsTo(Player, {
    foreignKey: 'player_id',
});

Player.hasOne(Prompt, {
    foreignKey: 'player_id'
});

Prompt.belongsTo(Player, {
    foreignKey: 'player_id'
});

//does guess belong to player or drawing? Both?
Drawing.hasMany(Guess, {
    foreignKey: 'drawing_id'
});

Guess.belongsTo(Drawing, {
    foreignKey: 'drawing_id'
});
  
Player.hasMany(Guess, {
    foreignKey: 'player_id'
});

Guess.belongsTo(Player, {
    foreignKey: 'player_id'
});
  
Drawing.hasMany(Guess, {
    foreignKey: 'drawing_id'
});

module.exports = { Player, Drawing, Vote, Comment, Guess, Prompt, Game };