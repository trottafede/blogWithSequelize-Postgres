("use strict");

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        field: "id",
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "title",
      },
      image: {
        type: DataTypes.STRING,
        field: "image",
      },
      imageBlob: {
        type: DataTypes.BLOB,
        field: "image_blob",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        field: "content",
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "resume",
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "slug",
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
    { tableName: "articles" }
  );

  return Article;
};
