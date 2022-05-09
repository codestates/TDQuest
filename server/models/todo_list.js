'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.todo_list.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
    }
  }
  ToDo_list.init({
    content: DataTypes.STRING,
    kind: DataTypes.STRING,
    is_complete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'todo_list',
  });
  return ToDo_list;
};