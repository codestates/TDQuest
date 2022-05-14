'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("todo_lists", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("todo_lists", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_ToDo_lists_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("todo_lists", "user_id");
  }
};
