'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('monsters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      monster_image: {
        type: Sequelize.STRING
      },
      kind: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      hp: {
        type: Sequelize.INTEGER
      },
      reward: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('monsters');
  }
};