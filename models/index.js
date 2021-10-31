require("dotenv").config();
("use strict");
const Sequelize = require("sequelize");
const CommentModel = require("./comment.js");
const ArticleModel = require("./article.js");
const UserModel = require("./user.js");
const pg = require("pg");

const sequelize = new Sequelize(
  process.env.DB_USER,
  process.env.DB_DATABASE,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectModule: pg,
    logging: false, //Disable sequelize from loggin to the CLI
  }
);

const Comment = CommentModel(sequelize, Sequelize);
const Article = ArticleModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Article.belongsTo(User, { onDelete: "cascade" });
User.hasMany(Article);

Comment.belongsTo(Article, { onDelete: "cascade" });
Article.hasMany(Comment);

module.exports = {
  sequelize,
  Sequelize,
  Comment,
  Article,
  User,
};
