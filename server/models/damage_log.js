'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class damage_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
      models.character.belongsTo(models.raid, {
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