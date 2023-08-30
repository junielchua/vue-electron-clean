"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.sale, { foreignKey: "user_id", as: "sales" });
    }
  }
  user.init(
    {
      franchise_id: DataTypes.INTEGER,
      user_id: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already exists. Please enter a new email.",
        },
        validate: {
          notNull: {
            msg: "The email field is required.",
          },
          notEmpty: {
            msg: "The email field is required.",
          },
          isEmail: {
            msg: "The email must be a valid email address.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The password field is required.",
          },
          notEmpty: {
            msg: "The password field is required.",
          },
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The firstname field is required.",
          },
          notEmpty: {
            msg: "The firstname field is required.",
          },
        },
      },
      middlename: DataTypes.STRING,
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The surname field is required.",
          },
          notEmpty: {
            msg: "The surname field is required.",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The user type field is required.",
          },
          notEmpty: {
            msg: "The user type field is required.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  user.beforeCreate(async (user, options) => {
    // return console.log(user.password , user);
    return await bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error();
      });
  });

  user.beforeUpdate(async (user, options) => {

    return await bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error();
      });
  });

  return user;
};
