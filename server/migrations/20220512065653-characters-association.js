'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn("characters", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("characters", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_id_characters_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("characters", "user_id");

  }
};
