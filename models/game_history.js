'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_history extends Model {

    static associate(models) {
      // define association here
      game_history.belongsTo(models.User);
      game_history.belongsTo(models.room);

    }
  };
  game_history.init({
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game_history',
  });
  return game_history;
};