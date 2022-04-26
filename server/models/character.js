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
    level: DataTypes.INTEGER,
    status_phy: DataTypes.INTEGER,
    status_int: DataTypes.INTEGER,
    status_spi: DataTypes.INTEGER,
    medal: DataTypes.STRING,
    phy_name: DataTypes.STRING,
    int_name: DataTypes.STRING,
    spi_name: DataTypes.STRING,
    class: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};