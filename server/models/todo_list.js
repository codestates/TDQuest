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
      models.ToDo_list.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
    }
  }
  ToDo_list.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    kind: DataTypes.STRING,
    is_complete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ToDo_list',
  });
  return ToDo_list;
};