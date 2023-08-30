'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sale_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.sale,{ foreignKey: 'sale_id' , as: 'sale'})
      this.belongsTo(models.product,{ foreignKey: 'product_id' , as: 'product'})
    }
  }
  sale_item.init({
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'sale_item',
  });
  return sale_item;
};