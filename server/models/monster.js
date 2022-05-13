'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class monster extends Model {
     static associate(models) {
      // define association here

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