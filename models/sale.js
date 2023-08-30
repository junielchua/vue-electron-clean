'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{ foreignKey: 'user_id' , as: 'user'})
      this.hasMany(models.sale_item,{ foreignKey: 'sale_id' , as: 'sale_items'})
    }
  }
  sale.init({
    reference: DataTypes.STRING,
    cash: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    change: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'sale',
  });
  return sale;
};