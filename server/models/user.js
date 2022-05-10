'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.user.hasOne(models.character, {
        foreignKey: 'user_id'
      }),
      models.user.hasMany(models.damage_log, {
        foreignKey: 'user_id'
      }),
      models.user.hasMany(models.todo_list, {
        foreignKey: 'user_id'
      })
    }
  }
  user.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};