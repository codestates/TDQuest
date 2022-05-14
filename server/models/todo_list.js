'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo_list extends Model {
     static associate(models) {
      // define association here
      models.todo_list.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
      models.user.hasMany(models.todo_list, {
        foreignKey: 'user_id'
      })
    }
  }
  ToDo_list.init({
    content: DataTypes.STRING,
    kind: DataTypes.STRING,
    is_complete: {
      type : DataTypes.BOOLEAN,
      defaultValue : 0
    }
  }, {
    sequelize,
    modelName: 'todo_list',
  });
  return ToDo_list;
};