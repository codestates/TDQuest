'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING(5000)
      },
      totalExp: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      status_phy: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      status_int: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      status_spi: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      status_etc : {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      medal: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('characters');
  }
};