'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("raids", "monster_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("raids", {
      fields: ["monster_id"],
      type: "foreign key",
      name: "monsters_raids_id_fk",
      references: {
        table: "monsters",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn("raids", "monster_id");
  }
};
