"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "firstname",
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "lastname",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "email",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
      },
      googleId: {
        type: DataTypes.STRING,
        field: "googleId",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10); //whatever number you want
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    },

    { tableName: "users" }
  );

  User.prototype.validPassword = async function (password) {
    let result = await bcrypt.compare(password, this.password);
    return result;
  };

  return User;
};
