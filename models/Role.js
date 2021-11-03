"use strict";

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      roleName: {
        type: DataTypes.STRING,
        unique: true,
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
    { tableName: "roles" }
  );

  return Role;
};
