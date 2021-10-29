"use strict";
require("dotenv").config();

const Sequelize = require("sequelize");
const CommentModel = require("./comment.js");
const ArticleModel = require("./article.js");
const AuthorModel = require("./author.js");

const sequelize = new Sequelize(
  process.env.DB_USER,
  process.env.DB_DATABASE,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

const Comment = CommentModel(sequelize, Sequelize);
const Article = ArticleModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);

Article.belongsTo(Author, { onDelete: "cascade" });
Author.hasMany(Article);

Comment.belongsTo(Article, { onDelete: "cascade" });
Article.hasMany(Comment);

module.exports = {
  sequelize,
  Sequelize,
  Comment,
  Article,
  Author,
};
