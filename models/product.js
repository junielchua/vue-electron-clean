'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.sale_item,{ foreignKey: 'product_id' , as: 'sale_items'})
    }
  }
  product.init({
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: "The barcode already exists. Please enter a new barcode."
      },
      validate: {
        notNull: {
          msg: "The barcode field is required.",
        },
        notEmpty: {
          msg: "The barcode field is required.",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The name field is required.",
        },
        notEmpty: {
          msg: "The name field is required.",
        },
      },
    },
    qty: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The quantity field is required.",
        },
        notEmpty: {
          msg: "The quantity field is required.",
        },
        isNumeric: { 
          msg: "The quantity field must be a number."
        }
      },
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The price field is required.",
        },
        notEmpty: {
          msg: "The price field is required.",
        },
        isNumeric: { 
          msg: "The price field must be a number."
        }
      },
    },
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};