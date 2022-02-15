'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('game_histories', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('game_histories', 'UserId')
  }
};
