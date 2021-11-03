"use strict";

module.exports = (sequelize, DataTypes) => {
  const Privilege = sequelize.define(
    "privilege",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: "id",
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
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
    { tableName: "privileges" }
  );

  return Privilege;
};
