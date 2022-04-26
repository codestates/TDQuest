'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class raid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.raid.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
      models.raid.belongsTo(models.monster, {
        foreignKey: 'monster_id'
      })
    }
  }
  raid.init({
    name: DataTypes.STRING,
    hit_damage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'raid',
  });
  return raid;
};