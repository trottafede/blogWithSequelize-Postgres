"use strict";

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "author",
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
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    { tableName: "authors" }
  );

  return Author;
};
