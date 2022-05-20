'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
     static associate(models) {
      // define association here
    }
  }
  user.init({
    nickname: DataTypes.STRING,
    logintype : {
      type : DataTypes.STRING,
      defaultValue : 'general'
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
    },
    {
    sequelize,
    modelName: 'user',
  });
  return user;
};