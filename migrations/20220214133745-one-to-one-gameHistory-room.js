'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('game_histories', 'roomId', {
      type: Sequelize.INTEGER,
      references: {
        model: "rooms",
        key: 'id'
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('game_histories', 'roomId')
  }
};
