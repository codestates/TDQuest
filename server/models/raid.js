'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class raid extends Model {
     static associate(models) {
      // define association here
      models.raid.hasMany(models.damage_log, {
        foreignKey: 'damage_log_id'
      })
      models.raid.belongsTo(models.monster, {
        foreignKey: 'monster_id'
      })
    }
  }
  raid.init({
    name: DataTypes.STRING,
    hit_damage: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
  }, {
    sequelize,
    modelName: 'raid',
  });
  return raid;
};