'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class monster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.monster.hasMany(models.raid, {
        foreignKey: 'monster_id'
      })
    }
  }
  monster.init({
    monster_image: DataTypes.STRING(5000),
    kind: DataTypes.STRING,
    name: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    reward: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'monster',
  });
  return monster;
};