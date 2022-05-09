'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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

    await queryInterface.addColumn("characters", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("characters", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_characters_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addColumn("damage_log", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("damage_log", {
      fields: ["user_id"],
      type: "foreign key",
      name: "damage_log_user_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addColumn("damage_log", "raid_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("damage_log", {
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("raids", "monster_id");
    await queryInterface.removeColumn("todo_lists", "user_id");
    await queryInterface.removeColumn("characters", "user_id");
    await queryInterface.removeColumn("Classes", "character_id");
    await queryInterface.removeColumn("damage_log", "user_id");
    await queryInterface.removeColumn("damage_log", "raid_id");
  },
};