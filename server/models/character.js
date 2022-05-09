'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.character.hasOne(models.Class, {
        foreignKey: 'character_id'
      })
      models.character.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
    }
  }
  character.init({
    image: DataTypes.STRING(5000),
    level: {
      type : DataTypes.INTEGER,
      defaultValue : 1
    },
    status_phy: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    status_int: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    status_spi: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    medal: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};