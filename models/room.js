'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {

    static associate(models) {
      room.hasOne(models.game_history)
    }
  };
  room.init({
    room_name: DataTypes.STRING,
    win: DataTypes.INTEGER,
    draw: DataTypes.INTEGER,
    lose: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};