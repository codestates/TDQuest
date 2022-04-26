'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("raids", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("raids", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_raids_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

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

    await queryInterface.addColumn("ToDo_lists", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("ToDo_lists", {
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

    await queryInterface.addColumn("Classes", "character_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Classes", {
      fields: ["character_id"],
      type: "foreign key",
      name: "characters_Classes_id_fk",
      references: {
        table: "characters",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("raids", "user_id");
    await queryInterface.removeColumn("raids", "monster_id");
    await queryInterface.removeColumn("Todo_lists", "user_id");
    await queryInterface.removeColumn("characters", "user_id");
    await queryInterface.removeColumn("Classes", "character_id");
  },
};