'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class damage_log extends Model {
    static associate(models) {
      // define association here
      models.damage_log.belongsTo(models.user, {
        foreignKey: 'user_id'
      }),
      models.user.hasMany(models.damage_log, {
        foreignKey: 'user_id'
      }),
      models.damage_log.belongsTo(models.raid, {
        foreignKey: 'raid_id'
      }),
      models.raid.hasMany(models.damage_log, {
        foreignKey: 'raid_id'
      })
    }
  }
  damage_log.init({
    log: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
  }, {
    sequelize,
    modelName: 'damage_log',
  });
  return damage_log;
};