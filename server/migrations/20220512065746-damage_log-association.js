'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("damage_logs", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("damage_logs", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_id_damage_log_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addColumn("damage_logs", "raid_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("damage_logs", {
      fields: ["raid_id"],
      type: "foreign key",
      name: "raid_id_damage_log_id_fk",
      references: {
        table: "raids",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("damage_logs", "user_id");
    await queryInterface.removeColumn("damage_logs", "raid_id");
  }
};
