'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class configuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  configuration.init({
    context: DataTypes.STRING,
    data: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'configuration',
  });
  return configuration;
};